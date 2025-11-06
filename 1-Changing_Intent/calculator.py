class Calculator:
    def __init__(self):
        self.memory = 0
    
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b
    
    def multiply(self, a, b):
        return a * b
    
    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b
    
    def power(self, base, exponent):
        return base ** exponent
    
    def store_in_memory(self, value):
        self.memory = value
    
    def recall_memory(self):
        return self.memory
    
    def clear_memory(self):
        self.memory = 0
