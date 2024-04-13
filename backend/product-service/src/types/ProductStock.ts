export type Product = {
    id?: string
    title: string
    description: string
    price: number
}

export type Stock = {
    id: string
    product_id: string
    count: number
}

export type ProductStock = Product & Omit<Stock, 'product_id' | 'id'>
