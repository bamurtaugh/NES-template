/**
 * Image handling utilities for canvas and file operations
 * NES Scenario: When working with image processing, NES should suggest
 * efficient canvas operations and proper data conversions
 */

class ImageUtils {
    constructor() {
        this.canvas = null;
        this.ctx = null;
    }

    initializeCanvas(canvasId) {
        // NES Scenario: Add canvas initialization
        // NES should suggest getElementById and getContext('2d')
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        if (!this.canvas || !this.ctx) {
            throw new Error('Failed to initialize canvas');
        }
    }

    // NES Scenario: Add file upload handling
    // NES should suggest FileReader API and image validation
    async loadImageFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = event.target.result;
            };
            
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    getImageData(img) {
        // NES Scenario: Extract image data from loaded image
        // NES should suggest canvas drawing and getImageData
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        
        this.ctx.drawImage(img, 0, 0);
        return this.ctx.getImageData(0, 0, img.width, img.height);
    }

    putImageData(imageData) {
        // NES Scenario: Display processed image data on canvas
        // NES should suggest putImageData method
        this.ctx.putImageData(imageData, 0, 0);
    }

    // NES Scenario: Add image data conversion utilities
    // NES should suggest conversion between different pixel formats

    rgbaToArray(imageData) {
        // Convert ImageData to flat RGBA array
        return new Uint8Array(imageData.data);
    }

    arrayToImageData(array, width, height) {
        // NES Scenario: Create ImageData from array
        // NES should suggest ImageData constructor with Uint8ClampedArray
        const imageData = new ImageData(width, height);
        imageData.data.set(array);
        return imageData;
    }

    downloadImage(filename = 'processed-image.png') {
        // NES Scenario: Add image download functionality
        // NES should suggest canvas.toBlob and URL.createObjectURL
        this.canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        });
    }

    getImageDimensions(file) {
        // NES Scenario: Get image dimensions without loading full image
        // NES should suggest creating temporary Image object
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.src = URL.createObjectURL(file);
        });
    }

    validateImageFile(file) {
        // NES Scenario: Validate uploaded file is an image
        // NES should suggest MIME type checking and size limits
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid file type. Please upload a valid image file.');
        }
        
        if (file.size > maxSize) {
            throw new Error('File too large. Please upload an image smaller than 10MB.');
        }
        
        return true;
    }
}

export { ImageUtils };