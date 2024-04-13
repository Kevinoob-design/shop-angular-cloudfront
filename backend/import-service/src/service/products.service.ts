import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3_BUCKET } from "src/config/config"
import { Stream } from "stream"

export class ImportService {

	async importFile(name: string) {

		const s3 = new S3Client({ region: process.env.MAIN_AWS_REGION })

		const command = new PutObjectCommand({
			Bucket: S3_BUCKET.name,
			Key: `uploaded/${name}`,
			ContentType: 'text/csv'
		})

		const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 })

		console.log(`signed url: ${signedUrl}`)

		return signedUrl
	}

	async parseUploadedFile(name: string, key: string) {

		const s3 = new S3Client({ region: process.env.MAIN_AWS_REGION })

		const getCommand = new GetObjectCommand({
			Bucket: name,
			Key: key
		})

		const object = await s3.send(getCommand)

		object.Body.on('data', (chunk: Stream) => {
			console.info(chunk.toString())
		})

		object.Body.on('error', (err: Stream) => {
			console.error(err.toString())
		})

		object.Body.on('close', () => {
			console.info('done reading file')
		})
	}
}
