import { handlerPath } from '@libs/handler-resolver'
import { AWS } from '@serverless/typescript'

export default {handler: `${handlerPath(__dirname)}/handler.main`} as AWS['functions']['events']
 