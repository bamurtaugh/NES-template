class Calculator:
    def __init__(self):
        self.result = 0
    
    def add(self, value):
        self.result += value
        return self.result
    
    def subtract(self, value):
        self.result -= value
        return self.result
    
    def multiply(self, value):
        self.result *= value
        return self.result
    
    def divide(self, value):
        if value == 0:
            raise ValueError("Cannot divide by zero")
        self.result /= value
        return self.result
    
    def reset(self):
        self.result = 0
        return self.result
