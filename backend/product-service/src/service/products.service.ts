import { DynamoDBClient, PutItemCommandInput, ScanCommand, TransactWriteItemsCommand, TransactWriteItemsCommandInput } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { uuid } from '@libs/util'
import { AWS_CONFIGS, DYNAMO_DB_TABLES } from 'src/config/config'

import { Product, ProductStock, Stock } from '../types/ProductStock'

export class ProductService {

	private readonly documentClient = new DynamoDBClient({ region: AWS_CONFIGS.region })

	async getProducts(): Promise<ProductStock[]> {

		const scanCommand = new ScanCommand({ TableName: DYNAMO_DB_TABLES.products })

		const scanCommandOutput = await this.documentClient.send(scanCommand)

		const promises = scanCommandOutput.Items.map(async item => {

			const product = unmarshall(item) as Product

			const stockItem = await this.getStockByProductId(product.id)

			return {
				...product,
				count: stockItem.count
			} as ProductStock
		})

		const productStockList = await Promise.all(promises)

		return productStockList
	}

	async getProductById(id: string): Promise<ProductStock> {

		const scanCommand = new ScanCommand({
			TableName: DYNAMO_DB_TABLES.products,
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

	async createProduct(newProductStock: ProductStock): Promise<ProductStock> {

		const { count, ...newProduct } = newProductStock

		const product = {
			...newProduct,
			id: uuid()
		}

		const stock = {
			product_id: product.id,
			count,
			id: uuid()
		}

		const putProductCommand: PutItemCommandInput = {
			TableName: DYNAMO_DB_TABLES.products, Item: marshall(product)
		}

		const putStockCommand: PutItemCommandInput = {
			TableName: DYNAMO_DB_TABLES.stocks, Item: marshall(stock)
		}

		const transactionInput: TransactWriteItemsCommandInput = {
			TransactItems: [
				{ Put: putProductCommand },
				{ Put: putStockCommand }
			]
		}

		await this.documentClient.send(new TransactWriteItemsCommand(transactionInput))

		return {
			...product,
			count: stock.count
		}
	}

	private async getStockByProductId(productId: string): Promise<Stock> {
		const scanCommand = new ScanCommand({
			TableName: DYNAMO_DB_TABLES.stocks,
			FilterExpression: 'product_id = :productId',
			ExpressionAttributeValues: { ':productId': { 'S': productId } }
		})

		const scanCommandOutput = await this.documentClient.send(scanCommand)

		console.log(scanCommandOutput.Items)

		const stock = unmarshall(scanCommandOutput.Items[ 0 ]) as Stock

		return stock
	}
}
