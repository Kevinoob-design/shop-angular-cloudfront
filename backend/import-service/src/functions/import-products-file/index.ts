import { handlerPath } from '@libs/handler-resolver'
import { AWS } from '@serverless/typescript'

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'import',
				cors: {
					allowCredentials: false,
					origins: [ '*' ],
					headers: [ '*' ],
					methods: [ 'GET', 'OPTIONS' ]
				},
				request: { parameters: { querystrings: { name: true } } },
				authorizer: {
					name: 'basicAuthorizer',
					arn: 'arn:aws:lambda:us-east-1:252355243038:function:basic-authorizer-dev-basicAuthorizer'
				}
			}
		}
	]
} as AWS[ 'functions' ][ 'events' ]
