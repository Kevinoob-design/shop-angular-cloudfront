
import { products } from '../../mocks/products.mock'
import { main } from './handler'

describe('get product', () => {
    it('should return formatted JSON response with desired product', async () => {

        const product = products[4]

        const event = {pathParameters: { id: product.id }}

        const response = await main(event, null, null)

        const productResponse = await JSON.parse(response.body)

        expect(response.statusCode).toEqual(200)
        expect(productResponse).toEqual(product)
    })

    it('should not find any product', async () => {

        const event = {pathParameters: { id: 'some-random-id' }}

        const response = await main(event, null, null)

        expect(response.statusCode).toEqual(404)
        expect(response.body).toEqual(undefined)
    })
})
