"""
Calculator module demonstrating code that could benefit from refactoring.
This example shows common code smells like duplicated logic, long methods,
and opportunities for extracting functions.
"""

class Calculator:
    def __init__(self):
        self.history = []
    
    def process_operation(self, num1, num2, operation):
        """Process arithmetic operations - contains duplicated code that could be refactored"""
        if operation == 'add':
            result = num1 + num2
            self.history.append(f"{num1} + {num2} = {result}")
            print(f"Result: {result}")
            return result
        elif operation == 'subtract':
            result = num1 - num2
            self.history.append(f"{num1} - {num2} = {result}")
            print(f"Result: {result}")
            return result
        elif operation == 'multiply':
            result = num1 * num2
            self.history.append(f"{num1} * {num2} = {result}")
            print(f"Result: {result}")
            return result
        elif operation == 'divide':
            if num2 == 0:
                print("Error: Cannot divide by zero")
                return None
            result = num1 / num2
            self.history.append(f"{num1} / {num2} = {result}")
            print(f"Result: {result}")
            return result
        else:
            print("Error: Invalid operation")
            return None
    
    def calculate_statistics(self, numbers):
        """Calculate statistics - long method that could be broken down"""
        if not numbers:
            return None
        
        # Calculate sum
        total = 0
        for num in numbers:
            total += num
        
        # Calculate average
        avg = total / len(numbers)
        
        # Find minimum
        min_val = numbers[0]
        for num in numbers:
            if num < min_val:
                min_val = num
        
        # Find maximum
        max_val = numbers[0]
        for num in numbers:
            if num > max_val:
                max_val = num
        
        # Calculate median
        sorted_nums = sorted(numbers)
        n = len(sorted_nums)
        if n % 2 == 0:
            median = (sorted_nums[n//2 - 1] + sorted_nums[n//2]) / 2
        else:
            median = sorted_nums[n//2]
        
        return {
            'sum': total,
            'average': avg,
            'min': min_val,
            'max': max_val,
            'median': median,
            'count': len(numbers)
        }
    
    def show_history(self):
        """Display calculation history"""
        if not self.history:
            print("No calculation history")
        else:
            print("Calculation History:")
            for entry in self.history:
                print(f"  {entry}")


# Example usage
if __name__ == "__main__":
    calc = Calculator()
    
    # Perform some calculations
    calc.process_operation(10, 5, 'add')
    calc.process_operation(10, 5, 'subtract')
    calc.process_operation(10, 5, 'multiply')
    calc.process_operation(10, 5, 'divide')
    
    # Show history
    calc.show_history()
    
    # Calculate statistics
    numbers = [5, 2, 8, 1, 9, 3, 7]
    stats = calc.calculate_statistics(numbers)
    if stats:
        print("\nStatistics for", numbers)
        for key, value in stats.items():
            print(f"  {key}: {value}")
