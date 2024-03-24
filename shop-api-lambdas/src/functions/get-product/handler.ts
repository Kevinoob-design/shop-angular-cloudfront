import { formatJSONResponse } from '@libs/api-gateway'
import type { APIGatewayEvent, Handler } from 'aws-lambda'

import { products } from '../../mocks/products'

const getProduct: Handler = async (event: APIGatewayEvent) => {
	const { id } = event.pathParameters

	return formatJSONResponse(products.find(product => product.id === id))
}

export const main = getProduct
