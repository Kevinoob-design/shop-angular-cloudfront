import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

import { Product, ProductStock, Stock } from '../types/ProductStock'

export class ProductService {

	private readonly documentClient = new DynamoDBClient({ region: 'us-east-1' })

	async getProducts(): Promise<ProductStock[]> {

		const scanCommand = new ScanCommand({ TableName: 'products' })

		const scanCommandOutput = await this.documentClient.send(scanCommand)

		const promises = scanCommandOutput.Items.map(async item => {

			const product = unmarshall(item) as Product

			const stockItem = await this.getStockByProductId(product.id)

			return {
				...product,
				count: stockItem.count
			} as ProductStock
		})

		const productStockList: ProductStock[] = await Promise.all(promises)

		return productStockList
	}

	async getProductById(id: string): Promise<ProductStock> {

		const scanCommand = new ScanCommand({
			TableName: 'products',
			Limit: 1,
			FilterExpression: 'id = :id',
			ExpressionAttributeValues: { ':id': { 'S': id } }
		})

		const scanCommandOutput = await this.documentClient.send(scanCommand)

		const product = unmarshall(scanCommandOutput.Items[ 0 ]) as Product

		const stockItem = await this.getStockByProductId(id)

		const productStock: ProductStock = {
			...product,
			count: stockItem.count
		}

		return productStock
	}

	private async getStockByProductId(productId: string): Promise<Stock> {
		const scanCommand = new ScanCommand({
			TableName: 'stocks',
			Limit: 1,
			FilterExpression: 'product_id = :productId',
			ExpressionAttributeValues: { ':productId': { 'S': productId } }
		})

		const scanCommandOutput = await this.documentClient.send(scanCommand)

		const stock = unmarshall(scanCommandOutput.Items[ 0 ]) as Stock

		return stock
	}
}
