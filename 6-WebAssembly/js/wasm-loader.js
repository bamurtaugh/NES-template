/**
 * WebAssembly module loader and utilities
 * NES Scenario: When working with WASM loading, NES should suggest
 * proper async patterns and error handling
 */

class WasmLoader {
    constructor() {
        this.module = null;
        this.memory = null;
        this.isLoaded = false;
    }

    // NES Scenario: Add module caching functionality
    // NES should suggest localStorage/sessionStorage patterns for caching compiled modules

    async loadModule(wasmPath) {
        try {
            // NES Scenario: Add progress tracking for large WASM files
            // NES should suggest fetch with progress monitoring

            // Try to load the actual WASM file first
            try {
                const wasmModule = await WebAssembly.instantiateStreaming(fetch(wasmPath));
                this.module = wasmModule.instance;
                this.memory = this.module.exports.memory;
                this.isLoaded = true;
                
                console.log('WebAssembly module loaded successfully');
                return this.module;
            } catch (wasmError) {
                console.warn('WASM file not found, using mock implementation for demo');
                
                // Load mock implementation for demonstration
                const mockModule = await import('../build/mock-wasm.js');
                this.module = mockModule.default.instance;
                this.memory = this.module.exports.memory;
                this.isLoaded = true;
                
                console.log('Mock WebAssembly module loaded for demonstration');
                return this.module;
            }
        } catch (error) {
            console.error('Failed to load WebAssembly module:', error);
            throw error;
        }
    }

    // NES Scenario: Add fallback loading for older browsers
    // NES should suggest WebAssembly.instantiate as fallback

    getExports() {
        if (!this.isLoaded) {
            throw new Error('WASM module not loaded');
        }
        return this.module.exports;
    }

    allocateMemory(size) {
        // NES Scenario: Add memory allocation wrapper
        // NES should suggest calling the WASM malloc function and error handling
        const exports = this.getExports();
        return exports.allocate_image_memory(size);
    }

    freeMemory(ptr) {
        // NES Scenario: Add memory deallocation wrapper
        // NES should suggest calling the WASM free function with null checks
        if (ptr !== 0) {
            const exports = this.getExports();
            exports.free_image_memory(ptr);
        }
    }

    getMemoryView(ptr, length) {
        // NES Scenario: Create typed array view of WASM memory
        // NES should suggest Uint8Array constructor with buffer, offset, and length
        if (!this.memory) {
            throw new Error('WASM memory not available');
        }
        return new Uint8Array(this.memory.buffer, ptr, length);
    }

    copyToWasm(jsArray, wasmPtr) {
        // NES Scenario: Copy JavaScript array data to WASM memory
        // NES should suggest creating memory view and using set() method
        const memoryView = this.getMemoryView(wasmPtr, jsArray.length);
        memoryView.set(jsArray);
    }

    copyFromWasm(wasmPtr, length) {
        // NES Scenario: Copy data from WASM memory to JavaScript array
        // NES should suggest creating new array and copying from memory view
        const memoryView = this.getMemoryView(wasmPtr, length);
        return new Uint8Array(memoryView);
    }
}

// Export for use in other modules
export { WasmLoader };