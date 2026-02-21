@echo off
REM ============================================================================
REM Aerocity Payment System - Complete Database & Setup Script (Windows)
REM ============================================================================
REM Run this ONCE to set up the entire PostgreSQL database and test data

setlocal enabledelayedexpansion

echo.
echo 🚀 Starting Aerocity Backend Setup...
echo.

REM Check if pnpm is installed
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
  echo ❌ pnpm not found. Please install pnpm first:
  echo    npm install -g pnpm
  pause
  exit /b 1
)

REM Step 1: Clean install dependencies
echo 📦 Step 1: Installing dependencies...
echo    This will install all packages including new @types modules
call pnpm install
if %errorlevel% neq 0 (
  echo ❌ Failed to install dependencies
  pause
  exit /b 1
)
echo ✅ Dependencies installed
echo.

REM Step 2: Generate Prisma Client
echo 🔧 Step 2: Generating Prisma Client...
call pnpm exec prisma generate
if %errorlevel% neq 0 (
  echo ❌ Failed to generate Prisma Client
  pause
  exit /b 1
)
echo ✅ Prisma Client generated
echo.

REM Step 3: Create database schema
echo 🗄️  Step 3: Creating database schema...
echo    This will run database migrations
call pnpm exec prisma migrate dev --name init
if %errorlevel% neq 0 (
  echo ❌ Failed to run migrations
  echo    Make sure PostgreSQL is running and DATABASE_URL is correct in .env.local
  pause
  exit /b 1
)
echo ✅ Database schema created
echo.

REM Step 4: Seed database with test data
echo 🌱 Step 4: Seeding database with test data...
echo    This will create admin user and sample data
call pnpm exec prisma db seed
if %errorlevel% neq 0 (
  echo ⚠️  Warning: Database seeding encountered an issue
  echo    Continuing anyway - you can manually create data if needed
)
echo ✅ Database ready
echo.

REM Step 5: Show database inspection option
echo 📊 Setup complete!
echo.
echo 💡 Optional: Inspect database with Prisma Studio
echo    Run: pnpm exec prisma studio
echo    Opens at: http://localhost:5555
echo.

REM Step 6: Ready to start
echo 🎉 You can now start the development server with:
echo.
echo    pnpm dev
echo.
echo ============================================================================
echo Server will run at: http://localhost:3000
echo.
echo Test Credentials (created via database seed):
echo   Mobile: 9000000000
echo   Password: admin123
echo.
echo Getting Started:
echo   1. Open http://localhost:3000 in your browser
echo   2. Login with credentials above
echo   3. Navigate to /admin for admin dashboard
echo   4. Test payment flow at /booking
echo ============================================================================
echo.
echo Press any key to close this window...
pause >nul
