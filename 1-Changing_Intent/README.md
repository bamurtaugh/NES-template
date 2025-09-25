# 1-Changing_Intent

This folder contains examples demonstrating how to modify code intent and behavior.

## Files

### `stats.cpp`
A C++ statistics library that provides basic statistical calculations for a collection of numeric samples:
- **add()** - Add a value to the sample collection
- **getMean()** - Calculate the arithmetic mean of all samples
- **getStandardDeviation()** - Calculate the standard deviation
- **getMin()** - Find the minimum value in the collection

The implementation uses `std::optional` to handle cases where calculations cannot be performed (e.g., empty sample sets).

### `geometry.ts`
A TypeScript class implementing basic 2D geometry:
- **Point class** - Represents a point in 2D space with x,y coordinates
- **getDistance()** - Calculates the distance from the origin (0,0) to the point

## Purpose
This folder demonstrates scenarios where you might need to change the intent or behavior of existing code, such as modifying algorithms, adding new functionality, or refactoring implementations.