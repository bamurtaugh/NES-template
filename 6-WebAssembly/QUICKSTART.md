# WebAssembly Example - Quick Start Guide

This guide helps you quickly test and explore the WebAssembly NES example.

## Quick Demo (No Build Required)

The example includes a mock WebAssembly implementation that works without installing Emscripten:

1. **Start the demo server:**
   ```bash
   cd 6-WebAssembly/public
   python3 -m http.server 8000
   ```

2. **Open in browser:**
   Navigate to `http://localhost:8000`

3. **Test the interface:**
   - Click "Choose an image file" to upload an image
   - Try the "Convert to Grayscale" button (uses mock WASM)
   - Adjust brightness with the slider
   - Download the processed image

## Full WebAssembly Build

For the complete experience with actual WASM compilation:

1. **Install Emscripten:**
   ```bash
   git clone https://github.com/emscripten-core/emsdk.git
   cd emsdk
   ./emsdk install latest
   ./emsdk activate latest
   source ./emsdk_env.sh
   ```

2. **Build the example:**
   ```bash
   cd 6-WebAssembly
   ./setup.sh
   ```

3. **Run the application:**
   ```bash
   make serve
   ```

## Next Edit Suggestions (NES) Scenarios

This example demonstrates several scenarios where NES helps with WebAssembly development:

### 1. C Code Development (`src/image_processor.c`)
- **Line 15:** Add parameter validation - NES suggests null pointer checks
- **Line 45:** Implement memory allocation - NES suggests malloc/free patterns
- **Line 60:** Add error handling - NES suggests boundary checks

### 2. JavaScript Interop (`js/main.js`)
- **Line 25:** Memory management - NES suggests allocation/deallocation patterns
- **Line 40:** Canvas optimization - NES suggests ImageData manipulation
- **Line 65:** File handling - NES suggests FileReader API usage

### 3. WASM Loading (`js/wasm-loader.js`)
- **Line 10:** Module caching - NES suggests browser storage patterns
- **Line 30:** Progress tracking - NES suggests fetch with progress monitoring

### 4. Build Configuration (`Makefile`)
- **Line 8:** Optimization flags - NES suggests compiler flags for production
- **Line 15:** Debug configuration - NES suggests debugging flags

## Key Learning Points

- **Performance:** Image processing in WASM vs JavaScript
- **Memory:** Efficient data transfer between languages
- **Toolchain:** Modern WebAssembly development workflow
- **Integration:** Seamless C/C++ and JavaScript interoperability

## Troubleshooting

- **404 errors:** Expected when WASM file isn't built - mock implementation will load
- **Build failures:** Ensure Emscripten is properly installed and activated
- **Browser compatibility:** Requires modern browsers with WebAssembly support

This example provides a comprehensive foundation for understanding WebAssembly development with Next Edit Suggestions.