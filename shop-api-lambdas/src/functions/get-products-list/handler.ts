import type { Handler } from 'aws-lambda'

import { formatJSONResponse } from '../../libs/api-gateway'
import { ProductService } from '../../service/products.service'

const getProducts: Handler = async () => {

	const productService = new ProductService()

	return formatJSONResponse(productService.getProducts())
}

export const main = getProducts
