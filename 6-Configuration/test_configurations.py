#!/usr/bin/env python3
"""
Test suite for configuration files in the 6-Configuration directory.
Validates syntax, structure, and demonstrates testing patterns for configuration files.
"""

import json
import os
import sys
import unittest
from pathlib import Path

# Try to import optional dependencies with fallbacks
try:
    import yaml
    HAS_YAML = True
except ImportError:
    HAS_YAML = False

try:
    import toml
    HAS_TOML = True
except ImportError:
    try:
        import tomllib
        HAS_TOML = True
        TOML_MODULE = 'tomllib'
    except ImportError:
        HAS_TOML = False
        TOML_MODULE = None


class ConfigurationTestCase(unittest.TestCase):
    """Base test case for configuration file validation."""

    def setUp(self):
        """Set up test environment."""
        self.config_dir = Path(__file__).parent
        self.assertTrue(self.config_dir.exists(), "Configuration directory should exist")


class TOMLConfigTest(ConfigurationTestCase):
    """Test TOML configuration files."""

    def setUp(self):
        super().setUp()
        self.toml_file = self.config_dir / "pyproject.toml"

    @unittest.skipUnless(HAS_TOML, "TOML library not available")
    def test_pyproject_toml_syntax(self):
        """Test that pyproject.toml has valid TOML syntax."""
        with open(self.toml_file, 'r', encoding='utf-8') as f:
            if TOML_MODULE == 'tomllib':
                content = f.read()
                import tomllib
                tomllib.loads(content)
            else:
                toml.load(f)

    @unittest.skipUnless(HAS_TOML, "TOML library not available")
    def test_pyproject_toml_structure(self):
        """Test that pyproject.toml has expected structure."""
        with open(self.toml_file, 'r', encoding='utf-8') as f:
            if TOML_MODULE == 'tomllib':
                content = f.read()
                import tomllib
                data = tomllib.loads(content)
            else:
                data = toml.load(f)

        # Check for required sections
        self.assertIn('build-system', data)
        self.assertIn('project', data)

        # Validate build-system section
        build_system = data['build-system']
        self.assertIn('requires', build_system)
        self.assertIn('build-backend', build_system)
        self.assertIsInstance(build_system['requires'], list)

        # Validate project section
        project = data['project']
        self.assertIn('name', project)
        self.assertIn('version', project)
        self.assertIn('description', project)

    def test_pyproject_toml_exists(self):
        """Test that pyproject.toml file exists."""
        self.assertTrue(self.toml_file.exists(), "pyproject.toml should exist")


class YAMLConfigTest(ConfigurationTestCase):
    """Test YAML configuration files."""

    def setUp(self):
        super().setUp()
        self.yaml_file = self.config_dir / "app.yaml"
        self.docker_compose_file = self.config_dir / "docker-compose.yml"

    @unittest.skipUnless(HAS_YAML, "PyYAML library not available")
    def test_app_yaml_syntax(self):
        """Test that app.yaml has valid YAML syntax."""
        with open(self.yaml_file, 'r', encoding='utf-8') as f:
            yaml.safe_load(f)

    @unittest.skipUnless(HAS_YAML, "PyYAML library not available")
    def test_app_yaml_structure(self):
        """Test that app.yaml has expected structure."""
        with open(self.yaml_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)

        # Check for required top-level sections
        self.assertIn('app', data)
        self.assertIn('environment', data)

        # Validate app section
        app = data['app']
        self.assertIn('name', app)
        self.assertIn('version', app)
        self.assertIn('host', app)
        self.assertIn('port', app)

        # Check that port is a number
        self.assertIsInstance(app['port'], int)

    @unittest.skipUnless(HAS_YAML, "PyYAML library not available")
    def test_docker_compose_yaml_syntax(self):
        """Test that docker-compose.yml has valid YAML syntax."""
        with open(self.docker_compose_file, 'r', encoding='utf-8') as f:
            yaml.safe_load(f)

    @unittest.skipUnless(HAS_YAML, "PyYAML library not available")
    def test_docker_compose_structure(self):
        """Test that docker-compose.yml has expected structure."""
        with open(self.docker_compose_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)

        # Check for required sections
        self.assertIn('version', data)
        self.assertIn('services', data)

        # Validate services section
        services = data['services']
        self.assertIsInstance(services, dict)
        self.assertGreater(len(services), 0, "Should have at least one service")

    def test_yaml_files_exist(self):
        """Test that YAML files exist."""
        self.assertTrue(self.yaml_file.exists(), "app.yaml should exist")
        self.assertTrue(self.docker_compose_file.exists(), "docker-compose.yml should exist")


class JSONConfigTest(ConfigurationTestCase):
    """Test JSON configuration files."""

    def setUp(self):
        super().setUp()
        self.json_file = self.config_dir / "task-config.json"
        self.schema_file = self.config_dir / "task-config.schema.json"

    def test_task_config_json_syntax(self):
        """Test that task-config.json has valid JSON syntax."""
        with open(self.json_file, 'r', encoding='utf-8') as f:
            json.load(f)

    def test_task_config_schema_json_syntax(self):
        """Test that task-config.schema.json has valid JSON syntax."""
        with open(self.schema_file, 'r', encoding='utf-8') as f:
            json.load(f)

    def test_task_config_structure(self):
        """Test that task-config.json has expected structure."""
        with open(self.json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Check for required properties based on the actual JSON Schema
        self.assertIn('version', data)
        self.assertIn('environment', data)
        self.assertIn('database', data)

        # Validate database structure
        database = data['database']
        self.assertIn('type', database)
        self.assertIn('name', database)

        # Check version format
        self.assertIsInstance(data['version'], str)
        
        # Check environment is valid
        valid_environments = ['development', 'staging', 'production']
        self.assertIn(data['environment'], valid_environments)

    def test_schema_structure(self):
        """Test that task-config.schema.json has valid JSON Schema structure."""
        with open(self.schema_file, 'r', encoding='utf-8') as f:
            schema = json.load(f)

        # Check for required JSON Schema properties
        self.assertIn('$schema', schema)
        self.assertIn('type', schema)
        self.assertIn('properties', schema)
        self.assertIn('required', schema)

        # Validate that it's defining an object schema
        self.assertEqual(schema['type'], 'object')
        self.assertIsInstance(schema['properties'], dict)
        self.assertIsInstance(schema['required'], list)

    def test_json_files_exist(self):
        """Test that JSON files exist."""
        self.assertTrue(self.json_file.exists(), "task-config.json should exist")
        self.assertTrue(self.schema_file.exists(), "task-config.schema.json should exist")


class WebServerConfigTest(ConfigurationTestCase):
    """Test web server configuration files."""

    def setUp(self):
        super().setUp()
        self.nginx_file = self.config_dir / "nginx.conf"
        self.apache_file = self.config_dir / "apache.conf"

    def test_nginx_config_exists(self):
        """Test that nginx.conf exists and is readable."""
        self.assertTrue(self.nginx_file.exists(), "nginx.conf should exist")
        with open(self.nginx_file, 'r', encoding='utf-8') as f:
            content = f.read()
            self.assertGreater(len(content), 0, "nginx.conf should not be empty")

    def test_nginx_config_structure(self):
        """Test that nginx.conf has basic structure."""
        with open(self.nginx_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check for basic nginx configuration blocks
        self.assertIn('server {', content)
        self.assertIn('location', content)

    def test_apache_config_exists(self):
        """Test that apache.conf exists and is readable."""
        self.assertTrue(self.apache_file.exists(), "apache.conf should exist")
        with open(self.apache_file, 'r', encoding='utf-8') as f:
            content = f.read()
            self.assertGreater(len(content), 0, "apache.conf should not be empty")

    def test_apache_config_structure(self):
        """Test that apache.conf has basic structure."""
        with open(self.apache_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check for basic Apache configuration directives
        self.assertIn('VirtualHost', content)
        self.assertIn('Directory', content)


class ConfigurationIntegrationTest(ConfigurationTestCase):
    """Integration tests for configuration files."""

    def test_all_config_files_exist(self):
        """Test that all expected configuration files exist."""
        expected_files = [
            "pyproject.toml",
            "app.yaml",
            "docker-compose.yml",
            "task-config.json",
            "task-config.schema.json",
            "nginx.conf",
            "apache.conf",
            "README.md"
        ]

        for filename in expected_files:
            file_path = self.config_dir / filename
            self.assertTrue(file_path.exists(), f"{filename} should exist")

    def test_readme_exists_and_not_empty(self):
        """Test that README.md exists and contains content."""
        readme_file = self.config_dir / "README.md"
        self.assertTrue(readme_file.exists(), "README.md should exist")

        with open(readme_file, 'r', encoding='utf-8') as f:
            content = f.read()
            self.assertGreater(len(content), 100, "README.md should have substantial content")
            self.assertIn('Configuration', content, "README should mention configuration")


def main():
    """Run the test suite."""
    # Add the configuration directory to the path for imports
    config_dir = Path(__file__).parent
    sys.path.insert(0, str(config_dir))

    # Create test suite
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    # Add test cases
    suite.addTests(loader.loadTestsFromTestCase(TOMLConfigTest))
    suite.addTests(loader.loadTestsFromTestCase(YAMLConfigTest))
    suite.addTests(loader.loadTestsFromTestCase(JSONConfigTest))
    suite.addTests(loader.loadTestsFromTestCase(WebServerConfigTest))
    suite.addTests(loader.loadTestsFromTestCase(ConfigurationIntegrationTest))

    # Run tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    # Print summary
    print(f"\n{'='*60}")
    print(f"Configuration Tests Summary")
    print(f"{'='*60}")
    print(f"Tests run: {result.testsRun}")
    print(f"Failures: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")
    print(f"Skipped: {len(result.skipped) if hasattr(result, 'skipped') else 0}")

    if result.failures:
        print(f"\nFailures:")
        for test, traceback in result.failures:
            print(f"  - {test}")

    if result.errors:
        print(f"\nErrors:")
        for test, traceback in result.errors:
            print(f"  - {test}")

    # Return exit code
    return 0 if result.wasSuccessful() else 1


if __name__ == '__main__':
    sys.exit(main())