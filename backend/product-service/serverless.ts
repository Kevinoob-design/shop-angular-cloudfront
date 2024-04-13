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
					}
				]
			}
		}
	},
	// import the function via paths
	functions: {
		getProductsList,
		getProductsById,
		createProduct
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
