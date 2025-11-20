"""
String utility functions for testing examples.
"""

def reverse_string(s):
    """Reverse a string."""
    return s[::-1]

def is_palindrome(s):
    """Check if a string is a palindrome (case-insensitive)."""
    s = s.lower().replace(' ', '')
    return s == s[::-1]

def count_vowels(s):
    """Count the number of vowels in a string."""
    vowels = 'aeiouAEIOU'
    return sum(1 for char in s if char in vowels)

def capitalize_words(s):
    """Capitalize the first letter of each word."""
    return ' '.join(word.capitalize() for word in s.split())

def remove_whitespace(s):
    """Remove all whitespace from a string."""
    return ''.join(s.split())

def truncate(s, length, suffix='...'):
    """Truncate a string to a specified length."""
    if len(s) <= length:
        return s
    return s[:length - len(suffix)] + suffix
