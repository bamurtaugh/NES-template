#!/bin/bash

# WebAssembly Example Setup Script
# This script helps set up the development environment for the WebAssembly example

echo "🚀 WebAssembly NES Example Setup"
echo "================================="

# Check if Emscripten is installed
if command -v emcc &> /dev/null; then
    echo "✅ Emscripten is already installed"
    emcc --version
else
    echo "❌ Emscripten not found"
    echo ""
    echo "To install Emscripten SDK:"
    echo "1. Clone the emsdk repository:"
    echo "   git clone https://github.com/emscripten-core/emsdk.git"
    echo "2. Install and activate:"
    echo "   cd emsdk"
    echo "   ./emsdk install latest"
    echo "   ./emsdk activate latest"
    echo "   source ./emsdk_env.sh"
    echo ""
    echo "After installation, run this script again to build the example."
    exit 1
fi

# Build the WebAssembly module
echo ""
echo "🔨 Building WebAssembly module..."
make build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Copy WASM file to public directory
    echo "📁 Copying WASM file to public directory..."
    make deploy
    
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "To start the development server:"
    echo "  make serve"
    echo ""
    echo "Then open http://localhost:8000 in your browser"
else
    echo "❌ Build failed"
    echo "Please check the error messages above"
    exit 1
fi