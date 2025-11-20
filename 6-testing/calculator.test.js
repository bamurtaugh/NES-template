const Calculator = require('./calculator');

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('add', () => {
        test('should add two positive numbers', () => {
            expect(calculator.add(2, 3)).toBe(5);
        });

        test('should add negative numbers', () => {
            expect(calculator.add(-2, -3)).toBe(-5);
        });
    });

    describe('subtract', () => {
        test('should subtract two numbers', () => {
            expect(calculator.subtract(5, 3)).toBe(2);
        });
    });

    describe('multiply', () => {
        test('should multiply two numbers', () => {
            expect(calculator.multiply(3, 4)).toBe(12);
        });
    });

    describe('divide', () => {
        test('should divide two numbers', () => {
            expect(calculator.divide(10, 2)).toBe(5);
        });

        test('should throw error when dividing by zero', () => {
            expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
        });
    });

    describe('power', () => {
        test('should calculate power correctly', () => {
            expect(calculator.power(2, 3)).toBe(8);
        });
    });

    describe('sqrt', () => {
        test('should calculate square root', () => {
            expect(calculator.sqrt(16)).toBe(4);
        });

        test('should throw error for negative numbers', () => {
            expect(() => calculator.sqrt(-1)).toThrow('Cannot calculate square root of negative number');
        });
    });
});
