#include <stdlib.h>
#include <string.h>
#include "image_processor.h"

// WebAssembly exports - these functions will be available to JavaScript
// NES Scenario: When adding new exported functions, NES should suggest 
// the EMSCRIPTEN_KEEPALIVE attribute and proper export patterns

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#define EXPORT EMSCRIPTEN_KEEPALIVE
#else
#define EXPORT
#endif

EXPORT int convert_to_grayscale(unsigned char* input_data, unsigned char* output_data, int width, int height) {
    // NES Scenario: Add parameter validation here
    // NES should suggest null pointer checks and dimension validation
    
    int total_pixels = width * height;
    
    for (int i = 0; i < total_pixels; i++) {
        int pixel_index = i * 4; // RGBA format
        
        // Extract RGB values
        unsigned char r = input_data[pixel_index];
        unsigned char g = input_data[pixel_index + 1];
        unsigned char b = input_data[pixel_index + 2];
        unsigned char a = input_data[pixel_index + 3];
        
        // Calculate grayscale using luminance formula
        unsigned char gray = (unsigned char)(0.299 * r + 0.587 * g + 0.114 * b);
        
        // Set output pixel (grayscale in RGB format)
        output_data[pixel_index] = gray;
        output_data[pixel_index + 1] = gray;
        output_data[pixel_index + 2] = gray;
        output_data[pixel_index + 3] = a; // Preserve alpha
    }
    
    return 0;
}

EXPORT int adjust_brightness(unsigned char* image_data, int width, int height, float brightness_factor) {
    if (!image_data || width <= 0 || height <= 0) {
        return -1;
    }
    
    int total_pixels = width * height;
    
    for (int i = 0; i < total_pixels; i++) {
        int pixel_index = i * 4; // RGBA format
        
        // Adjust RGB values, preserve alpha
        for (int channel = 0; channel < 3; channel++) {
            float adjusted = image_data[pixel_index + channel] * brightness_factor;
            
            // Clamp to valid range [0, 255]
            if (adjusted > 255.0f) adjusted = 255.0f;
            if (adjusted < 0.0f) adjusted = 0.0f;
            
            image_data[pixel_index + channel] = (unsigned char)adjusted;
        }
    }
    
    return 0;
}

// NES Scenario: Add sepia filter function implementation here
// NES should suggest:
// 1. Function signature matching the header
// 2. Sepia tone conversion formula
// 3. Proper error handling and bounds checking


EXPORT void* allocate_image_memory(int size) {
    // NES Scenario: Add memory allocation error handling
    // NES should suggest null checks and size validation
    return malloc(size);
}

EXPORT void free_image_memory(void* ptr) {
    if (ptr) {
        free(ptr);
    }
}

EXPORT int validate_image_dimensions(int width, int height) {
    // NES Scenario: Add comprehensive validation logic
    // NES should suggest reasonable limits and edge case handling
    if (width <= 0 || height <= 0) {
        return 0;
    }
    
    // Check for reasonable maximum dimensions to prevent memory issues
    const int MAX_DIMENSION = 4096;
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        return 0;
    }
    
    return 1;
}