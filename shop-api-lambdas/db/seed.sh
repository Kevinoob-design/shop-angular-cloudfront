aws dynamodb put-item \
    --table-name products \
    --item '{
        "id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa"},
        "title": {"S": "ProductOne"}, 
        "description": {"S": "Short Product Description1"}, 
        "price": {"N": "200"}
        }'

aws dynamodb put-item \
    --table-name stocks \
    --item '{
        "id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa"},
        "product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa"},
        "count": {"N": "4"}
        }'
