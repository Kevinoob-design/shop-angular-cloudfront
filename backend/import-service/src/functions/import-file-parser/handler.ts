import type { Handler, S3Event } from 'aws-lambda'
import { S3_BUCKET } from 'src/config/config'

import { ImportService } from '../../service/products.service'

const parseUploadedFile: Handler = async (event: S3Event) => {

	const BUCKET_NAME = event.Records[ 0 ].s3.bucket.name
	const OBJECT_KEY = event.Records[ 0 ].s3.object.key

	const IS_UPLOADED_BUCKET = BUCKET_NAME === S3_BUCKET.name
	const HAS_CSV_IN_UPLOADED_BUCKET = OBJECT_KEY.startsWith('uploaded/')

	if (!IS_UPLOADED_BUCKET || !HAS_CSV_IN_UPLOADED_BUCKET) {
		console.info('not an uploaded file')

		return
	}

	console.info('parsing uploaded file')

	await new ImportService().readUploadedFilePromise(OBJECT_KEY)
}

export const main = parseUploadedFile
