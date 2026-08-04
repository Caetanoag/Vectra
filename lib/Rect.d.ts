import { Vector2 } from "./Vector2.js";
/**
 * Represents an axis-aligned rectangle (AABB).
 * Mutability: most methods modify the instance and return `this` for chaining.
 */
export declare class Rect {
    private x;
    private y;
    private width;
    private height;
    constructor(x: number, y: number, width: number, height: number);
    /**
     * Sets the width and normalizes.
     * @param w - The new width.
     * @returns `this` for chaining.
     */
    setWidth(w: number): this;
    /**
     * Sets the height and normalizes.
     * @param h - The new height.
     * @returns `this` for chaining.
     */
    setHeight(h: number): this;
    /**
     * Moves the rectangle to absolute coordinates.
     * @param x - New x position.
     * @param y - New y position.
     * @returns `this` for chaining.
     */
    moveTo(x: number, y: number): Rect;
    /**
     * Sets the position from a Vector2.
     * @param v - The new position.
     * @returns `this` for chaining.
     */
    setPosition(v: Vector2): Rect;
    /**
     * Sets the size from a Vector2.
     * @param v - The new size (width, height).
     * @returns `this` for chaining.
     */
    setSize(v: Vector2): Rect;
    /** Returns the position as a Vector2. */
    get position(): Vector2;
    /** Returns the area (width × height). */
    get area(): number;
    /** Returns the y-coordinate of the top edge. */
    get top(): number;
    /** Returns the x-coordinate of the left edge. */
    get left(): number;
    /** Returns the y-coordinate of the bottom edge. */
    get bottom(): number;
    /** Returns the x-coordinate of the right edge. */
    get right(): number;
    /** Returns the center point as a Vector2. */
    get center(): Vector2;
    /** Returns the size (width, height) as a Vector2. */
    get size(): Vector2;
    /** Returns the aspect ratio (width / height). */
    get aspectRatio(): number;
    /** Returns the width. */
    getWidth(): number;
    /** Returns the height. */
    getHeight(): number;
    /**
     * Checks if a point is inside the rectangle (inclusive of borders).
     * @param point - The point to test.
     * @returns True if the point is inside (including edges).
     */
    contains(point: Vector2): boolean;
    /**
     * Checks if this rectangle fully contains another rectangle (inclusive of borders).
     * @param box - The other rectangle.
     * @returns True if every point of `box` is inside or on the edge of `this`.
     */
    containsBox(box: Rect): boolean;
    /**
     * Checks if this rectangle intersects another (inclusive of borders).
     * @param box - The other rectangle.
     * @returns True if they overlap or touch.
     */
    intersects(box: Rect): boolean;
    /**
     * Translates the rectangle by (dx, dy).
     * @param dx - X offset.
     * @param dy - Y offset.
     * @returns `this` for chaining.
     */
    translate(dx: number, dy: number): Rect;
    /**
     * Resizes the rectangle by adding to its width and height.
     * @param dx - Change in width.
     * @param dy - Change in height.
     * @returns `this` for chaining.
     */
    resize(dx: number, dy: number): Rect;
    /**
     * Expands the rectangle in all directions by (dx, dy) maintaining the center.
     * @param dx - Half-expansion in x-axis.
     * @param dy - Half-expansion in y-axis.
     * @returns `this` for chaining.
     */
    inflate(dx: number, dy: number): Rect;
    /** Rounds all values to the nearest integer, returning the same rect. */
    round(): this;
    /** Scales the rect from its top-left corner, returning the same rect. */
    scale(sx: number, sy: number): this;
    /** Scales the rect from its center, returning the same rect. */
    scaleFromCenter(sx: number, sy: number): this;
    /**
     * Computes the union of two rectangles.
     * @param box - The other rectangle.
     * @returns A new Rect that covers both rectangles.
     */
    union(box: Rect): Rect;
    /**
     * Computes the intersection of two rectangles.
     * @param box - The other rectangle.
     * @returns A new Rect representing the overlapping area, or `undefined` if none.
     */
    intersection(box: Rect): Rect | undefined;
    /** Creates a deep copy of this rectangle. */
    clone(): Rect;
    /** Checks if the rectangle has zero width or height. */
    isEmpty(): boolean;
    /** Squared distance from a point to the nearest edge (0 if inside).
     */
    distanceSquaredToPoint(point: Vector2): number;
    /** Euclidean distance from a point to the nearest edge. */
    distanceToPoint(point: Vector2): number;
    /**
     * Compares two rectangles for exact equality.
     * @param box - The other rectangle.
     * @returns True if all properties match exactly.
     */
    equals(box: Rect): boolean;
    /**
     * Normalizes the rectangle: if width or height is negative, swaps coordinates.
     * @private
     */
    private normalize;
    /**
     * Returns a new Vector2 clamped to the inside of this rectangle (inclusive).
     * @param point - Vector2 representing the point
     */
    clampPoint(point: Vector2): Vector2;
    /**
     * Generates a random rectangle fully contained within a given boundary.
     * @param boundary - The outer container.
     * @param minWidth - Minimum width of the generated rect (default 1).
     * @param minHeight - Minimum height of the generated rect (default 1).
     * @returns A new Rect with random position and size inside the boundary.
     */
    static generateRandomInside(boundary: Rect, minWidth?: number, minHeight?: number): Rect;
    /** Creates a Rect from a center point and a size Vector2.
     * @param center - The center coordinates
     * @param size   - The width and height as a Vector2
     * @returns A new Rect created from the center point
     */
    static fromCenter(center: Vector2, size: Vector2): Rect;
    /** Creates a Rect that exactly spans between two corner points. */
    static fromCorners(a: Vector2, b: Vector2): Rect;
    /**
     * Validates that all numeric values are finite.
     * @private
     */
    private validate;
    toString(): string;
}
//# sourceMappingURL=Rect.d.ts.map