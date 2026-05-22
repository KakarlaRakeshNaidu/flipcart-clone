#!/bin/bash
# Test script to verify environment and run seed

set -e
source /home/rakeshnaidu/.nvm/nvm.sh

cd /home/rakeshnaidu/rakesh_linux/flipcart-clone/backend

echo "=== Environment Check ==="
node -e "require('dotenv').config(); console.log('DATABASE_URL:', process.env.DATABASE_URL)"

echo ""
echo "=== Running Prisma Seed ==="
node prisma/seed.js

echo ""
echo "=== Seed Complete ==="
