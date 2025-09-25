class Calculator {
    constructor() {
        this.result = 0;
        this.history = [];
    }

    add(value) {
        this.result += value;
        this.history.push(`+ ${value}`);
        return this;
    }

    subtract(value) {
        this.result -= value;
        this.history.push(`- ${value}`);
        return this;
    }

    multiply(value) {
        this.result *= value;
        this.history.push(`× ${value}`);
        return this;
    }

    divide(value) {
        if (value === 0) {
            throw new Error("Division by zero is not allowed");
        }
        this.result /= value;
        this.history.push(`÷ ${value}`);
        return this;
    }

    getResult() {
        return this.result;
    }

    clear() {
        this.result = 0;
        this.history = [];
        return this;
    }

    getHistory() {
        return this.history.slice();
    }
}

// Example usage
const calc = new Calculator();
console.log(calc.add(10).multiply(2).subtract(5).getResult()); // 15
console.log(calc.getHistory()); // ['+ 10', '× 2', '- 5']