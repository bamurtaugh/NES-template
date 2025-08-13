# WebAssembly: Copilot Next Edit Suggestions Demo

This project demonstrates how Copilot Next Edit Suggestions (NES) can assist with WebAssembly development workflows. The example includes a practical image processing application that showcases common WebAssembly patterns and development scenarios.

## Project Structure

```
6-WebAssembly/
├── src/
│   ├── image_processor.c    # C source code for WASM compilation
│   ├── image_processor.h    # Header file with function declarations
│   └── utils.c              # Utility functions for image processing
├── js/
│   ├── main.js              # JavaScript glue code and DOM interaction
│   ├── wasm-loader.js       # WebAssembly module loading utilities
│   └── image-utils.js       # Image handling and canvas operations
├── public/
│   ├── index.html           # Main HTML interface
│   └── styles.css           # Application styling
├── build/
│   └── image_processor.wasm # Compiled WebAssembly module (generated)
├── Makefile                 # Build configuration for compiling C to WASM
└── package.json             # Project configuration and dependencies
```

## How to Use This Example

This example demonstrates several scenarios where NES can assist with WebAssembly development:

### Scenario 1: [`image_processor.c`](/6-WebAssembly/src/image_processor.c)

1. Line 15: Add a new image filter function `apply_sepia_filter`
   
   NES should suggest the function signature and basic implementation structure for sepia tone conversion.

2. Line 45: Implement memory allocation for the filtered image buffer
   
   NES should suggest proper malloc/free patterns and size calculations for image data.

3. Line 60: Add error handling for invalid image dimensions
   
   NES should suggest boundary checks and return value handling.

### Scenario 2: [`main.js`](/6-WebAssembly/js/main.js)

1. Line 25: Create WebAssembly memory management functions
   
   NES should suggest memory allocation, deallocation, and data copying between JavaScript and WASM.

2. Line 40: Add canvas drawing optimization
   
   NES should suggest ImageData manipulation and efficient canvas updates.

3. Line 65: Implement file upload handling
   
   NES should suggest FileReader API usage and image validation.

### Scenario 3: [`wasm-loader.js`](/6-WebAssembly/js/wasm-loader.js)

1. Line 10: Add WASM module caching
   
   NES should suggest browser storage patterns for compiled modules.

2. Line 30: Implement progressive loading with progress indicators
   
   NES should suggest fetch with progress tracking and user feedback.

### Scenario 4: [`Makefile`](/6-WebAssembly/Makefile)

1. Line 8: Add optimization flags for production builds
   
   NES should suggest appropriate compiler flags for size and performance optimization.

2. Line 15: Create debug build target
   
   NES should suggest debugging flags and source map generation.

## WebAssembly Development Scenarios

This example showcases common WebAssembly development patterns where NES provides valuable assistance:

- **C/C++ to WASM compilation**: Writing efficient algorithms in C for web deployment
- **JavaScript interop**: Creating seamless bridges between JS and WASM
- **Memory management**: Handling shared memory between JavaScript and WebAssembly
- **Performance optimization**: Implementing computationally intensive tasks in WASM
- **Build toolchain**: Configuring compilation and optimization settings
- **Error handling**: Managing failures across language boundaries
- **Module loading**: Asynchronous WASM module loading and initialization

## Building and Running

1. Install Emscripten SDK for WebAssembly compilation:
   ```bash
   # Install emsdk
   git clone https://github.com/emscripten-core/emsdk.git
   cd emsdk
   ./emsdk install latest
   ./emsdk activate latest
   source ./emsdk_env.sh
   ```

2. Build the WebAssembly module:
   ```bash
   make build
   ```

3. Serve the application:
   ```bash
   # Simple HTTP server (Python 3)
   python -m http.server 8000
   
   # Or using Node.js
   npx serve .
   ```

4. Open `http://localhost:8000` in your browser

## Key WebAssembly Concepts Demonstrated

- **Exported Functions**: C functions exposed to JavaScript
- **Memory Management**: Allocating and freeing memory in WASM
- **Data Types**: Converting between JavaScript and C data types
- **Performance**: Leveraging WASM for computationally intensive tasks
- **Debugging**: Strategies for debugging WebAssembly modules
- **Optimization**: Compiler flags and code patterns for optimal performance

This example provides a comprehensive foundation for understanding how NES can accelerate WebAssembly development across multiple languages and development scenarios.