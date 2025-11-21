import math

class Point:
    def __init__(self, x: float, y: float):
        self.__x = x
        self.__y = y
    
    def get_distance(self) -> float:
        return math.sqrt(self.__x ** 2 + self.__y ** 2)
