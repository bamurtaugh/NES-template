/**
 * Represents a point in 3D space
 */
class Point {
    /**
     * Creates a new 3D point
     * @param x - The x-coordinate
     * @param y - The y-coordinate
     * @param z - The z-coordinate
     */
    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly z: number
    ) { }
    
    /**
     * Calculates the Euclidean distance from the origin (0, 0, 0)
     * @returns The distance from the origin
     */
    getDistance() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
}