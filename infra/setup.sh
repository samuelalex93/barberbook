#!/bin/bash

# StudioBook Infrastructure Setup Script
# This script helps initialize the development environment

set -e

echo "🚀 StudioBook Infrastructure Setup"
echo "=================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✓ Docker found"
echo "✓ Docker Compose found"
echo ""

# Navigate to infra directory
cd "$(dirname "$0")"

echo "📦 Starting Docker services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Check if PostgreSQL is healthy
max_attempts=30
attempt=1
while [ $attempt -le $max_attempts ]; do
    if docker-compose exec -T postgres pg_isready -U postgres &> /dev/null; then
        echo "✓ PostgreSQL is ready"
        break
    fi
    echo "  Attempt $attempt/$max_attempts..."
    sleep 1
    ((attempt++))
done

if [ $attempt -gt $max_attempts ]; then
    echo "❌ PostgreSQL failed to start"
    exit 1
fi

echo ""
echo "✅ Infrastructure Setup Complete!"
echo ""
echo "📊 Services are running:"
echo "  • PostgreSQL:    localhost:5432"
echo "  • PgAdmin:       http://localhost:5050"
echo ""
echo "🔐 Credentials:"
echo "  • DB User:       postgres"
echo "  • DB Password:   postgres123"
echo "  • DB Name:       StudioBook"
echo "  • PgAdmin Email: admin@StudioBook.com"
echo "  • PgAdmin Pass:  admin123"
echo ""
echo "📝 Next steps:"
echo "  1. Copy .env.example to api-baber-book/.env"
echo "  2. Update api-baber-book/.env with your settings"
echo "  3. Start the API server"
echo "  4. Start the UI server"
echo ""
echo "🛑 To stop services: docker-compose down"
echo "🧹 To clean everything: docker-compose down -v"
echo ""
