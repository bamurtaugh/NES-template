import math

class Point:
    def __init__(self, x: float, y: float):
        self._x = x
        self._y = y
    
    def get_distance(self) -> float:
        return math.sqrt(self._x ** 2 + self._y ** 2)
