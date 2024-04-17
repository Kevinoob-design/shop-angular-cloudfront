import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { SendMessageBatchCommand, SQSClient } from "@aws-sdk/client-sqs"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { AWS_CONFIGS, CATALOG_ITEMS_QUEUE, S3_BUCKET } from "src/config/config"
import { Stream } from "stream"

import { ProductStock } from "../types/ProductStock"

export class ImportService {

	async importFile(name: string) {

		const s3 = new S3Client({ region: process.env.MAIN_AWS_REGION })

		const command = new PutObjectCommand({
			Bucket: S3_BUCKET.name,
			Key: `uploaded/${name}`,
			ContentType: 'text/csv'
		})

		const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 })

		return signedUrl
	}

	async readUploadedFile(key: string) {
		await this.readUploadedFilePromise(key)
	}

	async readUploadedFilePromise(key: string) {
		const s3 = new S3Client({ region: AWS_CONFIGS.region })

		const objectStream = await this.getObjectStream(s3, key)

		const productsStock = []

		return new Promise((resolve, reject) => {
			objectStream.on('data', (chunk: Stream) => {
				productsStock.push(...this.parseContentString(chunk.toString()))
			})

			objectStream.on('error', (err: Stream) => {
				console.error(err.toString())
				reject(false)
			})

			objectStream.on('end', async () => {
				console.info('end stream, marking object as parsed')
				await this.copyObjectToParsed(s3, key)
				await this.deleteObject(s3, key)
			})

			objectStream.on('close', async () => {
				console.info('closed stream file, sending to queue')
				await this.sendMessageBatchToQueue(productsStock)
				resolve(true)
			})
		})
	}

	async getObjectStream(s3: S3Client, key: string) {
		const getCommand = new GetObjectCommand({
			Bucket: S3_BUCKET.name,
			Key: key
		})

		const object = await s3.send(getCommand)

		return object.Body
	}

	async copyObjectToParsed(s3: S3Client, key: string) {

		const copyCommand = new CopyObjectCommand({
			Bucket: S3_BUCKET.name,
			CopySource: `${S3_BUCKET.name}/${key}`,
			Key: `parsed/${key}`
		})

		await s3.send(copyCommand)

		return true
	}

	async deleteObject(s3: S3Client, key: string) {

		const deleteCommand = new DeleteObjectCommand({
			Bucket: S3_BUCKET.name,
			Key: `parsed/${key}`
		})

		await s3.send(deleteCommand)

		return true
	}

	parseContentString(unparsedProducts: string): ProductStock[] {
		return unparsedProducts.split('\n').map(unparsedProductLine => {
			const [ title, description, price, count ] = unparsedProductLine.split(',')

			return {
				title,
				description,
				price: parseFloat(price),
				count: parseInt(count)
			}
		})
	}

	async sendMessageBatchToQueue(productsStock: ProductStock[]) {
		const sqsClient = new SQSClient({})

		const entries = productsStock.map((product, index) => ({
			Id: `id${index}`,
			MessageBody: JSON.stringify(product)
		}))

		const command = new SendMessageBatchCommand({
			QueueUrl: CATALOG_ITEMS_QUEUE.url,
			Entries: entries
		})

		const response = await sqsClient.send(command)

		console.info('send queue output', response)
	}
}
