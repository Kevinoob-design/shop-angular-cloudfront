import type { Handler } from 'aws-lambda'

import { formatJSONResponse } from '../../libs/api-gateway'
import { ProductService } from '../../service/products.service'

const getProducts: Handler = async () => {

	const productStockList = await new ProductService().getProducts()

	return formatJSONResponse(productStockList)
}

export const main = getProducts
