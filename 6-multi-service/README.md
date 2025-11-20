# Multi-Service Architecture: Copilot Next Edit Suggestions Demo

This project demonstrates how Copilot Next Edit Suggestions (NES) can assist with microservices architecture development, showcasing cross-service type propagation, API contract changes, and multi-language support.

## Architecture Overview

```
┌─────────────┐
│ API Gateway │  (Port 3000) - Node.js/TypeScript
└──────┬──────┘
       │
       ├──────────┬──────────────┬────────────────┐
       │          │              │                │
┌──────▼──────┐ ┌▼──────────┐  ┌▼────────────┐  │
│User Service │ │Order      │  │Notification │  │
│             │ │Service    │  │Service      │  │
│(Port 5000)  │ │(Port 3001)│  │(Port 3002)  │  │
│Python/Flask │ │Node.js/TS │  │Node.js/JS   │  │
└─────────────┘ └───────────┘  └─────────────┘  │
                      │                           │
                      └───────────────────────────┘
```

## Services

1. **API Gateway** (Node.js/TypeScript): Routes requests to backend services
2. **User Service** (Python/Flask): Manages user data with CRUD operations
3. **Order Service** (Node.js/TypeScript): Handles order processing and calls other services
4. **Notification Service** (Node.js/JavaScript): Receives and stores notification events

## Project Structure

```
6-multi-service/
├── docker-compose.yml           # Service orchestration
├── shared/
│   └── types.ts                 # Shared TypeScript interfaces
├── api-gateway/
│   ├── src/
│   │   └── index.ts            # Gateway routing logic
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── user-service/
│   ├── app.py                   # Flask application
│   ├── requirements.txt
│   └── Dockerfile
├── order-service/
│   ├── src/
│   │   └── index.ts            # Order processing logic
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
└── notification-service/
    ├── index.js                 # Webhook handler
    ├── package.json
    └── Dockerfile
```

## How to Run

### Using Docker Compose (Recommended)

```bash
cd 6-multi-service
docker-compose up --build
```

Services will be available at:
- API Gateway: http://localhost:3000
- User Service: http://localhost:5000
- Order Service: http://localhost:3001
- Notification Service: http://localhost:3002

### Running Locally

1. **User Service:**
   ```bash
   cd user-service
   pip install -r requirements.txt
   python app.py
   ```

2. **Order Service:**
   ```bash
   cd order-service
   npm install
   npm start
   ```

3. **Notification Service:**
   ```bash
   cd notification-service
   npm install
   npm start
   ```

4. **API Gateway:**
   ```bash
   cd api-gateway
   npm install
   npm start
   ```

## NES Scenarios

### Scenario 1: Cross-Service Type Propagation

**Location:** [`shared/types.ts`](/6-multi-service/shared/types.ts)

1. **Line 7:** Add a new field to the User interface:
   ```typescript
   phoneNumber?: string;
   ```
   
   **Expected NES Behavior:** Should suggest updates to:
   - `user-service/app.py` - Add phone number handling in create_user and update_user
   - `api-gateway/src/index.ts` - Update any User type references if they exist

2. **Line 13:** Add a new field to the Order interface:
   ```typescript
   shippingAddress: string;
   ```
   
   **Expected NES Behavior:** Should suggest:
   - Update `order-service/src/index.ts` to handle the new field in POST /orders
   - Add validation for required field in create order endpoint

### Scenario 2: API Contract Changes

**Location:** [`api-gateway/src/index.ts`](/6-multi-service/api-gateway/src/index.ts)

1. **Line 24:** Add a query parameter to filter users:
   ```typescript
   app.get('/api/users', async (req: Request, res: Response) => {
     const { status } = req.query;
   ```
   
   **Expected NES Behavior:** Should suggest:
   - Forward the query parameter to the user service
   - Update user-service/app.py to handle the status filter
   - Add validation for the status parameter

2. **Line 59:** Add authentication middleware:
   ```typescript
   const authMiddleware = (req: Request, res: Response, next: Function) => {
     const token = req.headers.authorization;
     // validation logic
   };
   ```
   
   **Expected NES Behavior:** Should suggest:
   - Apply middleware to all protected routes
   - Add similar authentication to order-service
   - Update all service calls to include authentication headers

### Scenario 3: Status Enum Changes

**Location:** [`shared/types.ts`](/6-multi-service/shared/types.ts)

1. **Line 15:** Change the order status type to use an enum:
   ```typescript
   export enum OrderStatus {
     PENDING = 'pending',
     PROCESSING = 'processing',
     SHIPPED = 'shipped',
     COMPLETED = 'completed',
     CANCELLED = 'cancelled'
   }
   ```
   
   Then update line 16:
   ```typescript
   status: OrderStatus;
   ```
   
   **Expected NES Behavior:** Should suggest:
   - Update `order-service/src/index.ts` to use OrderStatus enum
   - Update status validation in PATCH /orders/:id/status
   - Add 'shipped' status handling throughout the order workflow

### Scenario 4: Error Handling Standardization

**Location:** [`order-service/src/index.ts`](/6-multi-service/order-service/src/index.ts)

1. **Line 95:** Improve error handling:
   ```typescript
   } catch (error) {
     console.error('Order creation failed:', error);
     res.status(500).json({
       success: false,
       error: 'Failed to create order',
       details: error instanceof Error ? error.message : 'Unknown error'
     });
   }
   ```
   
   **Expected NES Behavior:** Should suggest:
   - Apply similar error handling pattern to all try-catch blocks in this file
   - Add consistent error logging across api-gateway
   - Consider creating a shared error handler utility

### Scenario 5: Adding New Notification Types

**Location:** [`shared/types.ts`](/6-multi-service/shared/types.ts)

1. **Line 24:** Add new notification types:
   ```typescript
   type: 'order_created' | 'order_completed' | 'order_shipped' | 'user_registered' | 'password_reset';
   ```
   
   **Expected NES Behavior:** Should suggest:
   - Update `notification-service/index.js` to handle new types
   - Add notification triggers in user-service for 'user_registered' and 'password_reset'
   - Add notification trigger in order-service for 'order_shipped'

### Scenario 6: Multi-Language Consistency

**Location:** [`order-service/src/index.ts`](/6-multi-service/order-service/src/index.ts)

1. **Line 50:** Change the response format:
   ```typescript
   res.json({
     success: true,
     data: order,
     metadata: {
       timestamp: new Date().toISOString(),
       requestId: req.headers['x-request-id']
     }
   });
   ```
   
   **Expected NES Behavior:** Should suggest:
   - Add similar metadata to responses in user-service/app.py
   - Update api-gateway to forward x-request-id header
   - Add metadata to notification-service responses

### Scenario 7: Configuration Management

**Location:** [`docker-compose.yml`](/6-multi-service/docker-compose.yml)

1. **Line 11:** Add a new environment variable:
   ```yaml
   - LOG_LEVEL=debug
   ```
   
   **Expected NES Behavior:** Should suggest:
   - Add LOG_LEVEL to all other services
   - Update each service's code to use the LOG_LEVEL environment variable
   - Add logging configuration in each service

### Scenario 8: Validation Improvements

**Location:** [`order-service/src/index.ts`](/6-multi-service/order-service/src/index.ts)

1. **Line 54:** Add item validation:
   ```typescript
   // Validate each item
   for (const item of items) {
     if (!item.productId || !item.quantity || !item.price) {
       return res.status(400).json({
         success: false,
         error: 'Each item must have productId, quantity, and price'
       });
     }
     if (item.quantity <= 0 || item.price < 0) {
       return res.status(400).json({
         success: false,
         error: 'Invalid quantity or price'
       });
     }
   }
   ```
   
   **Expected NES Behavior:** Should suggest:
   - Create a shared validation utility
   - Add similar validation patterns in user-service
   - Consider adding input sanitization

## Testing the Services

### 1. Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "name": "John Doe"}'
```

### 2. Get Users
```bash
curl http://localhost:3000/api/users
```

### 3. Create an Order
```bash
# Replace USER_ID with the ID from step 1
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "items": [
      {"productId": "prod-1", "quantity": 2, "price": 29.99},
      {"productId": "prod-2", "quantity": 1, "price": 49.99}
    ]
  }'
```

### 4. Get Notifications
```bash
curl http://localhost:3002/notifications
```

### 5. Update Order Status
```bash
# Replace ORDER_ID with the ID from step 3
curl -X PATCH http://localhost:3000/api/orders/ORDER_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

## Key Takeaways

This multi-service example demonstrates NES capabilities for:

1. **Cross-Service Coordination**: Changes in shared types propagate across multiple services
2. **Multi-Language Support**: Consistent suggestions across TypeScript, Python, and JavaScript
3. **API Contract Management**: Interface changes suggest updates to consumers
4. **Configuration Consistency**: Environment variable changes reflect across services
5. **Error Handling Patterns**: Consistent error handling suggestions across the codebase
6. **Validation Standards**: Unified validation approaches across services

## Architecture Principles

- **Loose Coupling**: Services communicate via HTTP APIs
- **Language Diversity**: Demonstrates NES across TypeScript, Python, and JavaScript
- **Shared Types**: Common interfaces ensure consistency
- **Service Independence**: Each service can be developed and deployed independently
- **Event-Driven**: Notifications demonstrate event-driven architecture patterns
