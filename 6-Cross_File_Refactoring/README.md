# Cross-File Refactoring Scenarios for VS Code NES

This directory contains examples demonstrating how **VS Code's Next Edit Suggestions (NES)** helps with cross-file refactoring in modern development workflows.

## Overview

Cross-file refactoring is one of the most challenging aspects of maintaining large codebases. When you rename a function, interface, or component, the changes often need to propagate across multiple files, requiring updates to:

- Import/export statements
- Type annotations
- Function calls
- Component props
- Variable references

NES makes this process seamless by automatically suggesting related changes across your entire codebase.

## Examples

### 📁 User Management App (React + TypeScript)

**Location**: `user-management-app/`

A complete React application demonstrating cross-file refactoring scenarios including:

- **Entity renaming**: Changing core types (User → Customer) across multiple files
- **Service method updates**: Renaming API methods and updating all call sites
- **Utility function refactoring**: Renaming helper functions and updating imports
- **File restructuring**: Moving types between files and updating import statements
- **Component prop renaming**: Updating React component interfaces and usage

**Key Features**:
- ✅ Real-world React app with TypeScript
- ✅ Multi-file architecture (components, services, types, utilities)
- ✅ Complex import dependencies
- ✅ 5 detailed refactoring scenarios
- ✅ Step-by-step NES demonstration guide

[**📖 View detailed scenarios →**](user-management-app/README.md)

## How to Use These Examples

1. **Open any example in VS Code** with NES enabled
2. **Follow the scenario instructions** in each README
3. **Make the suggested initial change** (e.g., rename a type or function)
4. **Watch for NES suggestions** appearing in other files
5. **Accept the suggestions** to see cross-file refactoring in action

## Why Cross-File Refactoring Matters

In modern applications:
- **Components are interconnected** through imports and props
- **Types flow through multiple layers** (API → services → components)
- **Utilities are shared** across many files
- **Manual refactoring is error-prone** and time-consuming

NES transforms this from a tedious, risky process into a confident, automated workflow.

## Real-World Impact

These scenarios represent actual refactoring challenges in production codebases:

- **API evolution**: Updating service interfaces as requirements change
- **Domain modeling**: Renaming business entities for clarity
- **Code organization**: Restructuring files as projects grow
- **Team standardization**: Applying consistent naming conventions
- **Library updates**: Adapting to new dependency interfaces

The time savings and error reduction provided by NES becomes exponentially more valuable as codebases grow in size and complexity.