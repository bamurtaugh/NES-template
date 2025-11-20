#ifndef ARRAY_UTILS_H
#define ARRAY_UTILS_H

#include <vector>
#include <algorithm>
#include <numeric>

class ArrayUtils {
public:
    // Find the maximum element in an array
    static int findMax(const std::vector<int>& arr) {
        if (arr.empty()) {
            throw std::invalid_argument("Array is empty");
        }
        return *std::max_element(arr.begin(), arr.end());
    }

    // Find the minimum element in an array
    static int findMin(const std::vector<int>& arr) {
        if (arr.empty()) {
            throw std::invalid_argument("Array is empty");
        }
        return *std::min_element(arr.begin(), arr.end());
    }

    // Calculate the sum of array elements
    static int sum(const std::vector<int>& arr) {
        return std::accumulate(arr.begin(), arr.end(), 0);
    }

    // Calculate the average of array elements
    static double average(const std::vector<int>& arr) {
        if (arr.empty()) {
            throw std::invalid_argument("Array is empty");
        }
        return static_cast<double>(sum(arr)) / arr.size();
    }

    // Reverse the array
    static std::vector<int> reverse(const std::vector<int>& arr) {
        std::vector<int> result = arr;
        std::reverse(result.begin(), result.end());
        return result;
    }

    // Check if array contains a value
    static bool contains(const std::vector<int>& arr, int value) {
        return std::find(arr.begin(), arr.end(), value) != arr.end();
    }

    // Remove duplicates from array
    static std::vector<int> removeDuplicates(const std::vector<int>& arr) {
        std::vector<int> result = arr;
        std::sort(result.begin(), result.end());
        auto last = std::unique(result.begin(), result.end());
        result.erase(last, result.end());
        return result;
    }
};

#endif // ARRAY_UTILS_H
