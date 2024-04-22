import { handlerPath } from '@libs/handler-resolver'
import { AWS } from '@serverless/typescript'

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'post',
				path: 'products',
				cors: {
					allowCredentials: false,
					origins: [ '*' ],
					headers: [ '*' ],
					methods: [ 'POST', 'OPTIONS' ]
				}
			}
		}
	]
} as AWS[ 'functions' ][ 'events' ]
