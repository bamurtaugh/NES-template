# YAML Configuration: Copilot Next Edit Suggestions Demo

This example demonstrates how Copilot Next Edit Suggestions (NES) can assist with YAML configuration files, particularly in the context of domain-specific languages for application and infrastructure configuration.

## Project Structure

```
6-Domain_Specific/yaml-config-example/
├── app-config.yaml        # Application configuration example
├── deployment-config.yaml # Kubernetes deployment configuration
└── README.md             # This file
```

## How to Use This Example

### Scenario 1: [`app-config.yaml`](/6-Domain_Specific/yaml-config-example/app-config.yaml)

#### **Adding Environment-Specific Configuration**

1. **Line 8**: Add a new `environment` field in the app section:

   ```yaml
   app:
     name: "my-application"
     version: "1.0.0"
     environment: "production"
     debug: false
   ```

   NES should suggest adding corresponding environment-specific configurations for database, logging, and features sections.

2. **Line 15**: Update database configuration to use environment variables:

   ```yaml
   database:
     host: "${DB_HOST:-localhost}"
     port: "${DB_PORT:-5432}"
   ```

   NES should suggest converting other hardcoded values to environment variable patterns.

#### **Improving Security Configuration**

3. **Line 18**: Replace hardcoded password with environment variable reference:

   ```yaml
   password: "${DB_PASSWORD}"
   ```

   NES should identify other sensitive fields (like email password on line 52) and suggest similar patterns.

#### **Adding Missing Configuration Sections**

4. **End of file**: Add a new monitoring section:

   ```yaml
   monitoring:
     metrics:
       enabled: true
       port: 9090
     health_check:
       endpoint: "/health"
       interval: 30
   ```

   NES should suggest adding related health check configurations to the server section.

### Scenario 2: [`deployment-config.yaml`](/6-Domain_Specific/yaml-config-example/deployment-config.yaml)

#### **Scaling and Resource Optimization**

1. **Line 15**: Change replicas count from 3 to 5:

   ```yaml
   replicas: 5
   ```

   NES should suggest updating resource requests/limits proportionally and adding horizontal pod autoscaler configuration.

2. **Line 35**: Add a new environment variable for database connection:

   ```yaml
   - name: DATABASE_URL
     valueFrom:
       secretKeyRef:
         name: db-secret
         key: url
   ```

   NES should suggest creating corresponding Secret resource definition.

#### **Enhancing Health Checks**

3. **Line 46**: Modify the liveness probe to include a timeout:

   ```yaml
   livenessProbe:
     httpGet:
       path: /health
       port: 80
     initialDelaySeconds: 30
     periodSeconds: 10
     timeoutSeconds: 5
     failureThreshold: 3
   ```

   NES should suggest adding similar timeout configurations to the readiness probe.

#### **Adding Security Context**

4. **Line 21**: Add security context to the container spec:

   ```yaml
   spec:
     securityContext:
       runAsNonRoot: true
       runAsUser: 1000
       fsGroup: 2000
     containers:
   ```

   NES should suggest adding corresponding security context at the container level and updating resource policies.

## Domain-Specific Language Benefits

YAML configuration files represent a domain-specific language for:

- **Application Configuration**: Environment variables, feature flags, service connections
- **Infrastructure as Code**: Kubernetes manifests, Docker Compose, CI/CD pipelines  
- **Schema Validation**: NES can suggest corrections based on known schemas (Kubernetes API, Docker Compose spec, etc.)
- **Best Practices**: Security patterns, resource management, naming conventions

## NES Capabilities Demonstrated

1. **Schema Awareness**: NES understands YAML structure and can suggest valid keys/values
2. **Pattern Recognition**: Identifies common configuration patterns and suggests improvements
3. **Security Best Practices**: Suggests using secrets instead of hardcoded values
4. **Cross-Reference Suggestions**: When you modify one section, NES suggests related changes in other sections
5. **Environment-Specific Configuration**: Suggests patterns for managing different deployment environments
6. **Resource Optimization**: Suggests appropriate resource limits and scaling configurations

## Tips for Using NES with YAML

- **Start with basic structure**: Let NES suggest additional configuration sections
- **Security first**: NES will often suggest replacing hardcoded sensitive values
- **Environment variables**: NES recognizes patterns and suggests environment variable usage
- **Schema validation**: NES can help ensure your YAML follows expected schemas
- **Consistency**: NES helps maintain consistent naming and structure across large config files

## Common YAML Patterns NES Helps With

- Converting hardcoded values to environment variables
- Adding missing required fields based on schema
- Suggesting security best practices (non-root users, resource limits)
- Providing environment-specific configuration patterns
- Recommending monitoring and observability configurations
- Suggesting proper resource management configurations