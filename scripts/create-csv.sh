for ((i=1; i<=10; i++))
do
    price=$(shuf -i 5-20 -n 1)
    count=$(shuf -i 1-10 -n 1)
    echo "Product $i,Description $i,$price,$count" >> products.csv
done
