# Express Auth API: Copilot Next Edit Suggestions Demo

This project serves as a comprehensive example of how Copilot Next Edit Suggestions (NES) can help with backend API development tasks. The application is a fully-featured REST API built with Node.js and Express, featuring authentication, middleware, and database integration.

## Project Structure

```
express-auth-api/
├── server.js           # Main Express server setup and configuration
├── routes.js           # API route definitions (auth, posts, users)
├── middleware.js       # Authentication, validation, and security middleware
├── database.js         # SQLite database connection and query helpers
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
└── README.md          # This file
```

## Features

- **Authentication**: JWT-based auth with bcrypt password hashing
- **Middleware**: Rate limiting, CORS, validation, error handling
- **Database**: SQLite with user and post management
- **Security**: Helmet, input validation, secure headers
- **API Design**: RESTful endpoints with proper HTTP status codes

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create new post (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)

### Utilities
- `GET /api/health` - Health check
- `GET /` - API documentation

## How to Use This Example

### Scenario 1: [`middleware.js`](/6-Backend_API/express-auth-api/middleware.js)

1. Line 67: Add email format validation to the password validation:

   ```javascript
   // Add this after password validation
   const confirmPassword = req.body.confirmPassword;
   if (password !== confirmPassword) {
       errors.push('Passwords do not match');
   }
   ```

   NES should suggest adding confirm password validation and updating the validateRegister function signature.

2. Line 45: Enhance the email validation regex to be more strict:

   ```javascript
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   ```

   NES should detect the existing regex and suggest improvements for better email validation.

3. Line 85: Add content length validation to posts:

   ```javascript
   if (content && content.length > 5000) {
       errors.push('Content cannot exceed 5000 characters');
   }
   ```

   NES should suggest adding this validation alongside the existing minimum length check.

### Scenario 2: [`routes.js`](/6-Backend_API/express-auth-api/routes.js)

1. Line 28: Add user role checking to registration:

   ```javascript
   const role = req.body.role || 'user';
   if (!['user', 'admin', 'moderator'].includes(role)) {
       return res.status(400).json({ error: 'Invalid role specified' });
   }
   ```

   NES should suggest updating the database schema and createUser function to handle roles.

2. Line 95: Add pagination to the posts endpoint:

   ```javascript
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;
   const offset = (page - 1) * limit;
   ```

   NES should suggest updating the database.getAllPosts method to accept pagination parameters.

3. Line 140: Add search functionality:

   ```javascript
   const searchQuery = req.query.search;
   if (searchQuery) {
       // Add search logic
   }
   ```

   NES should suggest implementing search in both routes and database methods.

### Scenario 3: [`database.js`](/6-Backend_API/express-auth-api/database.js)

1. Line 30: Add a users table index for better performance:

   ```sql
   CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
   ```

   NES should suggest adding this after the CREATE TABLE statement and similar indexes for other frequently queried columns.

2. Line 95: Add soft delete functionality:

   ```javascript
   async deletePost(id, authorId) {
       const query = 'UPDATE posts SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND author_id = ?';
       // Implementation...
   }
   ```

   NES should suggest updating the schema to include deleted_at column and modifying queries to exclude deleted posts.

3. Line 65: Add connection pooling:

   ```javascript
   // Add connection pooling configuration
   this.db.configure('busyTimeout', 30000);
   ```

   NES should suggest adding this in the connect method for better performance.

### Scenario 4: [`server.js`](/6-Backend_API/express-auth-api/server.js)

1. Line 15: Add API versioning:

   ```javascript
   app.use('/api/v1', routes);
   app.use('/api/v2', routesV2); // For future versions
   ```

   NES should suggest updating all route references and creating a versioning strategy.

2. Line 42: Add health check with database status:

   ```javascript
   app.get('/health', async (req, res) => {
       try {
           // Check database connection
           await database.findUserById(1);
           res.json({ status: 'OK', database: 'connected' });
       } catch (error) {
           res.status(503).json({ status: 'ERROR', database: 'disconnected' });
       }
   });
   ```

   NES should suggest moving this to routes.js and enhancing the existing health check.

3. Line 60: Add graceful shutdown enhancement:

   ```javascript
   const server = app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
   });

   process.on('SIGTERM', () => {
       server.close(() => {
           database.close();
       });
   });
   ```

   NES should suggest storing the server instance and improving shutdown handling.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Test the API:**
   ```bash
   curl http://localhost:3001/api/health
   ```

## Example API Usage

### Register a user:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create a post (with JWT token):
```bash
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"My First Post","content":"This is the content of my first post."}'
```

## Dependencies

- **express**: Web framework for Node.js
- **jsonwebtoken**: JWT implementation
- **bcryptjs**: Password hashing
- **sqlite3**: SQLite database driver
- **cors**: Cross-origin resource sharing
- **helmet**: Security middleware
- **express-rate-limit**: Rate limiting middleware
- **dotenv**: Environment variable management