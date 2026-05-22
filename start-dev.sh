#!/bin/bash
# Start both servers in development mode
# PostgreSQL must already be running (wsl -u root service postgresql start)

source /home/rakeshnaidu/.nvm/nvm.sh

# Ensure PostgreSQL is running
service postgresql status > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "PostgreSQL not running. Start it with: wsl -d Ubuntu-24.04 -u root -- service postgresql start"
  exit 1
fi

echo "✅ PostgreSQL is running"

# Start backend
cd /home/rakeshnaidu/rakesh_linux/flipcart-clone/backend
echo "🚀 Starting backend on port 5000..."
npm run dev &
BACKEND_PID=$!

sleep 3

# Start frontend
cd /home/rakeshnaidu/rakesh_linux/flipcart-clone/frontend
echo "🚀 Starting frontend on port 3000..."
npm run dev

# Cleanup on exit
kill $BACKEND_PID 2>/dev/null
