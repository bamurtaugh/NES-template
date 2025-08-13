/**
 * Main application JavaScript for WebAssembly image processing demo
 * NES Scenario: When building WASM applications, NES should suggest
 * proper module integration and user interface handling
 */

import { WasmLoader } from './wasm-loader.js';
import { ImageUtils } from './image-utils.js';

class ImageProcessorApp {
    constructor() {
        this.wasmLoader = new WasmLoader();
        this.imageUtils = new ImageUtils();
        this.currentImage = null;
        this.originalImageData = null;
    }

    async initialize() {
        try {
            // NES Scenario: Add WASM module loading with error handling
            // NES should suggest async loading and user feedback
            this.showLoading('Loading WebAssembly module...');
            
            await this.wasmLoader.loadModule('./build/image_processor.wasm');
            this.imageUtils.initializeCanvas('imageCanvas');
            this.setupEventListeners();
            
            this.hideLoading();
            console.log('Image processor initialized successfully');
        } catch (error) {
            console.error('Initialization failed:', error);
            this.showError('Failed to initialize image processor');
        }
    }

    setupEventListeners() {
        // NES Scenario: Add event listeners for UI interactions
        // NES should suggest addEventListener patterns and event handling

        const fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', (e) => this.handleFileUpload(e));

        document.getElementById('grayscaleBtn').addEventListener('click', () => {
            this.processImage('grayscale');
        });

        document.getElementById('brightnessBtn').addEventListener('click', () => {
            const factor = parseFloat(document.getElementById('brightnessSlider').value);
            this.processImage('brightness', factor);
        });

        // NES Scenario: Add download functionality
        // NES should suggest button click handler for image download
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.imageUtils.downloadImage();
        });

        // NES Scenario: Add reset functionality
        // NES should suggest restoring original image
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetToOriginal();
        });
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            // NES Scenario: Add file validation and loading
            // NES should suggest validation and async image loading
            this.imageUtils.validateImageFile(file);
            this.showLoading('Loading image...');

            this.currentImage = await this.imageUtils.loadImageFromFile(file);
            this.originalImageData = this.imageUtils.getImageData(this.currentImage);
            this.imageUtils.putImageData(this.originalImageData);

            this.enableControls(true);
            this.hideLoading();
        } catch (error) {
            console.error('File upload failed:', error);
            this.showError(error.message);
        }
    }

    async processImage(operation, ...params) {
        if (!this.originalImageData) {
            this.showError('Please upload an image first');
            return;
        }

        try {
            this.showLoading(`Applying ${operation}...`);

            // NES Scenario: Add WASM memory management for image processing
            // NES should suggest memory allocation, data copying, and function calls

            const { width, height } = this.originalImageData;
            const dataSize = width * height * 4; // RGBA
            
            // Allocate WASM memory
            const inputPtr = this.wasmLoader.allocateMemory(dataSize);
            const outputPtr = this.wasmLoader.allocateMemory(dataSize);

            // Copy image data to WASM memory
            const inputArray = this.imageUtils.rgbaToArray(this.originalImageData);
            this.wasmLoader.copyToWasm(inputArray, inputPtr);

            // Call WASM function based on operation
            const exports = this.wasmLoader.getExports();
            let result;

            switch (operation) {
                case 'grayscale':
                    result = exports.convert_to_grayscale(inputPtr, outputPtr, width, height);
                    break;
                case 'brightness':
                    // Copy input to output first, then modify in place
                    this.wasmLoader.copyToWasm(inputArray, outputPtr);
                    result = exports.adjust_brightness(outputPtr, width, height, params[0]);
                    break;
                default:
                    throw new Error(`Unknown operation: ${operation}`);
            }

            if (result !== 0) {
                throw new Error(`WASM operation failed with code: ${result}`);
            }

            // Copy processed data back to JavaScript
            const outputArray = this.wasmLoader.copyFromWasm(outputPtr, dataSize);
            const processedImageData = this.imageUtils.arrayToImageData(outputArray, width, height);
            this.imageUtils.putImageData(processedImageData);

            // Clean up WASM memory
            this.wasmLoader.freeMemory(inputPtr);
            this.wasmLoader.freeMemory(outputPtr);

            this.hideLoading();
        } catch (error) {
            console.error('Image processing failed:', error);
            this.showError(`Processing failed: ${error.message}`);
        }
    }

    resetToOriginal() {
        // NES Scenario: Reset to original image
        // NES should suggest restoring from saved original data
        if (this.originalImageData) {
            this.imageUtils.putImageData(this.originalImageData);
        }
    }

    enableControls(enabled) {
        // NES Scenario: Enable/disable UI controls
        // NES should suggest querySelectorAll and disabled property
        const buttons = document.querySelectorAll('button:not(#resetBtn)');
        const slider = document.getElementById('brightnessSlider');
        
        buttons.forEach(btn => btn.disabled = !enabled);
        slider.disabled = !enabled;
    }

    showLoading(message) {
        // NES Scenario: Show loading indicator
        // NES should suggest DOM manipulation for loading state
        const loadingEl = document.getElementById('loading');
        const messageEl = document.getElementById('loadingMessage');
        
        messageEl.textContent = message;
        loadingEl.style.display = 'block';
    }

    hideLoading() {
        // NES Scenario: Hide loading indicator
        // NES should suggest setting display style to none
        document.getElementById('loading').style.display = 'none';
    }

    showError(message) {
        // NES Scenario: Display error message to user
        // NES should suggest error element manipulation and timeout
        const errorEl = document.getElementById('error');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        
        setTimeout(() => {
            errorEl.style.display = 'none';
        }, 5000);
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const app = new ImageProcessorApp();
    await app.initialize();
});