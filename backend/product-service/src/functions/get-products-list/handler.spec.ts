
import { products } from '../../mocks/products.mock'
import { main } from './handler'

describe('getProducts', () => {
  it('should return formatted JSON response with products', async () => {
    const response = await main({}, null, null)

    const productsResponse = await JSON.parse(response.body)

    expect(response.statusCode).toEqual(200)
    expect(productsResponse).toEqual(products)
  })
})
