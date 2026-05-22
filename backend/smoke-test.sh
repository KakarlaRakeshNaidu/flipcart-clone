#!/bin/bash
# Start backend server and run smoke tests

set -e
source /home/rakeshnaidu/.nvm/nvm.sh
cd /home/rakeshnaidu/rakesh_linux/flipcart-clone/backend

# Start the server in background
node src/server.js &
SERVER_PID=$!

# Wait for it to be ready
sleep 3

echo "=== Health Check ==="
curl -s http://localhost:5000/health

echo ""
echo ""
echo "=== Products API (first 3) ==="
curl -s "http://localhost:5000/api/products?limit=3" | python3 -m json.tool 2>/dev/null || curl -s "http://localhost:5000/api/products?limit=3"

echo ""
echo ""
echo "=== Categories API ==="
curl -s http://localhost:5000/api/products/categories

echo ""
echo ""
echo "=== Cart API ==="
curl -s http://localhost:5000/api/cart

echo ""
echo ""
echo "✅ Smoke tests complete"

# Kill the test server
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null
