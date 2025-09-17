# Best Practices for Next Edit Suggestions (NES)

This guide provides practical tips and strategies for getting the most out of GitHub Copilot's Next Edit Suggestions feature.

## 🎯 Setting Up for Success

### IDE Configuration

#### VS Code Optimization
```json
{
  "github.copilot.enable": {
    "*": true,
    "yaml": true,
    "plaintext": false,
    "markdown": true
  },
  "github.copilot.advanced": {
    "length": 500,
    "temperature": 0.1
  }
}
```

#### JetBrains IDEs
- Enable "Show completions automatically"
- Set completion delay to minimum (100ms)
- Enable "Show documentation popup"

### Workspace Setup
- **Open Related Files**: Keep related files open in your editor
- **Project Structure**: Maintain clear, logical project organization
- **Consistent Naming**: Use consistent naming conventions throughout

## 📝 Writing NES-Friendly Code

### 1. Use Descriptive Names
```javascript
// ❌ Poor for NES
function calc(x, y) { return x + y; }

// ✅ Better for NES
function calculateTotalPrice(basePrice, taxAmount) { 
  return basePrice + taxAmount; 
}
```

### 2. Follow Consistent Patterns
```python
# ❌ Inconsistent patterns
def get_user_data(): pass
def fetchOrderInfo(): pass
def retrieve_product(): pass

# ✅ Consistent patterns
def get_user_data(): pass
def get_order_data(): pass
def get_product_data(): pass
```

### 3. Include Context Comments
```cpp
// ❌ Minimal context
double calculate(double x) { return x * 2; }

// ✅ Rich context
// Calculate the sample standard deviation for a statistics dataset
double calculateSampleStandardDeviation(double variance) { 
  return sqrt(variance); 
}
```

## 🔄 Effective Edit Strategies

### 1. Make Intentional Changes
- **Start with Intent**: Be clear about what you're trying to achieve
- **One Concept at a Time**: Focus on a single change concept
- **Follow Through**: Accept related suggestions that align with your intent

### 2. Progressive Enhancement
```typescript
// Step 1: Make the core change
interface Task {
  id: string;
  title: string;
  // isCompleted: boolean;  // Remove this
  status: 'todo' | 'in-progress' | 'completed';  // Add this
}

// Step 2: Accept NES suggestions for related changes
// Step 3: Verify and refine as needed
```

### 3. Test-Driven NES
1. **Write the Test**: Define expected behavior
2. **Make the Change**: Implement the modification
3. **Accept Suggestions**: Use NES to update related code
4. **Verify**: Ensure tests pass and behavior is correct

## 🎨 Language-Specific Tips

### JavaScript/TypeScript
- **Use TypeScript**: Type information helps NES provide better suggestions
- **Consistent Exports**: Use consistent export patterns
- **Proper Destructuring**: Use clear destructuring patterns

```typescript
// ✅ Good for NES
export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

export function updateUserPreferences(
  userId: string, 
  preferences: Partial<UserPreferences>
): Promise<UserPreferences> {
  // Implementation
}
```

### Python
- **Type Hints**: Use type hints for better context
- **Docstrings**: Include comprehensive docstrings
- **Consistent Imports**: Organize imports consistently

```python
from typing import List, Optional, Dict
from dataclasses import dataclass

@dataclass
class UserStats:
    """User statistics for analytics dashboard."""
    user_id: str
    login_count: int
    last_active: Optional[datetime] = None
    
    def calculate_activity_score(self) -> float:
        """Calculate user activity score based on login patterns."""
        # Implementation with clear intent
```

### Java
- **Use Annotations**: Leverage annotations for context
- **Consistent Naming**: Follow Java naming conventions
- **Clear Inheritance**: Use clear class hierarchies

```java
@Service
public class UserPreferenceService {
    
    @Autowired
    private UserRepository userRepository;
    
    public UserPreferences updateUserTheme(
        @NonNull String userId, 
        @NonNull Theme newTheme
    ) {
        // Clear intent and structure
    }
}
```

## 🚀 Advanced Techniques

### 1. Context Priming
Before making your main change, set up context:

```javascript
// 1. Open related files
// 2. Add contextual comments
// TODO: Refactor user authentication to use OAuth 2.0

// 3. Make the primary change
function authenticateUser(credentials) {
  // Change from basic auth to OAuth
}
```

### 2. Pattern Establishment
Create clear patterns that NES can follow:

```python
# Establish pattern
def get_user_by_id(user_id: str) -> User: pass
def get_order_by_id(order_id: str) -> Order: pass

# Add new function - NES will suggest following the pattern
def get_product_by_id(product_id: str) -> Product: pass
```

### 3. Gradual Refactoring
Break large changes into smaller, focused edits:

1. **Rename**: Start with renaming for clarity
2. **Extract**: Extract methods or components
3. **Reorganize**: Move and restructure
4. **Optimize**: Apply performance improvements

## 🔍 Debugging NES Issues

### Common Problems and Solutions

#### 1. No Suggestions Appearing
**Causes:**
- Copilot not active
- Insufficient context
- Change too isolated

**Solutions:**
- Verify Copilot status
- Open related files
- Make more substantial changes
- Add comments explaining intent

#### 2. Irrelevant Suggestions
**Causes:**
- Unclear change intent
- Inconsistent patterns
- Conflicting context

**Solutions:**
- Be more specific in changes
- Establish clear patterns
- Clean up conflicting code

#### 3. Suggestions Too Conservative
**Causes:**
- Limited context
- Unclear patterns
- Safe mode behavior

**Solutions:**
- Provide more context
- Make bolder initial changes
- Establish clearer patterns

### Troubleshooting Checklist
- [ ] Copilot is active and connected
- [ ] Related files are open
- [ ] Change follows established patterns
- [ ] Context is clear and consistent
- [ ] Intent is well-defined

## 📊 Measuring NES Effectiveness

### Success Metrics
- **Acceptance Rate**: Percentage of suggestions accepted
- **Time Savings**: Reduced time for related updates
- **Code Quality**: Improved consistency and fewer bugs
- **Learning**: Better understanding of code relationships

### Tracking Your Progress
Keep a log of:
- Which suggestions were most helpful
- Patterns that consistently work
- Areas where NES needs improvement
- Personal productivity gains

## 🎓 Learning and Improvement

### Regular Practice
- **Daily Use**: Incorporate NES into daily coding
- **Experiment**: Try different approaches
- **Reflect**: Analyze what works best
- **Share**: Discuss findings with team

### Staying Updated
- **Feature Updates**: Keep Copilot extension updated
- **Best Practices**: Follow GitHub Copilot documentation
- **Community**: Engage with developer community
- **Feedback**: Provide feedback to improve NES

## 🤝 Team Best Practices

### Establishing Team Standards
1. **Coding Conventions**: Agree on consistent patterns
2. **NES Guidelines**: Share what works for your team
3. **Review Process**: Include NES suggestions in code reviews
4. **Training**: Ensure team members understand NES

### Collaboration Tips
- **Share Patterns**: Document successful NES patterns
- **Pair Programming**: Use NES together for learning
- **Code Reviews**: Discuss NES suggestions during reviews
- **Knowledge Sharing**: Regular team discussions about NES usage

---

## Quick Reference

### Before Making Changes
- [ ] Open related files
- [ ] Verify Copilot is active
- [ ] Review existing patterns
- [ ] Plan your change intent

### During Editing
- [ ] Make clear, intentional changes
- [ ] Follow established patterns
- [ ] Accept relevant suggestions
- [ ] Verify changes make sense

### After Changes
- [ ] Test functionality
- [ ] Review overall consistency
- [ ] Document new patterns
- [ ] Share learnings with team

---

Ready to apply these practices? Start with the [examples](../1-Changing_Intent/) to see them in action!