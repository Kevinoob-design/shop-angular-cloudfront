import type { APIGatewayEvent, Handler } from 'aws-lambda'

import { formatJSONResponse } from '../../libs/api-gateway'
import { ImportService } from '../../service/products.service'

const importFile: Handler = async (event: APIGatewayEvent) => {

	const { name } = event.queryStringParameters

	console.info(`preparing signed url for ${name}`)

	const signedUrl = await new ImportService().importFile(name)

	return formatJSONResponse({signedUrl})
}

export const main = importFile
