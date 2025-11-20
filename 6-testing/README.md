# 6-Testing: Unit Testing Examples

This folder contains various unit testing examples across different programming languages and testing frameworks. These examples demonstrate how to write comprehensive test suites and can be used to practice with GitHub Copilot's Next Edit Suggestions (NES) feature.

## Contents

### JavaScript (Jest)
- **calculator.js** - A simple calculator class with basic arithmetic operations
- **calculator.test.js** - Jest test suite covering all calculator methods
  - Basic operations (add, subtract, multiply, divide)
  - Error handling (division by zero, negative square roots)
  - Edge cases and boundary conditions

### Python (pytest)
- **string_utils.py** - String manipulation utility functions
- **test_string_utils.py** - Comprehensive pytest test suite
  - String reversal and palindrome checking
  - Vowel counting and text transformation
  - Whitespace removal and string truncation
  - Organized into test classes for better structure

### TypeScript (Vitest)
- **user-service.ts** - User management service with validation
- **user-service.test.ts** - Vitest test suite with TypeScript types
  - Email, username, and age validation
  - CRUD operations for user management
  - Service layer testing with mock data
  - Type-safe test assertions

### Java (JUnit)
- **MathOperations.java** - Mathematical utility functions
- **MathOperationsTest.java** - JUnit 4 test suite
  - Factorial calculations
  - Fibonacci sequence generation
  - Prime number checking
  - GCD and LCM calculations
  - Exception testing with annotations

### C++ (Google Test)
- **array_utils.h** - Array manipulation utilities
- **array_utils_test.cpp** - Google Test framework tests
  - Array statistics (min, max, sum, average)
  - Array transformations (reverse, remove duplicates)
  - Test fixtures for setup/teardown
  - Exception handling tests

## Using These Examples with Copilot NES

These examples are designed to help you practice with GitHub Copilot's Next Edit Suggestions. Here are some scenarios to try:

### Scenario 1: Adding New Test Cases
1. Add a new method to any of the source files (e.g., a `modulo` method in calculator.js)
2. NES should suggest adding corresponding test cases in the test file

### Scenario 2: Refactoring Tests
1. Change a test from using `expect().toBe()` to `expect().toEqual()`
2. NES should suggest updating similar assertions throughout the file

### Scenario 3: Adding Error Handling
1. Add a new error condition to a function (e.g., checking for null/undefined)
2. NES should suggest adding test cases for the new error condition

### Scenario 4: Implementing Missing Methods
1. Add a method declaration without implementation
2. NES should suggest the implementation based on similar methods

### Scenario 5: Test Organization
1. Add a new `describe` or `class` block in a test file
2. NES should suggest grouping related tests and adding appropriate test cases

## Running the Tests

### JavaScript/Jest
```bash
npm install --save-dev jest
npx jest calculator.test.js
```

### Python/pytest
```bash
pip install pytest
pytest test_string_utils.py
```

### TypeScript/Vitest
```bash
npm install --save-dev vitest
npx vitest user-service.test.ts
```

### Java/JUnit
```bash
# Using Maven
mvn test

# Or with JUnit directly
javac -cp junit-4.13.2.jar MathOperations.java MathOperationsTest.java
java -cp .:junit-4.13.2.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore MathOperationsTest
```

### C++/Google Test
```bash
g++ -std=c++11 -isystem /path/to/googletest/include \
    -pthread array_utils_test.cpp -lgtest -lgtest_main -o array_utils_test
./array_utils_test
```

## Best Practices Demonstrated

1. **Test Organization**: Tests are grouped logically using describe/class blocks
2. **Setup/Teardown**: Use of beforeEach/setUp for test initialization
3. **Comprehensive Coverage**: Tests cover normal cases, edge cases, and error conditions
4. **Clear Naming**: Test names clearly describe what is being tested
5. **Assertions**: Proper use of assertion methods for different validation types
6. **Error Testing**: Examples of testing exception handling and error cases
7. **Type Safety**: TypeScript examples show type-safe testing practices

## Tips for Extending These Examples

- Add parameterized tests for testing multiple similar cases
- Add integration tests that test multiple components together
- Add mocking examples for testing dependencies
- Add async/await testing patterns
- Add test coverage reporting
- Add performance/benchmark tests
