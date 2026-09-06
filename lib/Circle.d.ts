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
export declare class Circle {
    /**
     * The center point of the circle.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(3, -4), 2.5);
     * console.log(circle.center); // Vector2(3.00, -4.00)
     * ```
     */
    center: Vector2;
    /**
     * The radius of the circle. Always a finite, non-negative number.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 5);
     * console.log(circle.radius); // 5
     * ```
     */
    radius: number;
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
    constructor(center: Vector2, radius: number);
    /**
     * The area enclosed by the circle (πr²).
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.area); // 314.1592653589793
     * ```
     */
    get area(): number;
    /**
     * The circumference (perimeter) of the circle (2πr).
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.circumference); // 62.83185307179586
     * ```
     */
    get circumference(): number;
    /**
     * Returns the string representation, equivalent to `toString()`.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.string); // "C(0, 0), R: 10"
     * ```
     */
    get string(): string;
    /**
     * The diameter of the circle (2 × radius).
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.diameter); // 20
     * ```
     */
    get diameter(): number;
    /**
     * The radius squared.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.radiusSquared); // 100
     * ```
     */
    get radiusSquared(): number;
    /**
     * The axis-aligned bounding box that exactly encloses this circle.
     *
     * @example
     * ```typescript
     * const circle = new Circle(new Vector2(0, 0), 10);
     * console.log(circle.boundingBox.toString()); // Rect(x=-10, y=-10, w=20, h=20)
     * ```
     */
    get boundingBox(): Rect;
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
    setRadius(radius: number): Circle;
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
    setCenter(center: Vector2): Circle;
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
    translate(dx: number, dy: number): Circle;
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
    scale(factor: number): Circle;
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
    toString(): string;
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
    get equationString(): string;
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
    containsPoint(point: Vector2, epsilon?: number): boolean;
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
    distanceTo(other: Vector2 | Circle): number;
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
    clone(): Circle;
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
    equals(other: Circle, epsilon?: number): boolean;
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
    isPointOnCircumference(point: Vector2, epsilon?: number): boolean;
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
    pointAt(angle: number): Vector2;
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
    intersects(other: Circle, epsilon?: number): boolean;
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
    containsCircle(other: Circle, epsilon?: number): boolean;
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
    containsBox(box: Rect, epsilon?: number): boolean;
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
    withCenter(center: Vector2): Circle;
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
    withRadius(radius: number): Circle;
}
//# sourceMappingURL=Circle.d.ts.map