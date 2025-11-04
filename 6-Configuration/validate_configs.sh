#!/bin/bash
# Configuration File Validation Script
# Validates syntax and structure of configuration files in the 6-Configuration directory

set -e  # Exit on any error

echo "🔧 Configuration File Validation Tests"
echo "======================================"

CONFIG_DIR="$(dirname "$0")"
cd "$CONFIG_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run a test
run_test() {
    local test_name="$1"
    local command="$2"
    
    echo -n "Testing $test_name... "
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if eval "$command" >/dev/null 2>&1; then
        echo -e "${GREEN}PASS${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}FAIL${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo "📁 Checking file existence..."
# Check if all files exist
for file in pyproject.toml app.yaml docker-compose.yml task-config.json task-config.schema.json nginx.conf apache.conf README.md; do
    run_test "File existence: $file" "test -f '$file'"
done

echo ""
echo "🔍 Validating file syntax..."

# JSON validation
run_test "JSON syntax: task-config.json" "python3 -m json.tool task-config.json"
run_test "JSON syntax: task-config.schema.json" "python3 -m json.tool task-config.schema.json"

# YAML validation (if PyYAML is available)
if command_exists python3 && python3 -c "import yaml" 2>/dev/null; then
    run_test "YAML syntax: app.yaml" "python3 -c 'import yaml; yaml.safe_load(open(\"app.yaml\"))'"
    run_test "YAML syntax: docker-compose.yml" "python3 -c 'import yaml; yaml.safe_load(open(\"docker-compose.yml\"))'"
else
    echo -e "${YELLOW}SKIP${NC} YAML validation (PyYAML not available)"
fi

# TOML validation (if toml/tomllib is available)
if command_exists python3 && (python3 -c "import toml" 2>/dev/null || python3 -c "import tomllib" 2>/dev/null); then
    run_test "TOML syntax: pyproject.toml" "python3 -c 'import sys; (lambda: __import__(\"tomllib\").loads(open(\"pyproject.toml\").read()) if sys.version_info >= (3,11) else __import__(\"toml\").load(\"pyproject.toml\"))()'"
else
    echo -e "${YELLOW}SKIP${NC} TOML validation (toml/tomllib not available)"
fi

# Basic structure validation
echo ""
echo "📋 Validating file structure..."

run_test "nginx.conf structure" "grep -q 'server {' nginx.conf && grep -q 'location' nginx.conf"
run_test "apache.conf structure" "grep -q 'VirtualHost' apache.conf && grep -q 'Directory' apache.conf"
run_test "README.md content" "test \$(wc -c < README.md) -gt 100"

# Check for NES scenario comments
echo ""
echo "🎯 Checking NES scenario documentation..."

run_test "TOML NES scenarios" "grep -q 'NES Scenario' pyproject.toml"
run_test "YAML NES scenarios" "grep -q 'NES Scenario' app.yaml"
run_test "JSON Schema NES documentation" "grep -q 'NES demonstrations' task-config.schema.json"

echo ""
echo "🐍 Running Python test suite..."

# Run the comprehensive Python test suite
if python3 -c "import unittest" 2>/dev/null; then
    if python3 test_configurations.py; then
        echo -e "${GREEN}Python test suite: PASS${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}Python test suite: FAIL${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
else
    echo -e "${YELLOW}SKIP${NC} Python test suite (unittest not available)"
fi

echo ""
echo "📊 Test Summary"
echo "==============="
echo "Total tests:  $TOTAL_TESTS"
echo -e "Passed:       ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed:       ${RED}$FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "\n🎉 ${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "\n❌ ${RED}Some tests failed.${NC}"
    exit 1
fi