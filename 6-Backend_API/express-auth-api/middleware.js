const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ 
            error: 'Access denied. No token provided.' 
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                error: 'Invalid or expired token.' 
            });
        }
        req.user = user;
        next();
    });
};

// Input validation middleware
const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;
    const errors = [];

    // Username validation
    if (!username || username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please provide a valid email address');
    }

    // Password validation
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

// Login validation middleware
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (!email) {
        errors.push('Email is required');
    }

    if (!password) {
        errors.push('Password is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

// Post validation middleware
const validatePost = (req, res, next) => {
    const { title, content } = req.body;
    const errors = [];

    if (!title || title.trim().length < 1) {
        errors.push('Title is required');
    }

    if (!content || content.trim().length < 10) {
        errors.push('Content must be at least 10 characters long');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

// Rate limiting middleware
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many authentication attempts, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Handle specific error types
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(409).json({
            error: 'User with this email or username already exists'
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'Token expired'
        });
    }

    // Default error response
    res.status(500).json({
        error: 'Internal server error'
    });
};

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

// Utility functions
const hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

module.exports = {
    authenticateToken,
    validateRegister,
    validateLogin,
    validatePost,
    authLimiter,
    generalLimiter,
    errorHandler,
    corsOptions,
    hashPassword,
    comparePassword,
    generateToken
};