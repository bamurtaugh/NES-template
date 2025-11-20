// User management system with various validation functions

export interface User {
    id: number;
    username: string;
    email: string;
    age: number;
    isActive: boolean;
}

export class UserValidator {
    validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateUsername(username: string): boolean {
        return username.length >= 3 && username.length <= 20;
    }

    validateAge(age: number): boolean {
        return age >= 18 && age <= 120;
    }

    validateUser(user: User): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!this.validateUsername(user.username)) {
            errors.push('Username must be between 3 and 20 characters');
        }

        if (!this.validateEmail(user.email)) {
            errors.push('Invalid email format');
        }

        if (!this.validateAge(user.age)) {
            errors.push('Age must be between 18 and 120');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }
}

export class UserService {
    private users: User[] = [];
    private nextId: number = 1;
    private validator: UserValidator;

    constructor() {
        this.validator = new UserValidator();
    }

    createUser(username: string, email: string, age: number): User | null {
        const newUser: User = {
            id: this.nextId,
            username,
            email,
            age,
            isActive: true
        };

        const validation = this.validator.validateUser(newUser);
        if (!validation.valid) {
            return null;
        }

        this.users.push(newUser);
        this.nextId++;
        return newUser;
    }

    getUserById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    getAllUsers(): User[] {
        return [...this.users];
    }

    updateUser(id: number, updates: Partial<User>): boolean {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return false;
        }

        this.users[userIndex] = { ...this.users[userIndex], ...updates };
        return true;
    }

    deleteUser(id: number): boolean {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length < initialLength;
    }

    getActiveUsers(): User[] {
        return this.users.filter(user => user.isActive);
    }
}
