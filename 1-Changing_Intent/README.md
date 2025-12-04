# Geometry Shapes

This folder contains geometric shape classes with various calculations.

## Available Shapes

### Point
Represents a point in 2D space with x and y coordinates.

**Constructor:**
```typescript
new Point(x: number, y: number)
```

**Methods:**
- `getDistance()`: Calculates the Euclidean distance from the origin (0, 0) to this point

**Example:**
```typescript
const point = new Point(3, 4);
const distance = point.getDistance(); // Returns 5
```

### Circle
Represents a circle in 2D space with a center point (x, y) and a radius.

**Constructor:**
```typescript
new Circle(x: number, y: number, radius: number)
```

**Methods:**
- `getArea()`: Calculates the area of the circle (π × r²)
- `getCircumference()`: Calculates the circumference of the circle (2 × π × r)

**Example:**
```typescript
const circle = new Circle(0, 0, 5);
const area = circle.getArea(); // Returns ~78.54
const circumference = circle.getCircumference(); // Returns ~31.42
```
