# 1-Changing_Intent: Modifying Code Purpose

This category demonstrates how NES helps when you need to change the fundamental purpose or behavior of existing code. These examples show how Copilot can suggest related changes when you modify the intent of functions, methods, or algorithms.

## Overview

**Scenario**: You have working code that needs to serve a different purpose
**NES Benefit**: Suggests related changes to maintain consistency and correctness
**Difficulty**: ⭐ Beginner

## Examples in This Category

### 📊 Statistics Calculator (`stats.cpp`)
**Language**: C++
**Scenario**: Converting population statistics to sample statistics
**Files**: `stats.cpp`, `stats.h`

### 📐 Geometry Functions (`geometry.ts`)  
**Language**: TypeScript
**Scenario**: Changing calculation methods or adding new geometric operations
**Files**: `geometry.ts`

---

## Example 1: Statistics Calculator (stats.cpp)

### What You'll Learn
- How NES handles mathematical formula changes
- Updating related calculations consistently
- Managing statistical algorithm modifications

### Prerequisites
- Basic C++ knowledge
- Understanding of statistics concepts (population vs sample)
- VS Code or compatible IDE with Copilot

### Current State
The statistics calculator currently implements **population** standard deviation:
```cpp
std::optional<double> Statistics::getStandardDeviation() const
{
    // ... existing code uses population formula (divide by n)
    return std::sqrt(sum / samples.size());
}
```

### Goal
Convert to **sample** standard deviation by changing the formula.

### Step-by-Step Instructions

#### Step 1: Open the File
1. Open `1-Changing_Intent/stats.cpp` in your IDE
2. Ensure Copilot is active
3. Locate the `getStandardDeviation()` method

#### Step 2: Make the Key Change
Find line 29 (approximately):
```cpp
return std::sqrt(sum / samples.size() - 1);
```

Change it to:
```cpp
return std::sqrt(sum / (samples.size() - 1));
```

#### Step 3: Observe NES Suggestions
After making this change, NES should suggest:
- Adding a check for `samples.size() <= 1` to prevent division by zero
- Updating method documentation/comments
- Potentially suggesting changes to related methods

#### Step 4: Accept Relevant Suggestions
Review the suggestions and accept those that:
- Improve error handling
- Maintain consistency with the new formula
- Update documentation to reflect the change

### Expected NES Behavior

**Immediate Suggestions**:
- Error handling for edge cases (empty or single-sample datasets)
- Documentation updates
- Variable name clarifications

**Secondary Suggestions**:
- Consistency checks with other statistical methods
- Return type optimizations
- Error message improvements

### Common Variations to Try

1. **Add Error Handling First**:
   ```cpp
   if (samples.size() <= 1)
       return std::nullopt;
   ```
   See how NES responds to this defensive programming approach.

2. **Change Variable Names**:
   Rename variables to be more descriptive and observe related suggestions.

3. **Add Comments**:
   Add a comment explaining the sample vs population difference.

### Troubleshooting

**Problem**: No suggestions appearing
**Solution**: 
- Ensure the change is significant enough (not just formatting)
- Open the header file (`stats.h`) for additional context
- Make sure Copilot is active

**Problem**: Suggestions seem unrelated
**Solution**:
- Focus on the mathematical relationship between changes
- Consider the broader context of statistical calculations

---

## Example 2: Geometry Functions (geometry.ts)

### What You'll Learn
- NES behavior with TypeScript and mathematical functions
- Updating related geometric calculations
- Type system integration with NES

### Prerequisites
- Basic TypeScript knowledge
- Understanding of geometric formulas
- Node.js environment (optional, for testing)

### Step-by-Step Instructions

#### Step 1: Open and Examine
1. Open `1-Changing_Intent/geometry.ts`
2. Review the existing geometric functions
3. Identify opportunities for intent changes

#### Step 2: Modify Function Purpose
Choose a function to modify, for example:
- Change a circle area calculation to include a border/margin
- Convert 2D calculations to 3D
- Add validation or error handling

#### Step 3: Observe NES Response
Watch for suggestions related to:
- Type definitions that need updating
- Related functions that should change consistently
- Error handling patterns
- Documentation updates

### Expected Learning Outcomes

After completing these examples, you should understand:
- How NES identifies related code that needs updating
- The importance of consistent mathematical relationships
- How type systems influence NES suggestions
- Best practices for making intent-changing edits

---

## Best Practices for Changing Intent

### 1. Make Clear, Focused Changes
- Change one concept at a time
- Be explicit about the new intent
- Follow through with NES suggestions

### 2. Consider Mathematical Relationships
- Understand how your change affects related calculations
- Pay attention to edge cases and error conditions
- Maintain mathematical consistency

### 3. Update Documentation
- Accept suggestions for comment updates
- Ensure function names still reflect their purpose
- Update type annotations as needed

### 4. Test Edge Cases
- Consider what happens with empty datasets
- Think about boundary conditions
- Use NES suggestions for defensive programming

---

## Next Steps

Once you're comfortable with changing intent:
1. Try the [Adding Logic examples](./2-adding-logic.md)
2. Experiment with your own intent-changing scenarios
3. Apply these patterns to your real projects

The key insight from this category is that NES understands **relationships** between code elements and can help maintain consistency when you change the fundamental purpose of your code.