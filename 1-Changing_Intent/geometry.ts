class Point {
    constructor(
        private readonly x: number,
        private readonly y: number
    ) { }
    getDistance() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

class Circle {
    constructor(
        private readonly radius: number
    ) { }
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    getCircumference() {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle {
    constructor(
        private readonly width: number,
        private readonly height: number
    ) { }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}

class Triangle {
    constructor(
        private readonly base: number,
        private readonly height: number
    ) { }
    getArea() {
        return (this.base * this.height) / 2;
    }
}