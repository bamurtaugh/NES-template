# Calculator Module
# This module demonstrates changing intent - originally designed for basic arithmetic,
# now enhanced to support scientific calculations

import math

class Calculator:
    """
    A calculator class that handles both basic and scientific operations.
    Originally intended for simple arithmetic, the intent has been changed
    to support more advanced mathematical functions.
    """
    
    def __init__(self):
        # Track calculation history for scientific analysis
        self.history = []
    
    # Basic arithmetic operations (original intent)
    def add(self, a, b):
        """Add two numbers"""
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def subtract(self, a, b):
        """Subtract b from a"""
        result = a - b
        self.history.append(f"{a} - {b} = {result}")
        return result
    
    def multiply(self, a, b):
        """Multiply two numbers"""
        result = a * b
        self.history.append(f"{a} * {b} = {result}")
        return result
    
    def divide(self, a, b):
        """Divide a by b"""
        if b == 0:
            return None  # Handle division by zero
        result = a / b
        self.history.append(f"{a} / {b} = {result}")
        return result
    
    # Scientific operations (changed intent - new functionality)
    def power(self, base, exponent):
        """
        Raise base to the power of exponent.
        This represents a change in intent from basic arithmetic to scientific computing.
        """
        result = math.pow(base, exponent)
        self.history.append(f"{base} ^ {exponent} = {result}")
        return result
    
    def square_root(self, value):
        """
        Calculate square root of a value.
        Added to support scientific calculations (changed intent).
        """
        if value < 0:
            return None  # Cannot calculate square root of negative number
        result = math.sqrt(value)
        self.history.append(f"√{value} = {result}")
        return result
    
    def logarithm(self, value, base=math.e):
        """
        Calculate logarithm of value with specified base (default: natural log).
        This advanced function shows the evolution from basic calculator to scientific tool.
        """
        if value <= 0:
            return None  # Logarithm undefined for non-positive values
        result = math.log(value, base)
        self.history.append(f"log_{base}({value}) = {result}")
        return result
    
    def trigonometric_sin(self, angle_degrees):
        """
        Calculate sine of an angle in degrees.
        Demonstrates changing intent from basic arithmetic to trigonometric calculations.
        """
        angle_radians = math.radians(angle_degrees)
        result = math.sin(angle_radians)
        self.history.append(f"sin({angle_degrees}°) = {result}")
        return result
    
    def get_history(self):
        """
        Return calculation history.
        Added to support analysis and review - another change in intent.
        """
        return self.history
    
    def clear_history(self):
        """Clear the calculation history"""
        self.history = []
