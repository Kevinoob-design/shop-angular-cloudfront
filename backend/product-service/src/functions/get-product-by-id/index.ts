import { handlerPath } from '@libs/handler-resolver'
import { AWS } from '@serverless/typescript'

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'products/{id}',
				cors: {
					allowCredentials: false,
					origins: [ '*' ],
					headers: [ '*' ],
					methods: [ 'GET', 'OPTIONS' ]
				}
			}
		}
	]
} as AWS[ 'functions' ][ 'events' ]
