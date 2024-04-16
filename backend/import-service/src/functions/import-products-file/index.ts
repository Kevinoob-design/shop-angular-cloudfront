import { handlerPath } from '@libs/handler-resolver'
import { AWS } from '@serverless/typescript'

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'import',
				request: {parameters: {querystrings: {name: true}}}
			}
		}
	]
} as AWS['functions']['events']
