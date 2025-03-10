class Point {
    constructor(
        private readonly x: number,
        private readonly y: number
    ) { }
    getDistance() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}