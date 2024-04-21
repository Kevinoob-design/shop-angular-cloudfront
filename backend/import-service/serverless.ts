import importFileParser from '@functions/import-file-parser'
import importProductsFile from '@functions/import-products-file'
import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
	service: 'upload-products',
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
			S3_BUCKET_NAME: 'shop-aws-epam-learn-import-product-bucket',
			CATALOG_ITEMS_QUEUE_URL: 'https://sqs.us-east-1.amazonaws.com/252355243038/catalog-items-queue',
			CATALOG_ITEMS_QUEUE_NAME: 'catalog-items-queue',
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
		},
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: [ 's3:ListBucket', 's3:GetObject', 's3:PutObject', 's3:DeleteObject', 's3:CopyObject' ],
						Resource: 'arn:aws:s3:::${self:provider.environment.S3_BUCKET_NAME}/*'
					},
					{
						Effect: 'Allow',
						Action: [ 'sqs:SendMessage', 'sqs:SendMessageBatch' ],
						Resource: 'arn:aws:sqs:${self:provider.environment.MAIN_AWS_REGION}:*:catalog-items-queue'
					}
				]
			}
		}
	},
	// import the function via paths
	functions: {
		importProductsFile,
		importFileParser
	},
	resources: {
		Resources: {
			ProductBucket: {
				Type: 'AWS::S3::Bucket',
				Properties: {
					BucketName: '${self:provider.environment.S3_BUCKET_NAME}',
					CorsConfiguration: {
						CorsRules: [
							{
								AllowedOrigins: [ '*' ],
								AllowedHeaders: [ '*' ],
								AllowedMethods: [ 'PUT', 'HEAD' ],
								MaxAge: 3000
							}
						]
					}
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
