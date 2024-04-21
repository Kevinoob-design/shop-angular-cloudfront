export const AWS_CONFIGS = { region: process.env.MAIN_AWS_REGION }

export const S3_BUCKET = {
 name: process.env.S3_BUCKET_NAME, 
 csvName: process.env.S3_CSV_NAME 
}

export const CATALOG_ITEMS_QUEUE = {
    url: process.env.CATALOG_ITEMS_QUEUE_URL,
    name: process.env.CATALOG_ITEMS_QUEUE_NAME
}
