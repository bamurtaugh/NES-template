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
        private readonly x: number,
        private readonly y: number,
        private readonly radius: number
    ) { }
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    getCircumference() {
        return 2 * Math.PI * this.radius;
    }
}