// Placeholder WebAssembly module loader for demo purposes
// This file simulates a compiled WASM module when Emscripten is not available

// Create a mock WebAssembly module for demonstration
const mockWasmModule = {
    instance: {
        exports: {
            memory: new WebAssembly.Memory({ initial: 256 }),
            
            // Mock implementations of our C functions
            convert_to_grayscale: function(inputPtr, outputPtr, width, height) {
                console.log('Mock: Converting to grayscale', { width, height });
                // Simple mock implementation - copy input to output and apply basic grayscale
                const memory = new Uint8Array(this.memory.buffer);
                const totalPixels = width * height;
                
                for (let i = 0; i < totalPixels; i++) {
                    const pixelIndex = i * 4;
                    const r = memory[inputPtr + pixelIndex];
                    const g = memory[inputPtr + pixelIndex + 1];
                    const b = memory[inputPtr + pixelIndex + 2];
                    const a = memory[inputPtr + pixelIndex + 3];
                    
                    const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
                    
                    memory[outputPtr + pixelIndex] = gray;
                    memory[outputPtr + pixelIndex + 1] = gray;
                    memory[outputPtr + pixelIndex + 2] = gray;
                    memory[outputPtr + pixelIndex + 3] = a;
                }
                return 0;
            },
            
            adjust_brightness: function(imageDataPtr, width, height, factor) {
                console.log('Mock: Adjusting brightness', { width, height, factor });
                const memory = new Uint8Array(this.memory.buffer);
                const totalPixels = width * height;
                
                for (let i = 0; i < totalPixels; i++) {
                    const pixelIndex = i * 4;
                    for (let channel = 0; channel < 3; channel++) {
                        let value = memory[imageDataPtr + pixelIndex + channel] * factor;
                        value = Math.max(0, Math.min(255, value));
                        memory[imageDataPtr + pixelIndex + channel] = Math.round(value);
                    }
                }
                return 0;
            },
            
            allocate_image_memory: function(size) {
                console.log('Mock: Allocating memory', size);
                // Simple mock - maintain a pointer counter and simulate memory allocation
                if (!this._nextPtr) this._nextPtr = 1024;
                const ptr = this._nextPtr;
                this._nextPtr += size;
                
                // Ensure memory buffer is large enough
                const requiredPages = Math.ceil(this._nextPtr / 65536);
                if (this.memory.buffer.byteLength < requiredPages * 65536) {
                    this.memory.grow(requiredPages - this.memory.buffer.byteLength / 65536);
                }
                
                return ptr;
            },
            
            free_image_memory: function(ptr) {
                console.log('Mock: Freeing memory', ptr);
                // Mock - do nothing
            },
            
            validate_image_dimensions: function(width, height) {
                return (width > 0 && width <= 4096 && height > 0 && height <= 4096) ? 1 : 0;
            }
        }
    }
};

// Export the mock module for use in development
export default mockWasmModule;