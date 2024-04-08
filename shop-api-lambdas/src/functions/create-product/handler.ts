import type { APIGatewayEvent, Handler } from 'aws-lambda'
import { ProductStock } from 'src/types/ProductStock'

import { formatJSONResponse } from '../../libs/api-gateway'
import { ProductService } from '../../service/products.service'

const createProduct: Handler = async (event: APIGatewayEvent) => {

	console.log('createProduct event.body', event.body)

	const newProductStock: ProductStock = JSON.parse(event.body)

	const productStock = await new ProductService().createProduct(newProductStock)

	return formatJSONResponse(productStock)
}

export const main = createProduct
