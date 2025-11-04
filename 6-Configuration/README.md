# Configuration Languages: Copilot Next Edit Suggestions Demo

This directory demonstrates how Copilot Next Edit Suggestions (NES) can assist with various configuration languages, focusing on structure normalization, key renaming cascades, validation rule updates, configuration modernization, and security improvements.

## Overview

Configuration files are critical components of modern applications, and maintaining consistency, security, and best practices across different configuration formats can be challenging. NES can help developers by suggesting:

- **Structure Normalization**: Consistent formatting and organization across configuration files
- **Key Renaming Cascades**: When renaming configuration keys, suggest related updates throughout the file
- **Validation Rule Updates**: Maintain consistency in validation rules and constraints
- **Configuration Modernization**: Suggest updated syntax and best practices
- **Security Improvements**: Recommend security-focused configuration changes

## Configuration Language Examples

### 1. TOML Configuration (`pyproject.toml`)

**Use Case**: Python project configuration with build system, dependencies, and tool configurations.

**NES Scenarios**:
- **Structure Normalization**: When adding new tool configurations, NES suggests maintaining consistent formatting with existing sections
- **Key Renaming**: Changing `optional-dependencies` to follow Python packaging conventions suggests updating related references
- **Security Improvements**: Adding security tools like `bandit` configuration suggests integration with existing test workflows

**Try This**:
1. Line 20: Add a new author entry with `{name = "Jane Doe", email = "jane@example.com"}`
   - NES should suggest consistent formatting and proper array syntax

2. Line 27: Rename `[project.optional-dependencies]` to `[project.extras]`
   - NES should suggest updating any references to these dependencies

3. After line 35: Add `[tool.black]` section
   - NES should suggest common black configurations like `line-length = 88`

### 2. YAML Configuration (`app.yaml`)

**Use Case**: Application configuration with environment-specific settings, security, and logging.

**NES Scenarios**:
- **Environment Consistency**: When adding new environment configurations, suggest maintaining structure across dev/staging/prod
- **Security Best Practices**: Adding CORS or JWT configurations triggers suggestions for security best practices
- **Validation Cascades**: Changes to database configuration suggest related logging and migration updates

**Try This**:
1. Line 15: Add a `staging` environment section
   - NES should suggest consistent structure with existing `development` and `production` sections

2. Line 35: Add `allowed_hosts` to the CORS configuration
   - NES should suggest security-focused default values

3. Line 50: Add a `migrations.auto_upgrade: true` setting
   - NES should suggest related safety configurations and backup policies

### 3. JSON Schema (`task-config.schema.json`)

**Use Case**: Validation schema for task management configuration with comprehensive type definitions.

**NES Scenarios**:
- **Validation Consistency**: When adding new properties, suggest appropriate validation rules based on similar existing properties
- **Schema Evolution**: Adding new required fields suggests updating examples and default values
- **Type Safety**: Changing property types suggests cascading updates to related validations

**Try This**:
1. After line 25: Add a new `ssl` property to the database object
   - NES should suggest appropriate boolean type with security-focused description

2. Line 45: Change the `port` maximum from `65535` to `5432`
   - NES should recognize this as a PostgreSQL-specific constraint and suggest database-related validations

3. After line 80: Add a new `notifications` configuration object
   - NES should suggest consistent structure with existing feature objects

### 4. Nginx Configuration (`nginx.conf`)

**Use Case**: Web server configuration with security headers, SSL, and proxy settings.

**NES Scenarios**:
- **Security Modernization**: Adding security headers suggests additional security measures
- **Configuration Consistency**: Updating worker settings suggests related performance configurations
- **Load Balancing**: Adding upstream blocks suggests health check and failover configurations

**Try This**:
1. Line 12: Change `worker_connections` to `2048`
   - NES should suggest updating `worker_rlimit_nofile` to `4096` for consistency

2. Line 38: Add `add_header Referrer-Policy "strict-origin-when-cross-origin" always;`
   - NES should suggest additional security headers like CSP

3. Line 150: Add a new upstream server `server 127.0.0.1:3002 weight=1 max_fails=3 fail_timeout=30s;`
   - NES should suggest updating health check configurations

### 5. Apache Configuration (`apache.conf`)

**Use Case**: Apache web server with SSL, security modules, and proxy configuration.

**NES Scenarios**:
- **Security Hardening**: Changing security tokens suggests additional hardening measures
- **Module Dependencies**: Loading security modules suggests related configuration blocks
- **Virtual Host Consistency**: Updates to one virtual host suggest similar changes to others

**Try This**:
1. Line 8: Change `ServerTokens Full` to `ServerTokens Prod`
   - NES should suggest changing `ServerSignature On` to `ServerSignature Off`

2. Line 20: Uncomment `LoadModule security2_module modules/mod_security2.so`
   - NES should suggest adding ModSecurity configuration and rule sets

3. Line 115: Add `Redirect permanent / https://example.com/`
   - NES should suggest updating the HTTPS virtual host and adding HSTS headers

### 6. Docker Compose (`docker-compose.yml`)

**Use Case**: Multi-service application orchestration with databases, caching, and monitoring.

**NES Scenarios**:
- **Service Dependencies**: Adding health checks suggests updating dependent service configurations
- **Resource Management**: Adding resource limits suggests appropriate values based on service types
- **Network Security**: Configuring custom networks suggests security and isolation best practices

**Try This**:
1. Line 25: Add `depends_on: - database` to the redis service
   - NES should suggest adding health check conditions

2. Line 80: Add memory limits to the api service
   - NES should suggest appropriate CPU limits and reservations based on the memory allocation

3. After line 140: Add a new `grafana` service
   - NES should suggest connecting it to the existing Prometheus service and shared network

## Common NES Patterns Across Configuration Languages

### 1. **Consistency Enforcement**
When you modify similar configuration blocks, NES suggests applying the same changes to related sections.

### 2. **Security Propagation**
Adding security-related configurations triggers suggestions for comprehensive security improvements.

### 3. **Best Practice Alignment**
NES recognizes configuration patterns and suggests industry best practices and modern approaches.

### 4. **Dependency Awareness**
Changes to one configuration section suggest related updates in dependent or connected sections.

### 5. **Environment-Specific Adaptations**
NES understands different environments (dev/staging/prod) and suggests appropriate configurations for each.

## Testing the Examples

Each configuration file includes specific scenarios marked with "NES Scenario X" comments. To test:

1. Open any configuration file
2. Make the suggested edit at the specified line
3. Observe how NES suggests related changes
4. Continue with the suggested modifications to see cascading suggestions

## Best Practices Demonstrated

- **Security-first configurations**: Examples prioritize security settings and suggest improvements
- **Performance optimization**: Configuration suggestions include performance tuning
- **Maintainability**: Consistent structure and naming conventions across all examples
- **Documentation**: Inline comments explain the purpose and impact of configuration changes
- **Environment awareness**: Examples show how to handle different deployment environments

## Integration with Development Workflow

These configuration examples demonstrate how NES can:
- Reduce configuration errors by suggesting consistent patterns
- Improve security posture through proactive security suggestions
- Accelerate configuration setup by suggesting common patterns
- Maintain best practices across team members and projects
- Facilitate configuration evolution and modernization