import { handlerPath } from '@libs/handler-resolver'
import { AWS } from '@serverless/typescript'

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			s3: {
				bucket: '${self:provider.environment.S3_BUCKET}',
				event: 's3:ObjectCreated:*',
				existing: true,
				rules: [
					{
						prefix: 'uploaded/',
						suffix: '.csv'
					}
				]
			}
		}
	]
} as AWS['functions']['events']
