#!/bin/bash
# End-to-end API test for Cart and Order flow

set -e
source /home/rakeshnaidu/.nvm/nvm.sh
cd /home/rakeshnaidu/rakesh_linux/flipcart-clone/backend

# Start server
node src/server.js &
SERVER_PID=$!
sleep 3

# Get a product ID from the first product
echo "=== Getting first product ID ==="
PRODUCT_ID=$(curl -s "http://localhost:5000/api/products?limit=1" | python3 -c "import json,sys; data=json.load(sys.stdin); print(data['products'][0]['id'])")
echo "Product ID: $PRODUCT_ID"
PRODUCT_NAME=$(curl -s "http://localhost:5000/api/products?limit=1" | python3 -c "import json,sys; data=json.load(sys.stdin); print(data['products'][0]['name'])")
echo "Product Name: $PRODUCT_NAME"

echo ""
echo "=== Adding to Cart ==="
curl -s -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d "{\"productId\": \"$PRODUCT_ID\", \"quantity\": 2}"

echo ""
echo ""
echo "=== Get Cart ==="
CART=$(curl -s http://localhost:5000/api/cart)
echo $CART | python3 -m json.tool 2>/dev/null || echo $CART

echo ""
echo "=== Place Order ==="
ORDER=$(curl -s -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"shippingAddress": "123 Test Street, Koramangala, Bangalore 560034", "paymentMethod": "COD"}')
echo $ORDER | python3 -m json.tool 2>/dev/null || echo $ORDER

echo ""
echo "=== Cart Should Be Empty After Order ==="
curl -s http://localhost:5000/api/cart

echo ""
echo ""
echo "=== Orders List ==="
curl -s http://localhost:5000/api/orders | python3 -c "import json,sys; data=json.load(sys.stdin); print('Orders:', len(data['orders']), '| Status:', data['orders'][0]['status'] if data['orders'] else 'none')"

echo ""
echo ""
echo "✅ Full E2E test complete!"

kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null
