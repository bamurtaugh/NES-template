# Makefile for 6-Configuration Tests
# Provides convenient commands to test and validate configuration files

.PHONY: test validate clean help install-deps

# Default target
help:
	@echo "Configuration Testing Commands"
	@echo "=============================="
	@echo "make test          - Run all configuration tests"
	@echo "make validate      - Run basic validation script"
	@echo "make python-test   - Run Python test suite only"
	@echo "make install-deps  - Install optional testing dependencies"
	@echo "make clean         - Clean up test artifacts"
	@echo "make help          - Show this help message"

# Run all tests
test: validate python-test
	@echo "✅ All configuration tests completed"

# Run the validation script
validate:
	@echo "🔧 Running configuration validation..."
	./validate_configs.sh

# Run only the Python test suite
python-test:
	@echo "🐍 Running Python test suite..."
	python3 test_configurations.py

# Install optional dependencies for comprehensive testing
install-deps:
	@echo "📦 Installing optional testing dependencies..."
	@pip3 install --user pyyaml toml || echo "Note: Some dependencies may not be available"

# Clean up any test artifacts
clean:
	@echo "🧹 Cleaning up test artifacts..."
	@find . -name "*.pyc" -delete 2>/dev/null || true
	@find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
	@echo "Clean complete"

# Quick syntax validation using built-in tools
quick-test:
	@echo "⚡ Quick syntax validation..."
	@python3 -m json.tool task-config.json > /dev/null && echo "✅ task-config.json"
	@python3 -m json.tool task-config.schema.json > /dev/null && echo "✅ task-config.schema.json"
	@test -f pyproject.toml && echo "✅ pyproject.toml exists"
	@test -f app.yaml && echo "✅ app.yaml exists"
	@test -f docker-compose.yml && echo "✅ docker-compose.yml exists"
	@test -f nginx.conf && echo "✅ nginx.conf exists"
	@test -f apache.conf && echo "✅ apache.conf exists"