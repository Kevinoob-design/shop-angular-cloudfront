import { handlerPath } from '@libs/handler-resolver'
import { AWS } from '@serverless/typescript'

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			sqs: {
				batchSize: 5,
				arn: {'Fn::GetAtt': [ 'CatalogItemsQueue', 'Arn' ]}
			}
		}
	]
} as AWS['functions']['events']
