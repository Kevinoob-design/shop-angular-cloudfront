export const DYNAMO_DB_TABLES = {
    products: process.env.PRODUCTS_TABLE,
    stocks: process.env.STOCKS_TABLE
}

export const CREATE_PRODUCT_SNS = {
    arn: process.env.CREATE_PRODUCT_SNS_ARN,
    topic: process.env.CREATE_PRODUCT_SNS_TOPIC
}

export const AWS_CONFIGS = { region: process.env.MAIN_AWS_REGION }
