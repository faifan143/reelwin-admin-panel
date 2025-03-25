#!/bin/bash

# Variables
APP_NAME="reelwin-admin"
PORT=3007

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "docker-compose is not installed. Installing..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Stop any existing containers
echo "Stopping any existing containers..."
docker-compose down

# Build and start the containers
echo "Building and starting containers..."
docker-compose up -d --build

# Check if containers are running
echo "Checking if containers are running..."
if docker-compose ps | grep -q "Up"; then
    echo "Deployment complete! Application is running at http://localhost:${PORT}"
else
    echo "Deployment failed! Check logs with 'docker-compose logs'"
    exit 1
fi

# Display logs
echo "Showing logs (press Ctrl+C to exit)..."
docker-compose logs -f