#!/bin/bash
echo "🔧 Auto-fixing everything..."

# Kill any existing servers
pkill -f "json-server" 2>/dev/null
pkill -f "vite" 2>/dev/null

# Wait a moment
sleep 1

# Start json-server in background
echo "📡 Starting json-server..."
npx json-server --watch db.json --port 3000 &
JSON_PID=$!

# Wait for json-server to start
sleep 3

# Start React dev server
echo "⚛️  Starting React dev server..."
npm run dev &
REACT_PID=$!

echo "✅ All servers started!"
echo "📱 Open http://localhost:5173 in your browser"
echo "🛑 Press Ctrl+C to stop all servers"

# Wait for user to stop
wait