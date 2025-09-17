# 1-Changing_Intent: Examples of Modifying Code Purpose

This directory contains examples that demonstrate how GitHub Copilot's Next Edit Suggestions (NES) helps when you need to change the fundamental purpose or behavior of existing code.

## Examples in This Directory

### 📊 Statistics Calculator (`stats.cpp`)
**Language**: C++
**Difficulty**: ⭐ Beginner
**Focus**: Converting statistical algorithms (population vs sample calculations)

**Quick Start**:
1. Open `stats.cpp` in your IDE with Copilot enabled
2. Locate the `getStandardDeviation()` method around line 29
3. Change `sum / samples.size() - 1` to `sum / (samples.size() - 1)`
4. Observe how NES suggests related changes for error handling and consistency

### 📐 Geometry Functions (`geometry.ts`)
**Language**: TypeScript
**Difficulty**: ⭐ Beginner
**Focus**: Modifying geometric calculations and adding validation

**Quick Start**:
1. Open `geometry.ts` in your IDE with Copilot enabled
2. Choose a function to modify (e.g., add border calculations to area functions)
3. Make the change and observe NES suggestions for related updates

## Learning Objectives

After working through these examples, you should understand:
- How NES identifies code relationships and dependencies
- The importance of mathematical consistency in related calculations
- How to use NES suggestions for defensive programming
- Best practices for making intent-changing edits

## Prerequisites

- Basic programming knowledge in C++ or TypeScript
- Understanding of mathematical concepts (statistics, geometry)
- IDE with GitHub Copilot enabled

## Detailed Documentation

For comprehensive instructions and explanations, see the [full documentation](../docs/examples/1-changing-intent.md).

## Next Steps

After completing these examples:
1. Try the [Adding Logic examples](../2-Adding_Logic/) for more complex scenarios
2. Experiment with your own intent-changing scenarios
3. Apply these patterns to your real projects

## Tips for Success

- Make clear, focused changes that demonstrate a specific intent
- Pay attention to mathematical relationships between functions
- Accept NES suggestions that improve error handling and validation
- Use descriptive variable names to help NES understand your intent