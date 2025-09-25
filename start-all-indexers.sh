#!/bin/bash

# Script to start all Paradex event indexers
# This script starts all indexers concurrently in the background

# Load environment variables
load_env_file() {
    local env_file=$1
    if [ -f "$env_file" ]; then
        echo "Loading environment variables from $env_file..."
        # Export variables while ignoring comments and empty lines
        export $(grep -v '^#' "$env_file" | grep -v '^$' | xargs)
        return 0
    fi
    return 1
}

if load_env_file ".env" || load_env_file "test.env"; then
    echo "✅ Environment variables loaded successfully"
else
    echo "⚠️  No environment file found (.env or test.env)"
    echo "Make sure to set POSTGRES_CONNECTION_STRING manually if needed"
fi

echo "Starting all Paradex event indexers..."
echo "Database URL: ${POSTGRES_CONNECTION_STRING:-'Not set'}"
echo "DNA Token: ${DNA_TOKEN:-'Not set'}"

# Array of all indexer names based on apibara.config.ts
indexers=(
    "log-message-to-l1"
    "log-message-to-l2"
    "consumed-message-to-l1"
    "consumed-message-to-l2"
    "message-to-l2-cancellation-started"
    "message-to-l2-canceled"
)

# Function to start an indexer
start_indexer() {
    local indexer_name=$1
    echo "Starting indexer: $indexer_name"
    pnpm run start --indexer "$indexer_name" &
    local pid=$!
    echo "Started $indexer_name with PID: $pid"
    return $pid
}

# Array to store PIDs
pids=()

# Start all indexers
for indexer in "${indexers[@]}"; do
    start_indexer "$indexer"
    pids+=($!)
done

echo ""
echo "All indexers started!"
echo "PIDs: ${pids[*]}"
echo ""
echo "To stop all indexers, run: kill ${pids[*]}"
echo "Or use Ctrl+C to stop this script and all child processes"

# Function to cleanup on script exit
cleanup() {
    echo ""
    echo "Stopping all indexers..."
    for pid in "${pids[@]}"; do
        if kill -0 "$pid" 2>/dev/null; then
            echo "Stopping PID: $pid"
            kill "$pid"
        fi
    done
    echo "All indexers stopped."
    exit 0
}

# Set up trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for all background processes
wait
