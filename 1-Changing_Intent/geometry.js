// JavaScript implementation of geometric calculations
// This demonstrates the same intent as geometry.ts but with different syntax and features

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Calculate distance from origin
    getDistance() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    // Calculate distance between two points
    getDistanceTo(otherPoint) {
        const dx = this.x - otherPoint.x;
        const dy = this.y - otherPoint.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }

    // Get angle in radians
    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    // Get angle in degrees
    getAngleDegrees() {
        return this.getAngle() * (180 / Math.PI);
    }

    // Move point by offset
    move(deltaX, deltaY) {
        return new Point(this.x + deltaX, this.y + deltaY);
    }

    // String representation
    toString() {
        return `Point(${this.x}, ${this.y})`;
    }
}

// Example usage and demonstration
function demonstrateGeometry() {
    console.log("=== JavaScript Geometry Example ===");
    
    const origin = new Point(0, 0);
    const point1 = new Point(3, 4);
    const point2 = new Point(6, 8);
    
    console.log(`Origin: ${origin.toString()}`);
    console.log(`Point 1: ${point1.toString()}`);
    console.log(`Point 2: ${point2.toString()}`);
    
    console.log(`Distance from origin to point1: ${point1.getDistance()}`);
    console.log(`Distance between point1 and point2: ${point1.getDistanceTo(point2)}`);
    
    console.log(`Point1 angle (radians): ${point1.getAngle().toFixed(3)}`);
    console.log(`Point1 angle (degrees): ${point1.getAngleDegrees().toFixed(1)}°`);
    
    const movedPoint = point1.move(2, 3);
    console.log(`Point1 moved by (2,3): ${movedPoint.toString()}`);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Point, demonstrateGeometry };
}

// Run demonstration if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    demonstrateGeometry();
}