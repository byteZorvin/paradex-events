#!/bin/bash

# Quick script to start a single indexer
# Usage: ./start-indexers.sh <indexer-name>
# Example: ./start-indexers.sh log-message-to-l1

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

if [ $# -eq 0 ]; then
    echo "Usage: $0 <indexer-name>"
    echo "Available indexers:"
    echo "  - log-message-to-l1"
    echo "  - log-message-to-l2"
    echo "  - consumed-message-to-l1"
    echo "  - consumed-message-to-l2"
    echo "  - message-to-l2-cancellation-started"
    echo ""
    echo "To start all indexers at once, use: ./start-all-indexers.sh"
    exit 1
fi

indexer_name=$1
echo "Starting indexer: $indexer_name"
echo "Database URL: ${POSTGRES_CONNECTION_STRING:-'Not set'}"
pnpm run start --indexer "$indexer_name"