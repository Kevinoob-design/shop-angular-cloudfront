import type { APIGatewayEvent, Handler } from 'aws-lambda'

import { formatJSONResponse } from '../../libs/api-gateway'
import { ProductService } from '../../service/products.service'

const getProduct: Handler = async (event: APIGatewayEvent) => {
	const { id } = event.pathParameters

	const productStock = await new ProductService().getProductById(id)

	return formatJSONResponse(productStock, productStock ? 200 : 404)
}

export const main = getProduct
