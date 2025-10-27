// Function with Optional Parameters
function greet(name: string, greeting?: string): string {
    return `${greeting || 'Hello'}, ${name}!`;
}

// Function with Default Parameters
function multiply(a: number, b: number = 1): number {
    return a * b;
}

// Arrow Function
const add = (a: number, b: number): number => a + b;

// Check if a number is prime
function isPrime(num: number): boolean {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Example usage
console.log(isPrime(7)); // Output: true
console.log(greet("Alice")); // Output: Hello, Alice!
console.log(greet("Bob", "Hi")); // Output: Hi, Bob!
console.log(multiply(5)); // Output: 5
console.log(multiply(5, 2)); // Output: 10
console.log(add(3, 4)); // Output: 7