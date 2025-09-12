# Testing Guide for 6-Configuration

This directory contains comprehensive tests for all configuration files to ensure they maintain proper syntax, structure, and demonstrate NES (Next Edit Suggestions) scenarios effectively.

## Available Test Suites

### 1. Python Test Suite (`test_configurations.py`)
**Most comprehensive testing suite**

```bash
# Run all Python tests
python3 test_configurations.py

# Or using the Makefile
make python-test
```

**Features:**
- ✅ JSON syntax validation using Python's `json` module
- ✅ YAML syntax validation using `PyYAML` (with graceful fallback)
- ✅ TOML syntax validation using `toml` or `tomllib` (with graceful fallback)
- ✅ Structure validation for all configuration types
- ✅ JSON Schema validation
- ✅ Web server config structure checks
- ✅ Comprehensive error reporting

### 2. Node.js Test Suite (`test_configs.js`)
**Cross-platform JavaScript validation**

```bash
# Run Node.js tests
node test_configs.js

# Or using npm
npm test
```

**Features:**
- ✅ JSON syntax validation using native JSON parsing
- ✅ YAML syntax validation using `js-yaml` (with graceful fallback)
- ✅ Text file readability checks
- ✅ Structure validation
- ✅ Colorized output

### 3. Bash Validation Script (`validate_configs.sh`)
**Quick command-line validation**

```bash
# Run bash validation
./validate_configs.sh

# Or using the Makefile
make validate
```

**Features:**
- ✅ File existence checks
- ✅ Built-in syntax validation using system tools
- ✅ NES scenario documentation verification
- ✅ Colorized output
- ✅ Works without additional dependencies

### 4. Makefile Commands
**Convenient test execution**

```bash
make help          # Show all available commands
make test           # Run all test suites
make validate       # Run quick validation
make python-test    # Run only Python tests
make quick-test     # Basic syntax checks only
make install-deps   # Install optional testing dependencies
make clean          # Clean up test artifacts
```

## Test Coverage

### Configuration Files Tested
- ✅ `pyproject.toml` - TOML syntax and Python project structure
- ✅ `app.yaml` - YAML syntax and application configuration structure
- ✅ `docker-compose.yml` - Docker Compose YAML structure
- ✅ `task-config.json` - JSON syntax and application config structure
- ✅ `task-config.schema.json` - JSON Schema validation and structure
- ✅ `nginx.conf` - Basic Nginx configuration structure
- ✅ `apache.conf` - Basic Apache configuration structure
- ✅ `README.md` - Documentation presence and content

### Validation Types
1. **Syntax Validation**: Ensures all files have valid syntax for their respective formats
2. **Structure Validation**: Verifies expected fields and sections are present
3. **Schema Compliance**: Validates JSON files against their schemas where applicable
4. **NES Documentation**: Checks for proper NES scenario documentation
5. **Integration Testing**: Ensures all files work together as a cohesive set

## Dependencies

### Required (Always Available)
- Python 3.x with `json` module (built-in)
- Node.js with native JSON support
- Bash shell with common utilities (`grep`, `test`, etc.)

### Optional (Enhanced Features)
- `PyYAML` for comprehensive YAML validation
- `toml` or `tomllib` for TOML validation
- `js-yaml` for Node.js YAML validation

```bash
# Install optional Python dependencies
pip3 install --user pyyaml toml

# Install optional Node.js dependencies
npm install js-yaml
```

## Continuous Integration

These tests are designed to be easily integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions step
- name: Validate Configuration Files
  run: |
    cd 6-Configuration
    make test
```

```yaml
# Example with dependency installation
- name: Install Test Dependencies
  run: |
    pip3 install pyyaml toml
    npm install js-yaml

- name: Run Configuration Tests
  run: |
    cd 6-Configuration
    python3 test_configurations.py
    node test_configs.js
    ./validate_configs.sh
```

## Error Handling

All test suites include:
- **Graceful fallback** when optional dependencies are missing
- **Clear error messages** indicating what failed and why
- **Exit codes** appropriate for CI/CD integration
- **Detailed logging** for debugging configuration issues

## Adding New Configuration Files

When adding new configuration files to this directory:

1. Add the file to the `CONFIG_FILES` lists in test suites
2. Update the `expected_files` list in Python tests
3. Add appropriate structure validation tests
4. Include NES scenario documentation in the file
5. Update this testing guide

## NES Scenario Testing

Each configuration file includes comments demonstrating Next Edit Suggestions scenarios. The tests verify:
- ✅ NES scenario comments are present and properly formatted
- ✅ Configuration changes trigger appropriate suggestions
- ✅ Related sections maintain consistency
- ✅ Security and best practice patterns are documented

This ensures the configuration examples serve their purpose as effective NES demonstrations.