/**
 * Represents a point in 2D Cartesian coordinate space.
 * This class provides functionality to calculate distances from the origin.
 */
class Point {
    /**
     * Creates a new Point instance.
     * @param x - The x-coordinate of the point
     * @param y - The y-coordinate of the point
     */
    constructor(
        private readonly x: number,
        private readonly y: number
    ) { }
    
    /**
     * Calculates the Euclidean distance from this point to the origin (0, 0).
     * Uses the Pythagorean theorem: distance = sqrt(x² + y²)
     * @returns The distance from the origin as a number
     */
    getDistance() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}