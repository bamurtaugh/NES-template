"""
Test suite for string_utils module.
"""
import pytest
from string_utils import (
    reverse_string,
    is_palindrome,
    count_vowels,
    capitalize_words,
    remove_whitespace,
    truncate
)

class TestReverseString:
    def test_reverse_simple_string(self):
        assert reverse_string("hello") == "olleh"
    
    def test_reverse_empty_string(self):
        assert reverse_string("") == ""
    
    def test_reverse_single_char(self):
        assert reverse_string("a") == "a"

class TestIsPalindrome:
    def test_palindrome_word(self):
        assert is_palindrome("racecar") == True
    
    def test_not_palindrome(self):
        assert is_palindrome("hello") == False
    
    def test_palindrome_with_spaces(self):
        assert is_palindrome("A man a plan a canal Panama") == True
    
    def test_palindrome_case_insensitive(self):
        assert is_palindrome("RaceCar") == True

class TestCountVowels:
    def test_count_vowels_basic(self):
        assert count_vowels("hello") == 2
    
    def test_count_vowels_no_vowels(self):
        assert count_vowels("xyz") == 0
    
    def test_count_vowels_all_vowels(self):
        assert count_vowels("aeiou") == 5
    
    def test_count_vowels_mixed_case(self):
        assert count_vowels("Hello World") == 3

class TestCapitalizeWords:
    def test_capitalize_single_word(self):
        assert capitalize_words("hello") == "Hello"
    
    def test_capitalize_multiple_words(self):
        assert capitalize_words("hello world") == "Hello World"
    
    def test_capitalize_already_capitalized(self):
        assert capitalize_words("Hello World") == "Hello World"

class TestRemoveWhitespace:
    def test_remove_spaces(self):
        assert remove_whitespace("hello world") == "helloworld"
    
    def test_remove_multiple_spaces(self):
        assert remove_whitespace("hello   world") == "helloworld"
    
    def test_no_whitespace(self):
        assert remove_whitespace("hello") == "hello"

class TestTruncate:
    def test_truncate_long_string(self):
        assert truncate("This is a long string", 10) == "This is..."
    
    def test_truncate_short_string(self):
        assert truncate("Short", 10) == "Short"
    
    def test_truncate_custom_suffix(self):
        assert truncate("This is a long string", 10, "…") == "This is …"
    
    def test_truncate_exact_length(self):
        assert truncate("Exactly10!", 10) == "Exactly10!"
