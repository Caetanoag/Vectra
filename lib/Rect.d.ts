import { Vector2 } from "./Vector2.js";
/**
 * Represents an axis-aligned rectangle (AABB).
 * Mutability: most methods modify the instance and return `this` for chaining.
 *
 * @example
 * ```typescript
 * const rect = new Rect(0, 0, 100, 50);
 * console.log(rect.area); // 5000
 * ```
 */
export declare class Rect {
    private x;
    private y;
    private width;
    private height;
    /**
     * Creates a new Rect. Negative width/height are automatically normalized.
     *
     * @param x - The x-coordinate of the top-left corner.
     * @param y - The y-coordinate of the top-left corner.
     * @param width - The width of the rectangle.
     * @param height - The height of the rectangle.
     * @throws If any value is not a finite number.
     * @example
     * ```typescript
     * const rect = new Rect(10, 10, 200, 100);
     * ```
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Sets the width and normalizes.
     *
     * @param w - The new width.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * rect.setWidth(200);
     * ```
     */
    setWidth(w: number): this;
    /**
     * Sets the height and normalizes.
     *
     * @param h - The new height.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * rect.setHeight(50);
     * ```
     */
    setHeight(h: number): this;
    /**
     * Moves the rectangle to absolute coordinates.
     *
     * @param x - New x position.
     * @param y - New y position.
     * @returns `this` for chaining.
     * @throws If `x` or `y` is not finite.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * rect.moveTo(50, 50);
     * ```
     */
    moveTo(x: number, y: number): Rect;
    /**
     * Sets the position from a Vector2.
     *
     * @param v - The new position.
     * @returns `this` for chaining.
     * @throws If `v` has non-finite coordinates.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * rect.setPosition(new Vector2(20, 30));
     * ```
     */
    setPosition(v: Vector2): Rect;
    /**
     * Sets the size from a Vector2.
     *
     * @param v - The new size (width, height).
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * rect.setSize(new Vector2(300, 150));
     * ```
     */
    setSize(v: Vector2): Rect;
    /**
     * Returns the position as a Vector2.
     *
     * @example
     * ```typescript
     * const rect = new Rect(10, 20, 100, 50);
     * console.log(rect.position); // Vector2(10, 20)
     * ```
     */
    get position(): Vector2;
    /**
     * Returns the area (width × height).
     *
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 10, 5);
     * console.log(rect.area); // 50
     * ```
     */
    get area(): number;
    /**
     * Returns the y-coordinate of the top edge.
     *
     * @example
     * ```typescript
     * const rect = new Rect(0, 10, 100, 50);
     * console.log(rect.top); // 10
     * ```
     */
    get top(): number;
    /**
     * Returns the x-coordinate of the left edge.
     *
     * @example
     * ```typescript
     * const rect = new Rect(10, 0, 100, 50);
     * console.log(rect.left); // 10
     * ```
     */
    get left(): number;
    /**
     * Returns the y-coordinate of the bottom edge.
     *
     * @example
     * ```typescript
     * const rect = new Rect(0, 10, 100, 50);
     * console.log(rect.bottom); // 60
     * ```
     */
    get bottom(): number;
    /**
     * Returns the x-coordinate of the right edge.
     *
     * @example
     * ```typescript
     * const rect = new Rect(10, 0, 100, 50);
     * console.log(rect.right); // 110
     * ```
     */
    get right(): number;
    /**
     * Returns the center point as a Vector2.
     *
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 50);
     * console.log(rect.center); // Vector2(50, 25)
     * ```
     */
    get center(): Vector2;
    /**
     * Returns the size (width, height) as a Vector2.
     *
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 50);
     * console.log(rect.size); // Vector2(100, 50)
     * ```
     */
    get size(): Vector2;
    /**
     * Returns the aspect ratio (width / height).
     *
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 200, 100);
     * console.log(rect.aspectRatio); // 2
     * ```
     */
    get aspectRatio(): number;
    /**
     * Returns the width.
     *
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 50);
     * console.log(rect.getWidth()); // 100
     * ```
     */
    getWidth(): number;
    /**
     * Returns the height.
     *
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 50);
     * console.log(rect.getHeight()); // 50
     * ```
     */
    getHeight(): number;
    /**
     * Checks if a point is inside the rectangle (inclusive of borders).
     *
     * @param point - The point to test.
     * @returns `true` if the point is inside or exactly on the edge, otherwise `false`.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * const point = new Vector2(50, 50);
     * if (rect.contains(point)) {
     *     console.log("Inside!");
     * }
     * ```
     */
    contains(point: Vector2): boolean;
    /**
     * Checks if this rectangle fully contains another rectangle (inclusive of borders).
     *
     * @param box - The other rectangle.
     * @returns `true` if every point of `box` is inside or on the edge of `this`.
     * @example
     * ```typescript
     * const outer = new Rect(0, 0, 200, 200);
     * const inner = new Rect(50, 50, 50, 50);
     * console.log(outer.containsBox(inner)); // true
     * ```
     */
    containsBox(box: Rect): boolean;
    /**
     * Checks if this rectangle intersects another (inclusive of borders).
     *
     * @param box - The other rectangle.
     * @returns `true` if they overlap or touch, otherwise `false`.
     * @example
     * ```typescript
     * const a = new Rect(0, 0, 100, 100);
     * const b = new Rect(50, 50, 100, 100);
     * console.log(a.intersects(b)); // true
     * ```
     */
    intersects(box: Rect): boolean;
    /**
     * Translates the rectangle by (dx, dy).
     *
     * @param dx - X offset.
     * @param dy - Y offset.
     * @returns `this` for chaining.
     * @throws If `dx` or `dy` is not finite.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * rect.translate(10, -5);
     * ```
     */
    translate(dx: number, dy: number): Rect;
    /**
     * Resizes the rectangle by adding to its width and height.
     *
     * @param dx - Change in width.
     * @param dy - Change in height.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * rect.resize(20, -10); // now 120 x 90
     * ```
     */
    resize(dx: number, dy: number): Rect;
    /**
     * Expands the rectangle in all directions by (dx, dy) maintaining the center.
     *
     * @param dx - Half-expansion in x-axis.
     * @param dy - Half-expansion in y-axis.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * rect.inflate(10, 10); // grows by 20 total on each axis, same center
     * ```
     */
    inflate(dx: number, dy: number): Rect;
    /**
     * Rounds all values to the nearest integer, returning the same rect.
     *
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const rect = new Rect(1.2, 2.7, 10.5, 5.4);
     * rect.round(); // Rect(1, 3, 11, 5)
     * ```
     */
    round(): this;
    /**
     * Scales the rect from its top-left corner, returning the same rect.
     *
     * @param sx - X scale factor.
     * @param sy - Y scale factor.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 50);
     * rect.scale(2, 2); // width 200, height 100, position unchanged
     * ```
     */
    scale(sx: number, sy: number): this;
    /**
     * Scales the rect from its center, returning the same rect.
     *
     * @param sx - X scale factor.
     * @param sy - Y scale factor.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * rect.scaleFromCenter(2, 1); // grows horizontally, center stays at (50, 50)
     * ```
     */
    scaleFromCenter(sx: number, sy: number): this;
    /**
     * Computes the union of two rectangles.
     *
     * @param box - The other rectangle.
     * @returns A new Rect that covers both rectangles.
     * @example
     * ```typescript
     * const a = new Rect(0, 0, 50, 50);
     * const b = new Rect(100, 100, 50, 50);
     * const combined = a.union(b); // Rect(0, 0, 150, 150)
     * ```
     */
    union(box: Rect): Rect;
    /**
     * Computes the intersection of two rectangles.
     *
     * @param box - The other rectangle.
     * @returns A new Rect representing the overlapping area, or `undefined` if none.
     * @example
     * ```typescript
     * const a = new Rect(0, 0, 100, 100);
     * const b = new Rect(50, 50, 100, 100);
     * const overlap = a.intersection(b); // Rect(50, 50, 50, 50)
     * ```
     */
    intersection(box: Rect): Rect | undefined;
    /**
     * Creates a deep copy of this rectangle.
     *
     * @returns A new Rect with the same position and size.
     * @example
     * ```typescript
     * const original = new Rect(0, 0, 100, 100);
     * const copy = original.clone();
     * ```
     */
    clone(): Rect;
    /**
     * Checks if the rectangle has zero width or height.
     *
     * @returns `true` if width or height equals 0.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 0, 50);
     * console.log(rect.isEmpty()); // true
     * ```
     */
    isEmpty(): boolean;
    /**
     * Squared distance from a point to the nearest edge (0 if inside).
     *
     * @param point - The point to measure from.
     * @returns The squared distance to the nearest edge.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * console.log(rect.distanceSquaredToPoint(new Vector2(150, 0))); // 2500
     * ```
     */
    distanceSquaredToPoint(point: Vector2): number;
    /**
     * Euclidean distance from a point to the nearest edge.
     *
     * @param point - The point to measure from.
     * @returns The distance to the nearest edge (0 if the point is inside).
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * console.log(rect.distanceToPoint(new Vector2(150, 0))); // 50
     * ```
     */
    distanceToPoint(point: Vector2): number;
    /**
     * Compares two rectangles for exact equality.
     *
     * @param box - The other rectangle.
     * @returns `true` if all properties match exactly.
     * @example
     * ```typescript
     * const a = new Rect(0, 0, 100, 100);
     * const b = new Rect(0, 0, 100, 100);
     * console.log(a.equals(b)); // true
     * ```
     */
    equals(box: Rect): boolean;
    /**
     * Normalizes the rectangle: if width or height is negative, swaps coordinates.
     * @private
     */
    private normalize;
    /**
     * Returns a new Vector2 clamped to the inside of this rectangle (inclusive).
     *
     * @param point - The point to clamp.
     * @returns A new Vector2 constrained to the rectangle's bounds.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 100);
     * const clamped = rect.clampPoint(new Vector2(150, -20)); // Vector2(100, 0)
     * ```
     */
    clampPoint(point: Vector2): Vector2;
    /**
     * Generates a random rectangle fully contained within a given boundary.
     *
     * @param boundary - The outer container.
     * @param minWidth - Minimum width of the generated rect (default 1).
     * @param minHeight - Minimum height of the generated rect (default 1).
     * @returns A new Rect with random position and size inside the boundary.
     * @throws If `boundary` is not a Rect instance, or if it is too small for the minimum constraints.
     * @example
     * ```typescript
     * const boundary = new Rect(0, 0, 500, 500);
     * const randomRect = Rect.generateRandomInside(boundary, 20, 20);
     * ```
     */
    static generateRandomInside(boundary: Rect, minWidth?: number, minHeight?: number): Rect;
    /**
     * Creates a Rect from a center point and a size Vector2.
     *
     * @param center - The center coordinates.
     * @param size - The width and height as a Vector2.
     * @returns A new Rect created from the center point.
     * @example
     * ```typescript
     * const rect = Rect.fromCenter(new Vector2(50, 50), new Vector2(100, 100));
     * // Rect(0, 0, 100, 100)
     * ```
     */
    static fromCenter(center: Vector2, size: Vector2): Rect;
    /**
     * Creates a Rect that exactly spans between two corner points.
     *
     * @param a - One corner.
     * @param b - The opposite corner.
     * @returns A new Rect spanning both points, regardless of their order.
     * @example
     * ```typescript
     * const rect = Rect.fromCorners(new Vector2(100, 100), new Vector2(0, 0));
     * // Rect(0, 0, 100, 100)
     * ```
     */
    static fromCorners(a: Vector2, b: Vector2): Rect;
    /**
     * Validates that all numeric values are finite.
     * @private
     */
    private validate;
    /**
     * Returns a string representation of the rectangle.
     *
     * @returns A human-readable string with x, y, width, and height.
     * @example
     * ```typescript
     * const rect = new Rect(0, 0, 100, 50);
     * console.log(rect.toString()); // "Rect(x=0, y=0, w=100, h=50)"
     * ```
     */
    toString(): string;
}
//# sourceMappingURL=Rect.d.ts.map