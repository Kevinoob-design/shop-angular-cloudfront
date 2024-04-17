import catalogBatchProcess from '@functions/catalog-batch-process'
import createProduct from '@functions/create-product'
import getProductsById from '@functions/get-product-by-id'
import getProductsList from '@functions/get-products-list'
import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
	service: 'get-products',
	frameworkVersion: '3',
	plugins: [ 'serverless-esbuild' ],
	provider: {
		name: 'aws',
		runtime: 'nodejs20.x',
		httpApi: { cors: true },
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true
		},
		environment: {
			MAIN_AWS_REGION: 'us-east-1',
			PRODUCTS_TABLE: 'products',
			STOCKS_TABLE: 'stocks',
			CATALOG_ITEMS_QUEUE: 'catalog-items-queue',
			CREATE_PRODUCT_SNS_TOPIC: 'create-product-topic',
			CREATE_PRODUCT_SNS_ARN: 'arn:aws:sns:us-east-1:252355243038:create-product-topic',
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
		},
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: [ 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem' ],
						Resource: 'arn:aws:dynamodb:${self:provider.environment.MAIN_AWS_REGION}:*:table/${self:provider.environment.PRODUCTS_TABLE}'
					},
					{
						Effect: 'Allow',
						Action: [ 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem' ],
						Resource: 'arn:aws:dynamodb:${self:provider.environment.MAIN_AWS_REGION}:*:table/${self:provider.environment.STOCKS_TABLE}'
					},
					{
						Effect: 'Allow',
						Action: [ 'sns:Publish' ],
						Resource: 'arn:aws:sns:${self:provider.environment.MAIN_AWS_REGION}:*:${self:provider.environment.CREATE_PRODUCT_SNS_TOPIC}'
					}
				]
			}
		}
	},
	// import the function via paths
	functions: {
		getProductsList,
		getProductsById,
		createProduct,
		catalogBatchProcess
	},
	resources: {
		Resources: {
			CatalogItemsQueue: {
				Type: 'AWS::SQS::Queue',
				Properties: { QueueName: '${self:provider.environment.CATALOG_ITEMS_QUEUE}' }
			},
			CreateProductTopic: {
				Type: 'AWS::SNS::Topic',
				Properties: {
					TopicName: '${self:provider.environment.CREATE_PRODUCT_SNS_TOPIC}',
					Subscription: [
						{
							Endpoint: 'octal-shimmy0s@icloud.com',
							Protocol: 'email'
						}
					]
				}
			}
		}
	},
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: [ 'aws-sdk' ],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10
		}
	}
}

module.exports = serverlessConfiguration
