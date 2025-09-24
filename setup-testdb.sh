#!/bin/bash

# Setup script for test database
set -e

DB_NAME="paradex_events_test"
DB_USER="postgres"
DB_PASSWORD="password"
DB_HOST="localhost"
DB_PORT="5432"

echo "Setting up test database: $DB_NAME"

# Check if PostgreSQL is running
if ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; then
    echo "PostgreSQL is not running. Please start PostgreSQL first."
    echo "You can install PostgreSQL using:"
    echo "  brew install postgresql"
    echo "  brew services start postgresql"
    exit 1
fi

# Create database if it doesn't exist
echo "Creating database if it doesn't exist..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME"

# Set the connection string
export POSTGRES_CONNECTION_STRING="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

echo "✅ Test database created successfully!"
echo "Connection string: $POSTGRES_CONNECTION_STRING"
echo ""
echo "To use this database, run:"
echo "export POSTGRES_CONNECTION_STRING=\"postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME\""
echo ""
echo "Or add it to your .env file:"
echo "POSTGRES_CONNECTION_STRING=\"postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME\""
