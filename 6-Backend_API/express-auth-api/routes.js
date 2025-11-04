const express = require('express');
const database = require('./database');
const {
    authenticateToken,
    validateRegister,
    validateLogin,
    validatePost,
    authLimiter,
    hashPassword,
    comparePassword,
    generateToken
} = require('./middleware');

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'API is running successfully'
    });
});

// Auth routes
router.post('/auth/register', authLimiter, validateRegister, async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await database.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                error: 'User with this email already exists'
            });
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const newUser = await database.createUser(username, email, hashedPassword);

        // Generate token
        const token = generateToken({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            },
            token
        });
    } catch (error) {
        next(error);
    }
});

router.post('/auth/login', authLimiter, validateLogin, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await database.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }

        // Check password
        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken({
            id: user.id,
            username: user.username,
            email: user.email
        });

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        next(error);
    }
});

// Protected route to get current user
router.get('/auth/me', authenticateToken, async (req, res, next) => {
    try {
        const user = await database.findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at
            }
        });
    } catch (error) {
        next(error);
    }
});

// Posts routes
router.get('/posts', async (req, res, next) => {
    try {
        const posts = await database.getAllPosts();
        res.json({
            posts: posts.map(post => ({
                id: post.id,
                title: post.title,
                content: post.content,
                author: {
                    id: post.author_id,
                    username: post.author_username
                },
                created_at: post.created_at,
                updated_at: post.updated_at
            }))
        });
    } catch (error) {
        next(error);
    }
});

router.get('/posts/:id', async (req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        if (isNaN(postId)) {
            return res.status(400).json({
                error: 'Invalid post ID'
            });
        }

        const post = await database.getPostById(postId);
        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }

        res.json({
            post: {
                id: post.id,
                title: post.title,
                content: post.content,
                author: {
                    id: post.author_id,
                    username: post.author_username
                },
                created_at: post.created_at,
                updated_at: post.updated_at
            }
        });
    } catch (error) {
        next(error);
    }
});

router.post('/posts', authenticateToken, validatePost, async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const authorId = req.user.id;

        const newPost = await database.createPost(title, content, authorId);

        res.status(201).json({
            message: 'Post created successfully',
            post: {
                id: newPost.id,
                title: newPost.title,
                content: newPost.content,
                author_id: newPost.author_id
            }
        });
    } catch (error) {
        next(error);
    }
});

// Users route (protected)
router.get('/users/profile', authenticateToken, async (req, res, next) => {
    try {
        const user = await database.findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json({
            profile: {
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at
            }
        });
    } catch (error) {
        next(error);
    }
});

// 404 handler for undefined routes
router.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `The route ${req.method} ${req.originalUrl} does not exist`
    });
});

module.exports = router;