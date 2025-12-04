// Function with Optional Parameters
function greet(name, greeting) {
    return "".concat(greeting || 'Hello', ", ").concat(name, "!");
}
// Function with Default Parameters
function multiply(a, b) {
    if (b === void 0) { b = 1; }
    return a * b;
}
// Arrow Function
var add = function (a, b) { return a + b; };
// Check if a number is prime
function isPrime(num) {
    if (num <= 1)
        return false;
    for (var i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0)
            return false;
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
