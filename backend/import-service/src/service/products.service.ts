import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3_BUCKET } from "src/config/config"

export class ImportService {

	async importFile(name: string) {

		const s3 = new S3Client({ region: process.env.MAIN_AWS_REGION })

		const command = new GetObjectCommand({
			Bucket: S3_BUCKET.name,
			Key: `uploaded/${name}`,
			ResponseContentType: 'text/csv'
		})

		const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 })

		console.log(`signed url: ${signedUrl}`)

		return signedUrl
	}

	async parseUploadedFile() {

	}
}
