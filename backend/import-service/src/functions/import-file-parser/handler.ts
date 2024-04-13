import type { Handler, S3Event } from 'aws-lambda'

import { ImportService } from '../../service/products.service'

const parseUploadedFile: Handler = async (event: S3Event) => {

	console.log('parsing uploaded file')

	console.log(`${event.Records[0].s3.bucket.name}`)
	console.log(`${event.Records[0].s3.object.key}`)
	console.log(JSON.stringify(event.Records))

	await new ImportService().parseUploadedFile()
}

export const main = parseUploadedFile
