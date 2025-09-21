#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print with color
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_warning "Node.js is not installed. Please install Node.js v14 or higher"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_warning "npm is not installed. Please install npm v6 or higher"
    exit 1
fi

# Create necessary directories
print_status "Creating project directories..."
mkdir -p screenshots test-results

# Install dependencies
print_status "Installing Node.js dependencies..."
npm install

# Install Playwright browsers
print_status "Installing Playwright browsers..."
npx playwright install

# Install Playwright/test
print_status "Installing Playwright/test..."
npm install -D @playwright/test

# Verify installation
print_status "Node version: $(node -v)"
print_status "npm version: $(npm -v)"
print_status "Playwright version: $(npx playwright --version)"
npm run test --version

print_status "Setup completed successfully!"
print_status "You can now run tests using: npm test"