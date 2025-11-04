const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.db = null;
    }

    // Initialize database connection
    connect() {
        return new Promise((resolve, reject) => {
            const dbPath = path.join(__dirname, 'app.db');
            this.db = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    console.error('Error opening database:', err.message);
                    reject(err);
                } else {
                    console.log('Connected to SQLite database');
                    resolve();
                }
            });
        });
    }

    // Initialize database tables
    async initTables() {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;

        const createPostsTable = `
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                author_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES users (id)
            )
        `;

        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run(createUsersTable, (err) => {
                    if (err) reject(err);
                });
                
                this.db.run(createPostsTable, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });
    }

    // User queries
    async createUser(username, email, hashedPassword) {
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            this.db.run(query, [username, email, hashedPassword], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, username, email });
                }
            });
        });
    }

    async findUserByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        return new Promise((resolve, reject) => {
            this.db.get(query, [email], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    async findUserById(id) {
        const query = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
        return new Promise((resolve, reject) => {
            this.db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Post queries
    async createPost(title, content, authorId) {
        const query = 'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            this.db.run(query, [title, content, authorId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, title, content, author_id: authorId });
                }
            });
        });
    }

    async getAllPosts() {
        const query = `
            SELECT p.*, u.username as author_username 
            FROM posts p 
            JOIN users u ON p.author_id = u.id 
            ORDER BY p.created_at DESC
        `;
        return new Promise((resolve, reject) => {
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async getPostById(id) {
        const query = `
            SELECT p.*, u.username as author_username 
            FROM posts p 
            JOIN users u ON p.author_id = u.id 
            WHERE p.id = ?
        `;
        return new Promise((resolve, reject) => {
            this.db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Close database connection
    close() {
        return new Promise((resolve) => {
            if (this.db) {
                this.db.close((err) => {
                    if (err) {
                        console.error('Error closing database:', err.message);
                    } else {
                        console.log('Database connection closed');
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
}

module.exports = new Database();