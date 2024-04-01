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
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
		},
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: [ 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem' ],
						Resource: 'arn:aws:dynamodb:us-east-1:*:table/products'
					},
					{
						Effect: 'Allow',
						Action: [ 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:Query', 'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem' ],
						Resource: 'arn:aws:dynamodb:us-east-1:*:table/stocks'
					}
				]
			}
		}
	},
	// import the function via paths
	functions: {
		getProductsList,
		getProductsById
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
