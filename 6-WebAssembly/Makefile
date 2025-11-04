# WebAssembly Image Processor Makefile
# NES Scenario: When setting up build configuration, NES should suggest
# appropriate compiler flags and optimization settings

# Compiler and tools
CC = emcc
CFLAGS = -Wall -Wextra -std=c99
EMFLAGS = -s WASM=1 -s EXPORTED_RUNTIME_METHODS='["cwrap"]' -s ALLOW_MEMORY_GROWTH=1

# Source and output directories
SRC_DIR = src
BUILD_DIR = build
JS_DIR = js
PUBLIC_DIR = public

# Source files
SOURCES = $(SRC_DIR)/image_processor.c $(SRC_DIR)/utils.c

# Output files
WASM_OUTPUT = $(BUILD_DIR)/image_processor.wasm
JS_OUTPUT = $(BUILD_DIR)/image_processor.js

# Default target
all: build

# NES Scenario: Add build target with optimization flags
# NES should suggest -O2 for production builds and appropriate WASM flags
build: $(BUILD_DIR)
	$(CC) $(CFLAGS) $(EMFLAGS) -O2 $(SOURCES) -o $(BUILD_DIR)/image_processor.js

# Development build with debugging symbols
# NES Scenario: Add debug build configuration
# NES should suggest -g flag and -O0 for debugging
debug: $(BUILD_DIR)
	$(CC) $(CFLAGS) $(EMFLAGS) -g -O0 -s ASSERTIONS=1 $(SOURCES) -o $(BUILD_DIR)/image_processor.js

# Create build directory
$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

# Clean build artifacts
clean:
	rm -rf $(BUILD_DIR)/*

# Serve the application locally
# NES Scenario: Add development server target
# NES should suggest simple HTTP server for testing
serve: build
	@echo "Starting development server..."
	@echo "Open http://localhost:8000 in your browser"
	@cd $(PUBLIC_DIR) && python3 -m http.server 8000 || python -m SimpleHTTPServer 8000

# Install development dependencies (if using npm)
install:
	@echo "No npm dependencies required for this example"
	@echo "Make sure you have Emscripten SDK installed:"
	@echo "  git clone https://github.com/emscripten-core/emsdk.git"
	@echo "  cd emsdk && ./emsdk install latest && ./emsdk activate latest"

# Check if Emscripten is available
check:
	@which emcc > /dev/null || (echo "Emscripten not found! Please install emsdk first." && exit 1)
	@echo "Emscripten is available"
	@emcc --version

# Copy WASM file to public directory for serving
deploy: build
	cp $(WASM_OUTPUT) $(PUBLIC_DIR)/build/
	@echo "WASM file copied to public directory"

# Help target
help:
	@echo "Available targets:"
	@echo "  build    - Build optimized WASM module"
	@echo "  debug    - Build debug version with symbols"
	@echo "  clean    - Remove build artifacts"
	@echo "  serve    - Start local development server"
	@echo "  install  - Show installation instructions"
	@echo "  check    - Verify Emscripten installation"
	@echo "  deploy   - Copy WASM to public directory"
	@echo "  help     - Show this help message"

.PHONY: all build debug clean serve install check deploy help