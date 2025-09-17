# 4-Refactoring: Code Restructuring and Improvement

This category demonstrates how NES helps with refactoring and restructuring existing code. These examples show how Copilot can suggest related changes when you improve code organization, extract methods, rename variables, or optimize existing implementations.

## Overview

**Scenario**: Restructuring code for better organization, maintainability, and performance
**NES Benefit**: Suggests comprehensive updates across related code when refactoring
**Difficulty**: ⭐⭐⭐ Advanced

## Examples in This Category

### ☕ Java Application (`java-sample/`)
**Language**: Java
**Scenario**: Refactoring a Maven-based Java application with multiple classes
**Files**: Maven project structure with `src/main/java/` and `src/test/java/`

---

## Example 1: Java Application (java-sample/)

### What You'll Learn
- Large-scale refactoring patterns in Java
- NES suggestions for method extraction and class reorganization
- Managing dependencies and imports during refactoring
- Updating tests and documentation during restructuring

### Prerequisites
- Java development experience
- Understanding of Maven build system
- Java IDE (IntelliJ IDEA, Eclipse, or VS Code with Java extension)
- Basic understanding of object-oriented design principles

### Current State
The Java application is a simple Maven project that can be improved through various refactoring techniques.

### Project Structure
```
java-sample/
├── pom.xml                           # Maven configuration
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── mycompany/
│   │               └── app/
│   │                   └── App.java  # Main application class
│   └── test/
│       └── java/
│           └── com/
│               └── mycompany/
│                   └── app/
│                       └── AppTest.java # Test class
├── README.md                         # Project documentation
├── SECURITY.md                       # Security policy
└── CODE_OF_CONDUCT.md               # Code of conduct
```

### Step-by-Step Instructions

#### Step 1: Set Up Development Environment
1. Navigate to `4-Refactoring/java-sample/`
2. Ensure you have Java and Maven installed
3. Run `mvn compile` to verify the project builds
4. Open the project in your Java IDE with Copilot enabled

#### Step 2: Extract a Utility Method
Start with a simple refactoring. In `App.java`, if there's a main method, extract a utility method:

```java
public class App {
    public static void main(String[] args) {
        // Instead of having all logic in main
        System.out.println("Hello World!");
    }
}
```

Refactor to:
```java
public class App {
    public static void main(String[] args) {
        printGreeting();
    }
    
    private static void printGreeting() {
        System.out.println("Hello World!");
    }
}
```

#### Step 3: Observe NES Suggestions
After extracting the method, NES should suggest:
- Adding proper JavaDoc documentation
- Updating the test class to test the new method
- Potentially suggesting further method extractions
- Adding error handling or parameter validation

#### Step 4: Add a Configuration Class
Create a new configuration class to demonstrate class-level refactoring:

```java
package com.mycompany.app;

public class AppConfig {
    private static final String DEFAULT_GREETING = "Hello World!";
    private static final String DEFAULT_FAREWELL = "Goodbye!";
    
    public static String getDefaultGreeting() {
        return DEFAULT_GREETING;
    }
    
    public static String getDefaultFarewell() {
        return DEFAULT_FAREWELL;
    }
}
```

#### Step 5: Update App.java to Use Configuration
Modify the main class to use the configuration:

```java
package com.mycompany.app;

public class App {
    public static void main(String[] args) {
        printGreeting();
        // NES might suggest adding a farewell
    }
    
    private static void printGreeting() {
        System.out.println(AppConfig.getDefaultGreeting());
    }
}
```

### Expected NES Behavior

**When extracting methods**:
- Suggests appropriate method visibility (private, public, protected)
- Proposes method naming conventions
- May suggest adding parameters or return types
- Recommends adding JavaDoc documentation

**When creating new classes**:
- Suggests consistent package structure
- Proposes import statements
- May suggest design patterns (singleton, factory, etc.)
- Recommends following Java naming conventions

**When updating existing code**:
- Suggests updating all references to use new structure
- Proposes test updates
- May suggest error handling improvements
- Recommends consistent formatting

### Advanced Refactoring Scenarios

#### 1. Extract Interface
```java
// Before: Concrete implementation only
public class MessageService {
    public void sendMessage(String message) {
        System.out.println("Sending: " + message);
    }
}

// After: Extract interface
public interface MessageService {
    void sendMessage(String message);
}

public class ConsoleMessageService implements MessageService {
    @Override
    public void sendMessage(String message) {
        System.out.println("Sending: " + message);
    }
}
```

#### 2. Introduce Builder Pattern
```java
// Before: Constructor with many parameters
public class User {
    private String name;
    private String email;
    private int age;
    private String address;
    
    public User(String name, String email, int age, String address) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.address = address;
    }
}

// After: Builder pattern
public class User {
    private String name;
    private String email;
    private int age;
    private String address;
    
    private User(Builder builder) {
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
        this.address = builder.address;
    }
    
    public static class Builder {
        private String name;
        private String email;
        private int age;
        private String address;
        
        public Builder setName(String name) {
            this.name = name;
            return this;
        }
        
        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }
        
        public Builder setAge(int age) {
            this.age = age;
            return this;
        }
        
        public Builder setAddress(String address) {
            this.address = address;
            return this;
        }
        
        public User build() {
            return new User(this);
        }
    }
}
```

#### 3. Refactor for Dependency Injection
```java
// Before: Hard-coded dependencies
public class OrderService {
    private EmailService emailService = new EmailService();
    private DatabaseService dbService = new DatabaseService();
    
    public void processOrder(Order order) {
        dbService.save(order);
        emailService.sendConfirmation(order.getCustomerEmail());
    }
}

// After: Dependency injection
public class OrderService {
    private final EmailService emailService;
    private final DatabaseService dbService;
    
    public OrderService(EmailService emailService, DatabaseService dbService) {
        this.emailService = emailService;
        this.dbService = dbService;
    }
    
    public void processOrder(Order order) {
        dbService.save(order);
        emailService.sendConfirmation(order.getCustomerEmail());
    }
}
```

### Testing During Refactoring

#### Update Test Cases
When refactoring, update tests to match new structure:

```java
public class AppTest {
    @Test
    public void testPrintGreeting() {
        // Test the extracted method
        // NES might suggest using ByteArrayOutputStream to capture output
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PrintStream originalOut = System.out;
        System.setOut(new PrintStream(outputStream));
        
        App.printGreeting();
        
        System.setOut(originalOut);
        assertEquals("Hello World!\n", outputStream.toString());
    }
    
    @Test
    public void testAppConfig() {
        // Test configuration class
        assertNotNull(AppConfig.getDefaultGreeting());
        assertEquals("Hello World!", AppConfig.getDefaultGreeting());
    }
}
```

### Performance Considerations

#### 1. Method Inlining vs Extraction
Consider the trade-offs:
- **Extract**: Better readability and testability
- **Inline**: Better performance for simple operations

#### 2. Object Creation Patterns
```java
// Consider: Static factory methods for better performance
public class User {
    private static final Map<String, User> CACHE = new ConcurrentHashMap<>();
    
    public static User getUser(String email) {
        return CACHE.computeIfAbsent(email, User::new);
    }
}
```

---

## Best Practices for Refactoring with NES

### 1. Start Small and Incremental
- Make one change at a time
- Use NES suggestions to guide related changes
- Test after each refactoring step

### 2. Maintain Functionality
- Ensure behavior remains the same
- Use comprehensive tests to verify correctness
- Accept NES suggestions that maintain contracts

### 3. Follow Design Principles
- Single Responsibility Principle
- Open/Closed Principle
- Dependency Inversion Principle
- Use NES to maintain consistency with these principles

### 4. Consider Performance Impact
- Profile before and after major refactoring
- Use NES suggestions for optimization patterns
- Balance readability with performance

---

## Common NES Patterns in Refactoring

### Method Extraction
NES typically suggests:
- Appropriate method signatures
- Parameter passing patterns
- Return type considerations
- Access modifier choices

### Class Organization
When creating new classes, NES suggests:
- Package organization
- Import statement management
- Interface vs abstract class decisions
- Design pattern implementations

### Variable and Method Naming
NES helps with:
- Consistent naming conventions
- Updating all references
- Choosing appropriate scope
- Following Java naming standards

---

## IDE-Specific Tips

### IntelliJ IDEA
- Use built-in refactoring tools alongside NES
- Enable "Show intentions" to see NES suggestions clearly
- Use the "Refactor" menu for complex operations

### VS Code with Java Extension
- Enable Java language server for better context
- Use "Refactor" command palette options
- Install Java test runner for comprehensive testing

### Eclipse
- Use refactoring wizards in combination with NES
- Enable auto-completion for better suggestions
- Use JUnit integration for test updates

---

## Troubleshooting Refactoring

**Problem**: NES suggests breaking changes
**Solution**: Consider the suggestion carefully; sometimes breaking changes lead to better design

**Problem**: Too many suggestions at once
**Solution**: Refactor incrementally; make one change and evaluate before continuing

**Problem**: Suggestions don't align with project conventions
**Solution**: Establish consistent patterns first, then NES will follow them

---

## Next Steps

After mastering refactoring with NES:
1. Explore the [Fuller Example](./5-fuller.md) for complex real-world scenarios
2. Apply these refactoring patterns to your own Java projects
3. Experiment with other languages to see how NES adapts

The key insight from this category is that NES understands **architectural patterns** and can help maintain consistency and quality during large-scale code restructuring.