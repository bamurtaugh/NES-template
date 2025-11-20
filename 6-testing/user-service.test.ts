import { describe, it, expect, beforeEach } from 'vitest';
import { UserValidator, UserService, User } from './user-service';

describe('UserValidator', () => {
    let validator: UserValidator;

    beforeEach(() => {
        validator = new UserValidator();
    });

    describe('validateEmail', () => {
        it('should validate correct email format', () => {
            expect(validator.validateEmail('test@example.com')).toBe(true);
        });

        it('should reject invalid email formats', () => {
            expect(validator.validateEmail('invalid.email')).toBe(false);
            expect(validator.validateEmail('@example.com')).toBe(false);
            expect(validator.validateEmail('test@')).toBe(false);
        });
    });

    describe('validateUsername', () => {
        it('should accept valid username lengths', () => {
            expect(validator.validateUsername('abc')).toBe(true);
            expect(validator.validateUsername('valid_username')).toBe(true);
        });

        it('should reject too short usernames', () => {
            expect(validator.validateUsername('ab')).toBe(false);
        });

        it('should reject too long usernames', () => {
            expect(validator.validateUsername('a'.repeat(21))).toBe(false);
        });
    });

    describe('validateAge', () => {
        it('should accept valid ages', () => {
            expect(validator.validateAge(18)).toBe(true);
            expect(validator.validateAge(50)).toBe(true);
            expect(validator.validateAge(120)).toBe(true);
        });

        it('should reject ages below 18', () => {
            expect(validator.validateAge(17)).toBe(false);
        });

        it('should reject ages above 120', () => {
            expect(validator.validateAge(121)).toBe(false);
        });
    });

    describe('validateUser', () => {
        it('should return valid for correct user data', () => {
            const user: User = {
                id: 1,
                username: 'john_doe',
                email: 'john@example.com',
                age: 25,
                isActive: true
            };
            const result = validator.validateUser(user);
            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should return errors for invalid user data', () => {
            const user: User = {
                id: 1,
                username: 'ab',
                email: 'invalid-email',
                age: 15,
                isActive: true
            };
            const result = validator.validateUser(user);
            expect(result.valid).toBe(false);
            expect(result.errors).toHaveLength(3);
        });
    });
});

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        service = new UserService();
    });

    describe('createUser', () => {
        it('should create a valid user', () => {
            const user = service.createUser('john_doe', 'john@example.com', 25);
            expect(user).not.toBeNull();
            expect(user?.username).toBe('john_doe');
            expect(user?.email).toBe('john@example.com');
            expect(user?.isActive).toBe(true);
        });

        it('should return null for invalid user data', () => {
            const user = service.createUser('ab', 'invalid-email', 15);
            expect(user).toBeNull();
        });

        it('should assign incremental IDs', () => {
            const user1 = service.createUser('user1', 'user1@example.com', 25);
            const user2 = service.createUser('user2', 'user2@example.com', 30);
            expect(user1?.id).toBe(1);
            expect(user2?.id).toBe(2);
        });
    });

    describe('getUserById', () => {
        it('should return user by ID', () => {
            const created = service.createUser('john_doe', 'john@example.com', 25);
            const found = service.getUserById(created!.id);
            expect(found).toEqual(created);
        });

        it('should return undefined for non-existent ID', () => {
            const found = service.getUserById(999);
            expect(found).toBeUndefined();
        });
    });

    describe('getAllUsers', () => {
        it('should return all users', () => {
            service.createUser('user1', 'user1@example.com', 25);
            service.createUser('user2', 'user2@example.com', 30);
            const users = service.getAllUsers();
            expect(users).toHaveLength(2);
        });

        it('should return empty array when no users exist', () => {
            const users = service.getAllUsers();
            expect(users).toHaveLength(0);
        });
    });

    describe('updateUser', () => {
        it('should update existing user', () => {
            const user = service.createUser('john_doe', 'john@example.com', 25);
            const updated = service.updateUser(user!.id, { age: 26 });
            expect(updated).toBe(true);
            const found = service.getUserById(user!.id);
            expect(found?.age).toBe(26);
        });

        it('should return false for non-existent user', () => {
            const updated = service.updateUser(999, { age: 26 });
            expect(updated).toBe(false);
        });
    });

    describe('deleteUser', () => {
        it('should delete existing user', () => {
            const user = service.createUser('john_doe', 'john@example.com', 25);
            const deleted = service.deleteUser(user!.id);
            expect(deleted).toBe(true);
            const found = service.getUserById(user!.id);
            expect(found).toBeUndefined();
        });

        it('should return false for non-existent user', () => {
            const deleted = service.deleteUser(999);
            expect(deleted).toBe(false);
        });
    });

    describe('getActiveUsers', () => {
        it('should return only active users', () => {
            const user1 = service.createUser('user1', 'user1@example.com', 25);
            const user2 = service.createUser('user2', 'user2@example.com', 30);
            service.updateUser(user2!.id, { isActive: false });
            
            const activeUsers = service.getActiveUsers();
            expect(activeUsers).toHaveLength(1);
            expect(activeUsers[0].id).toBe(user1!.id);
        });
    });
});
