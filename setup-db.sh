#!/bin/bash

# ============================================================================
# Aerocity Payment System - Complete Database & Setup Script
# ============================================================================
# This script sets up the PostgreSQL database and initializes all data
# Run this ONCE to get the entire system ready for testing

echo "🚀 Starting Aerocity Backend Setup..."
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
  echo "❌ pnpm not found. Please install pnpm first:"
  echo "   npm install -g pnpm"
  exit 1
fi

# Step 1: Clean install dependencies
echo "📦 Step 1: Installing dependencies..."
echo "   This will install all packages including new @types modules"
pnpm install
if [ $? -ne 0 ]; then
  echo "❌ Failed to install dependencies"
  exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Step 2: Generate Prisma Client
echo "🔧 Step 2: Generating Prisma Client..."
pnpm exec prisma generate
if [ $? -ne 0 ]; then
  echo "❌ Failed to generate Prisma Client"
  exit 1
fi
echo "✅ Prisma Client generated"
echo ""

# Step 3: Create database schema
echo "🗄️  Step 3: Creating database schema..."
echo "   This will run database migrations"
pnpm exec prisma migrate dev --name init
if [ $? -ne 0 ]; then
  echo "❌ Failed to run migrations"
  echo "   Make sure PostgreSQL is running and DATABASE_URL is correct in .env.local"
  exit 1
fi
echo "✅ Database schema created"
echo ""

# Step 4: Seed database with test data
echo "🌱 Step 4: Seeding database with test data..."
echo "   This will create admin user and sample data"
pnpm exec prisma db seed
if [ $? -ne 0 ]; then
  echo "❌ Failed to seed database"
  echo "   Continuing anyway - you can manually create data"
fi
echo "✅ Database seeded with test data"
echo ""

# Step 5: Show database inspection option
echo "📊 Step 5: Database setup complete!"
echo ""
echo "💡 Optional: Inspect database with Prisma Studio"
echo "   Run: pnpm exec prisma studio"
echo "   Opens at: http://localhost:5555"
echo ""

# Step 6: Ready to start
echo "🎉 Setup complete! You can now start the development server:"
echo ""
echo "   pnpm dev"
echo ""
echo "Server will run at: http://localhost:3000"
echo ""
echo "Test credentials (created via seed):"
echo "   Mobile: 9000000000"
echo "   Password: admin123"
echo ""
echo "============================================================================"
echo "API Documentation: http://localhost:3000/api"
echo "Admin Dashboard: http://localhost:3000/admin"
echo "Prisma Studio: http://localhost:5555"
echo "============================================================================"
