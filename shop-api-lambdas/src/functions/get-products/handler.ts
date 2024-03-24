import { formatJSONResponse } from '@libs/api-gateway'
import type { Handler } from 'aws-lambda'

import { products } from '../../mocks/products'

const getProducts: Handler = async () => {
	return formatJSONResponse(products)
}

export const main = getProducts
