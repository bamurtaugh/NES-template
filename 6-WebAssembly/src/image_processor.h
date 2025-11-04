#ifndef IMAGE_PROCESSOR_H
#define IMAGE_PROCESSOR_H

// Image processing function declarations
// NES Scenario: When adding new function declarations, NES should suggest 
// consistent parameter patterns and documentation comments

/**
 * Convert RGB image to grayscale
 * @param input_data Pointer to input RGB image data
 * @param output_data Pointer to output grayscale image data  
 * @param width Image width in pixels
 * @param height Image height in pixels
 * @return 0 on success, -1 on error
 */
int convert_to_grayscale(unsigned char* input_data, unsigned char* output_data, int width, int height);

/**
 * Apply brightness adjustment to image
 * @param image_data Pointer to image data (RGB format)
 * @param width Image width in pixels
 * @param height Image height in pixels
 * @param brightness_factor Brightness multiplier (0.0 = black, 1.0 = normal, 2.0 = double brightness)
 * @return 0 on success, -1 on error
 */
int adjust_brightness(unsigned char* image_data, int width, int height, float brightness_factor);

// NES Scenario: Add new sepia filter function declaration here
// NES should suggest function signature matching the pattern above


/**
 * Allocate memory for image processing
 * @param size Number of bytes to allocate
 * @return Pointer to allocated memory, or NULL on failure
 */
void* allocate_image_memory(int size);

/**
 * Free allocated image memory
 * @param ptr Pointer to memory to free
 */
void free_image_memory(void* ptr);

/**
 * Validate image dimensions
 * @param width Image width
 * @param height Image height
 * @return 1 if valid, 0 if invalid
 */
int validate_image_dimensions(int width, int height);

#endif // IMAGE_PROCESSOR_H