import { Rect } from "./Rect.js";
import { Vector2 } from "./Vector2.js";
/**
 * Represents a circle defined by a center point and a radius.
 * Mutable for properties like radius and center, with convenience
 * methods for geometry queries, mutation, and immutable variants.
 *
 * @example
 * ```typescript
 * const circle = new Circle(new Vector2(0, 0), 10);
 * console.log(circle.area); // 314.1592653589793
 * ```
 */
export class Circle {
    /**
     * The center point of the circle.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(3, -4), 2.5);
     * console.log(circle.center); // Vector2(3.00, -4.00)
     * ```
     */
    center;
    /**
     * The radius of the circle. Always a finite, non-negative number.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 5);
     * console.log(circle.radius); // 5
     * ```
     */
    radius;
    /**
     * Creates a new Circle.
     *
     * @param center - The center point.
     * @param radius - The radius. Must be a finite number greater or equal to zero.
     * @throws If `radius` is negative or not finite.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(10, 20), 15);
     * ```
     */
    constructor(center, radius) {
        if (radius < 0 || !Number.isFinite(radius))
            throw new Error("Radius must be a finite number greater or equal to zero");
        this.center = center;
        this.radius = radius;
    }
    /**
     * The area enclosed by the circle (πr²).
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.area); // 314.1592653589793
     * ```
     */
    get area() {
        return this.radius * this.radius * Math.PI;
    }
    /**
     * The circumference (perimeter) of the circle (2πr).
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.circumference); // 62.83185307179586
     * ```
     */
    get circumference() {
        return 2 * this.radius * Math.PI;
    }
    /**
     * Returns the string representation, equivalent to `toString()`.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.string); // "C(0, 0), R: 10"
     * ```
     */
    get string() {
        return this.toString();
    }
    /**
     * The diameter of the circle (2 × radius).
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.diameter); // 20
     * ```
     */
    get diameter() {
        return 2 * this.radius;
    }
    /**
     * The radius squared.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.radiusSquared); // 100
     * ```
     */
    get radiusSquared() {
        return this.radius * this.radius;
    }
    /**
     * The axis-aligned bounding box that exactly encloses this circle.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.boundingBox.toString()); // Rect(x=-10, y=-10, w=20, h=20)
     * ```
     */
    get boundingBox() {
        return Rect.fromCenter(this.center, new Vector2(this.radius * 2, this.radius * 2));
    }
    /**
     * Sets the radius and returns `this` for chaining.
     *
     * @param radius - The new radius.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * circle.setRadius(15);
     * ```
     */
    setRadius(radius) {
        this.radius = radius;
        return this;
    }
    /**
     * Sets the center and returns `this` for chaining.
     *
     * @param center - The new center point.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * circle.setCenter(new Vector2(50, 50));
     * ```
     */
    setCenter(center) {
        this.center = center;
        return this;
    }
    /**
     * Translates the circle by (dx, dy), moving its center, and returns `this`.
     *
     * @param dx - X offset.
     * @param dy - Y offset.
     * @returns `this` for chaining.
     * @throws If `dx` or `dy` is not finite.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * circle.translate(10, -5); // center becomes (10, -5)
     * ```
     */
    translate(dx, dy) {
        this.center = this.center.translate(dx, dy);
        return this;
    }
    /**
     * Scales the radius by a factor and returns `this`.
     *
     * @param factor - The scale multiplier.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * circle.scale(2); // radius becomes 20
     * ```
     */
    scale(factor) {
        this.radius *= factor;
        return this;
    }
    /**
     * Returns a string representation of the circle.
     *
     * @returns A human-readable string in the form `C(x, y), R: radius`.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.toString()); // "C(0, 0), R: 10"
     * ```
     */
    toString() {
        return `C(${this.center.x}, ${this.center.y}), R: ${this.radius}`;
    }
    /**
     * Returns the Cartesian equation of the circle:
     * `(x − h)² + (y − k)² = r²`.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(3, -4), 2.5);
     * console.log(circle.equationString); // "(x - 3)^2 + (y + 4)^2 = 2.5^2"
     * ```
     */
    get equationString() {
        const signal = (n) => {
            if (n <= 0) {
                return "+";
            }
            return "-";
        };
        return `(x ${signal(this.center.x)} ${Math.abs(this.center.x)})^2 + (y ${signal(this.center.y)} ${Math.abs(this.center.y)})^2 = ${this.radius * this.radius}`;
    }
    /**
     * Checks if a point is inside the circle (inclusive of the boundary).
     *
     * @param point - The point to test.
     * @param epsilon - Tolerance for floating-point errors (default `1e-9`).
     * @returns `true` if the point is inside or exactly on the circumference, otherwise `false`.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.containsPoint(new Vector2(5, 0))); // true
     * console.log(circle.containsPoint(new Vector2(15, 0))); // false
     * ```
     */
    containsPoint(point, epsilon = 1e-9) {
        return Math.abs(point.distanceTo(this.center)) <= this.radius + epsilon;
    }
    /**
     * Computes the distance from the circle's center to a point or another circle.
     *
     * @param other - The point or circle.
     * @returns The distance between the centers.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.distanceTo(new Vector2(3, 4))); // 5
     * ```
     */
    distanceTo(other) {
        if (other instanceof Vector2) {
            return this.center.distanceTo(other);
        }
        return other.center.distanceTo(this.center);
    }
    /**
     * Creates a deep copy of this circle.
     *
     * @returns A new Circle with the same center and radius.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * const copy = circle.clone();
     * console.log(copy === circle); // false
     * ```
     */
    clone() {
        return new Circle(this.center.clone(), this.radius);
    }
    /**
     * Compares this circle to another for geometric equality.
     *
     * @param other - The other circle.
     * @param epsilon - Tolerance (default `1e-9`).
     * @returns `true` if both centers and radii are equal within `epsilon`.
     * @example
     * ```typescript
     * const a = new Circle(new Vector2(0, 0), 10);
     * const b = new Circle(new Vector2(0, 0), 10);
     * console.log(a.equals(b)); // true
     * ```
     */
    equals(other, epsilon = 1e-9) {
        return (this.center.equals(other.center, epsilon) &&
            Math.abs(this.radius - other.radius) <= epsilon);
    }
    /**
     * Checks if a point lies exactly on the circumference.
     *
     * @param point - The point to test.
     * @param epsilon - Tolerance (default `1e-9`).
     * @returns `true` if the point is on the circle's edge, otherwise `false`.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.isPointOnCircumference(new Vector2(10, 0))); // true
     *```
     */
    isPointOnCircumference(point, epsilon = 1e-9) {
        return Math.abs(point.distanceTo(this.center) - this.radius) <= epsilon;
    }
    /**
     * Returns the point on the circumference at a given angle.
     *
     * @param angle - The angle in radians.
     * @returns A new Vector2 at the circle's boundary.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(5, 5), 10);
     * const point = circle.pointAt(0); // Vector2(15, 5)
     * ```
     */
    pointAt(angle) {
        return Vector2.fromPolar(angle, this.radius).add(this.center);
    }
    /**
     * Checks if this circle intersects (or touches) another circle.
     *
     * @param other - The other circle.
     * @param epsilon - Tolerance (default `1e-9`).
     * @returns `true` if the circles overlap or touch, otherwise `false`.
     * @example
     * ```typescript
     * const a = new Circle(new Vector2(0, 0), 10);
     * const b = new Circle(new Vector2(15, 0), 10);
     * console.log(a.intersects(b)); // true
     * ```
     */
    intersects(other, epsilon = 1e-9) {
        const distance = this.center.distanceTo(other.center);
        return distance <= this.radius + other.radius + epsilon;
    }
    /**
     * Checks if another circle is fully contained within this one.
     *
     * @param other - The other circle.
     * @param epsilon - Tolerance (default `1e-9`).
     * @returns `true` if every point of `other` lies inside or on this circle.
     * @example
     * ```typescript
     * const outer = new Circle(new Vector2(0, 0), 20);
     * const inner = new Circle(new Vector2(5, 0), 5);
     * console.log(outer.containsCircle(inner)); // true
     * ```
     */
    containsCircle(other, epsilon = 1e-9) {
        const distance = this.center.distanceTo(other.center);
        return distance + other.radius <= this.radius + epsilon;
    }
    /**
     * Checks if an axis-aligned rectangle is fully contained within this circle.
     *
     * @param box - The rectangle to test.
     * @param epsilon - Tolerance (default `1e-9`).
     * @returns `true` if all four corners of `box` lie inside or on this circle.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 20);
     * const box = new Rect(-10, -10, 20, 20);
     * console.log(circle.containsBox(box)); // true
     * ```
     */
    containsBox(box, epsilon = 1e-9) {
        const corners = [
            new Vector2(box.left, box.top),
            new Vector2(box.right, box.top),
            new Vector2(box.right, box.bottom),
            new Vector2(box.left, box.bottom),
        ];
        return corners.every((corner) => this.containsPoint(corner, epsilon));
    }
    /**
     * Returns a new circle with a different center, keeping the same radius.
     *
     * @param center - The new center point.
     * @returns A new Circle at `center` with the original radius.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * const moved = circle.withCenter(new Vector2(50, 50));
     * ```
     */
    withCenter(center) {
        return new Circle(center, this.radius);
    }
    /**
     * Returns a new circle with a different radius, keeping the same center.
     *
     * @param radius - The new radius.
     * @returns A new Circle with the original center and the given radius.
     * @throws If `radius` is negative or not finite.
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * const bigger = circle.withRadius(20);
     * ```
     */
    withRadius(radius) {
        return new Circle(this.center, radius);
    }
}
//# sourceMappingURL=Circle.js.map