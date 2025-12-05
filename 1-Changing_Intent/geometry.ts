class Point {
    constructor(
        private readonly x: number,
        private readonly y: number
    ) { }
    
    // Distance from origin (0, 0)
    getDistance() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    
    // Distance to another point
    distanceTo(other: Point) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }
    
    // Midpoint between this point and another
    midpoint(other: Point) {
        return new Point(
            (this.x + other.x) / 2,
            (this.y + other.y) / 2
        );
    }
    
    // Get coordinates
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
}

class Circle {
    constructor(
        private readonly center: Point,
        private readonly radius: number
    ) { }
    
    // Calculate area
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    
    // Calculate circumference
    getCircumference() {
        return 2 * Math.PI * this.radius;
    }
    
    // Check if a point is inside the circle
    contains(point: Point) {
        return this.center.distanceTo(point) <= this.radius;
    }
}

class Rectangle {
    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly width: number,
        private readonly height: number
    ) { }
    
    // Calculate area
    getArea() {
        return this.width * this.height;
    }
    
    // Calculate perimeter
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
    
    // Check if a point is inside the rectangle
    contains(point: Point) {
        return point.getX() >= this.x && 
               point.getX() <= this.x + this.width &&
               point.getY() >= this.y && 
               point.getY() <= this.y + this.height;
    }
    
    // Get the center point of the rectangle
    getCenter() {
        return new Point(
            this.x + this.width / 2,
            this.y + this.height / 2
        );
    }
}

class Triangle {
    constructor(
        private readonly p1: Point,
        private readonly p2: Point,
        private readonly p3: Point
    ) { }
    
    // Calculate area using Heron's formula
    getArea() {
        const a = this.p1.distanceTo(this.p2);
        const b = this.p2.distanceTo(this.p3);
        const c = this.p3.distanceTo(this.p1);
        const s = (a + b + c) / 2; // semi-perimeter
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
    
    // Calculate perimeter
    getPerimeter() {
        return this.p1.distanceTo(this.p2) + 
               this.p2.distanceTo(this.p3) + 
               this.p3.distanceTo(this.p1);
    }
}