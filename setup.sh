#!/bin/bash

# AI-HIREUP Setup Script
# This script helps you set up the AI-HIREUP authentication app quickly

echo "🚀 AI-HIREUP Setup Script"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (version 18 or higher) first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create it with your database configuration."
    exit 1
fi

echo "✅ .env file found"

# Generate Prisma client
echo ""
echo "🔧 Generating Prisma client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

echo "✅ Prisma client generated successfully"

# Check if PostgreSQL is accessible
echo ""
echo "🗄️  Checking database connection..."
npx prisma db push --accept-data-loss 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful and schema updated"
else
    echo "⚠️  Database connection failed or schema update failed"
    echo "   Please ensure:"
    echo "   1. PostgreSQL is running"
    echo "   2. Database credentials in .env are correct"
    echo "   3. Database exists"
    echo ""
    echo "   You can still run the app, but you'll need to fix the database connection first."
fi

echo ""
echo "🎉 Setup completed!"
echo ""
echo "Next steps:"
echo "1. Ensure your PostgreSQL database is running"
echo "2. Update the DATABASE_URL in .env with your database credentials"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "For detailed instructions, see README.md"
echo ""
echo "Happy coding! 🚀"
