import { jsonParseSafely } from '@libs/util'
import type { Handler, SQSEvent } from 'aws-lambda'
import { ProductStock } from 'src/types/ProductStock'

import { ProductService } from '../../service/products.service'

const catalogBatchProcess: Handler = async (event: SQSEvent) => {

	console.info('catalogBatchProcess event', event)

	const products = event.Records
		.map(record => jsonParseSafely(record.body))
		.filter(Boolean) as ProductStock[]

	const productService = new ProductService()

	const promises = products.map(productService.createProduct.bind(productService))

	await Promise.allSettled(promises)

	console.info('catalogBatchProcess completed')
}

export const main = catalogBatchProcess
