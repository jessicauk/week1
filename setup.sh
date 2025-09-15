#!/bin/bash

# Week 1 Setup Script
# Quick setup for frontend and analytics components

set -e

echo "🚀 Week 1 - Frontend + Analytics Setup"
echo "======================================"

# Check for required tools
echo "📋 Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Python: $PYTHON_VERSION"
else
    echo "❌ Python 3 not found. Please install Python 3.11+"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm: $NPM_VERSION"
else
    echo "❌ npm not found. Please install npm"
    exit 1
fi

echo ""

# Setup Frontend
echo "🎨 Setting up Frontend (React + TypeScript + Vite)..."
cd frontend
echo "   📦 Installing frontend dependencies..."
npm install > /dev/null 2>&1
echo "   ✅ Frontend setup complete"
echo "   🧪 Running quick tests..."
npm run test -- --run > /dev/null 2>&1
echo "   ✅ Tests passing"
cd ..

echo ""

# Setup Analytics
echo "📊 Setting up Analytics (Python + pandas)..."
cd analytics
echo "   📦 Installing Python dependencies..."
pip install -r requirements.txt > /dev/null 2>&1
echo "   ✅ Analytics setup complete"
echo "   🧪 Running quick analysis..."
python3 eda_analysis.py > /dev/null 2>&1
echo "   ✅ Analysis complete - files generated"
cd ..

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📖 Next steps:"
echo "   Frontend development:"
echo "     cd frontend && npm run dev"
echo ""
echo "   Analytics exploration:"
echo "     cd analytics && jupyter notebook"
echo ""
echo "   Or run Python script:"
echo "     cd analytics && python3 eda_analysis.py"
echo ""
echo "📚 See README.md for detailed usage instructions"