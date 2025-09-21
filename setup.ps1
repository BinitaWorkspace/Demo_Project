# Windows PowerShell setup script

# Function to write status messages
function Write-Status {
    param($Message)
    Write-Host "[✓] $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "[!] $Message" -ForegroundColor Yellow
}

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Status "Node.js version $nodeVersion found"
} catch {
    Write-Warning "Node.js is not installed. Please install Node.js v14 or higher"
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm -v
    Write-Status "npm version $npmVersion found"
} catch {
    Write-Warning "npm is not installed. Please install npm v6 or higher"
    exit 1
}

# Create necessary directories
Write-Status "Creating project directories..."
New-Item -ItemType Directory -Force -Path "screenshots" | Out-Null
New-Item -ItemType Directory -Force -Path "test-results" | Out-Null

# Install dependencies
Write-Status "Installing Node.js dependencies..."
npm install

# Install Playwright browsers
Write-Status "Installing Playwright browsers..."
npx playwright install

# Install Playwright Test
Write-Status "Installing Playwright Test..."
npm install -D @playwright/test

# Verify installation
Write-Status "Verifying installation..."
npm run test --version

Write-Status "Setup completed successfully!"
Write-Status "You can now run tests using: npm test"