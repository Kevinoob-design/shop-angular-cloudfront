import basicAuthorizer from '@functions/basic-authorizer'
import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
	service: 'basic-authorizer',
	frameworkVersion: '3',
	plugins: [ 'serverless-esbuild' ],
	useDotenv: true,
	provider: {
		name: 'aws',
		runtime: 'nodejs20.x',
		environment: {
			MAIN_AWS_REGION: 'us-east-1',
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			AUTHORIZATION_PASS: '${env:KEVINOOB_DESIGN_PASS}',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
		}
	},
	functions: {basicAuthorizer},
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
