#include "image_processor.h"
#include <math.h>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#define EXPORT EMSCRIPTEN_KEEPALIVE
#else
#define EXPORT
#endif

/**
 * Utility functions for common image processing operations
 * NES Scenario: When adding new utility functions, NES should suggest
 * consistent patterns and mathematical operations
 */

EXPORT float clamp_float(float value, float min, float max) {
    // NES Scenario: Add boundary clamping logic
    // NES should suggest proper min/max comparison and return
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

EXPORT unsigned char clamp_byte(int value) {
    // NES Scenario: Convert integer to byte with clamping
    // NES should suggest range checking for [0, 255]
    if (value < 0) return 0;
    if (value > 255) return 255;
    return (unsigned char)value;
}

EXPORT float calculate_distance(float x1, float y1, float x2, float y2) {
    // NES Scenario: Add Euclidean distance calculation
    // NES should suggest sqrt and squared differences
    float dx = x2 - x1;
    float dy = y2 - y1;
    return sqrt(dx * dx + dy * dy);
}

EXPORT int get_pixel_index(int x, int y, int width, int channels) {
    // NES Scenario: Calculate pixel array index for 2D coordinates
    // NES should suggest the standard formula: (y * width + x) * channels
    return (y * width + x) * channels;
}

EXPORT void copy_pixel(unsigned char* src, unsigned char* dst, int src_index, int dst_index) {
    // NES Scenario: Copy RGBA pixel data between arrays
    // NES should suggest copying all 4 channels (RGBA)
    dst[dst_index] = src[src_index];         // R
    dst[dst_index + 1] = src[src_index + 1]; // G
    dst[dst_index + 2] = src[src_index + 2]; // B
    dst[dst_index + 3] = src[src_index + 3]; // A
}

EXPORT int is_valid_coordinate(int x, int y, int width, int height) {
    // NES Scenario: Validate pixel coordinates are within image bounds
    // NES should suggest boundary checks for both x and y
    return (x >= 0 && x < width && y >= 0 && y < height);
}