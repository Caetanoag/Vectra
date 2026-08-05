/**
 * Represents a 2D vector with x and y components.
 * All operations are immutable, returning new Vector2 instances.
 *
 * @example
 * ```typescript
 * const v = new Vector2(3, 4);
 * console.log(v.length); // 5
 * ```
 */
export declare class Vector2 {
    x: number;
    y: number;
    /**
     * Creates a new Vector2.
     *
     * @param x - The x-coordinate. Must be finite.
     * @param y - The y-coordinate. Must be finite.
     * @throws If `x` or `y` is not a finite number.
     * @example
     * ```typescript
     * const v = new Vector2(10, 20);
     * ```
     */
    constructor(x: number, y: number);
    /**
     * The Euclidean length (magnitude) of the vector.
     *
     * @example
     * ```typescript
     * const v = new Vector2(3, 4);
     * console.log(v.length); // 5
     * ```
     */
    get length(): number;
    /**
     * Linear interpolation between this vector and another.
     *
     * @param other - The target vector.
     * @param t - Interpolation factor in [0, 1].
     * @returns A new Vector2 at the interpolated position.
     * @throws If `t` is outside the [0, 1] range.
     * @example
     * ```typescript
     * const a = new Vector2(0, 0);
     * const b = new Vector2(10, 10);
     * const mid = a.lerp(b, 0.5); // Vector2(5, 5)
     * ```
     */
    lerp(other: Vector2, t: number): Vector2;
    /**
     * The angle (direction) of this vector in radians.
     *
     * @example
     * ```typescript
     * const v = new Vector2(1, 0);
     * console.log(v.angle); // 0
     * ```
     */
    get angle(): number;
    /**
     * The squared Euclidean length. Faster than `length` for comparisons.
     *
     * @example
     * ```typescript
     * const v = new Vector2(3, 4);
     * console.log(v.lengthSq); // 25
     * ```
     */
    get lengthSq(): number;
    /**
     * Returns a string representation with two decimal places.
     *
     * @returns A human-readable string in the form `Vector2(x, y)`.
     * @example
     * ```typescript
     * const v = new Vector2(1, 2);
     * console.log(v.toString()); // "Vector2(1.00, 2.00)"
     * ```
     */
    toString(): string;
    /**
     * Returns the angle in radians from this vector to another vector.
     *
     * @param v - The target point.
     * @returns The angle in radians between this vector and `v`.
     * @example
     * ```typescript
     * const a = new Vector2(0, 0);
     * const b = new Vector2(1, 1);
     * console.log(a.getAngle(b)); // 0.7853981633974483 (45 degrees)
     * ```
     */
    getAngle(v: Vector2): number;
    /**
     * Adds another vector to this one.
     *
     * @param v - The vector to add.
     * @returns A new Vector2 with the sum of both vectors.
     * @example
     * ```typescript
     * const a = new Vector2(1, 2);
     * const b = new Vector2(3, 4);
     * const sum = a.add(b); // Vector2(4, 6)
     * ```
     */
    add(v: Vector2): Vector2;
    /**
     * Subtracts another vector from this one.
     *
     * @param v - The vector to subtract.
     * @returns A new Vector2 representing `this - v`.
     * @example
     * ```typescript
     * const a = new Vector2(5, 5);
     * const b = new Vector2(2, 1);
     * const diff = a.subtract(b); // Vector2(3, 4)
     * ```
     */
    subtract(v: Vector2): Vector2;
    /**
     * Scales this vector by a scalar factor.
     *
     * @param s_factor - The scalar multiplier.
     * @returns A new Vector2 with components multiplied by the scalar.
     * @example
     * ```typescript
     * const v = new Vector2(2, 3);
     * const scaled = v.scale(2); // Vector2(4, 6)
     * ```
     */
    scale(s_factor: number): Vector2;
    /**
     * Compares vectors with tolerance for floating-point errors.
     *
     * @param other - The other vector.
     * @param epsilon - Tolerance (default `1e-9`).
     * @returns `true` if both components are within `epsilon`, otherwise `false`.
     * @example
     * ```typescript
     * const a = new Vector2(1, 1);
     * const b = new Vector2(1.0000000001, 1);
     * console.log(a.equals(b)); // true
     * ```
     */
    equals(other: Vector2, epsilon?: number): boolean;
    /**
     * Negates the vector (multiplies by -1).
     *
     * @returns A new Vector2 with both components negated.
     * @example
     * ```typescript
     * const v = new Vector2(3, -4);
     * const n = v.negate(); // Vector2(-3, 4)
     * ```
     */
    negate(): Vector2;
    /**
     * Truncates both components to their integer part (towards zero).
     *
     * @returns A new Vector2 with truncated components.
     * @example
     * ```typescript
     * const v = new Vector2(3.9, -2.9);
     * const t = v.truncate(); // Vector2(3, -2)
     * ```
     */
    truncate(): Vector2;
    /**
     * Clamps the vector components between min and max values.
     *
     * @param min - The minimum values of x and y, represented as a Vector2.
     * @param max - The maximum values of x and y, represented as a Vector2.
     * @returns A new Vector2 with each component clamped to `[min, max]`.
     * @example
     * ```typescript
     * const v = new Vector2(150, -20);
     * const clamped = v.clamp(new Vector2(0, 0), new Vector2(100, 100));
     * // Vector2(100, 0)
     * ```
     */
    clamp(min: Vector2, max: Vector2): Vector2;
    /**
     * Computes the component-wise product (Hadamard product).
     *
     * @param v - The other vector.
     * @returns A new Vector2 with components multiplied element-wise.
     * @example
     * ```typescript
     * const a = new Vector2(2, 3);
     * const b = new Vector2(4, 5);
     * const result = a.hadamar(b); // Vector2(8, 15)
     * ```
     */
    hadamar(v: Vector2): Vector2;
    /**
     * Computes the dot product (scalar product).
     *
     * @param v - The other vector.
     * @returns The dot product as a number.
     * @example
     * ```typescript
     * const a = new Vector2(1, 0);
     * const b = new Vector2(0, 1);
     * console.log(a.dot(b)); // 0 (perpendicular vectors)
     * ```
     */
    dot(v: Vector2): number;
    /**
     * Computes the Euclidean distance to another vector.
     *
     * @param v - The other vector.
     * @returns The distance as a number.
     * @example
     * ```typescript
     * const a = new Vector2(0, 0);
     * const b = new Vector2(3, 4);
     * console.log(a.distanceTo(b)); // 5
     * ```
     */
    distanceTo(v: Vector2): number;
    /**
     * Returns a normalized (unit) vector in the same direction.
     * If the vector is zero, returns a zero vector.
     *
     * @returns A new Vector2 with length 1, or a zero vector if length is 0.
     * @example
     * ```typescript
     * const v = new Vector2(3, 4);
     * const n = v.normalized(); // Vector2(0.6, 0.8), length 1
     * ```
     */
    normalized(): Vector2;
    /**
     * Creates a unit vector from an angle.
     *
     * @param radians - The angle in radians.
     * @returns A new Vector2 representing `(cos(angle), sin(angle))`.
     * @example
     * ```typescript
     * const right = Vector2.fromAngle(0); // Vector2(1, 0)
     * const up = Vector2.fromAngle(Math.PI / 2); // Vector2(~0, 1)
     * ```
     */
    static fromAngle(radians: number): Vector2;
}
//# sourceMappingURL=Vector2.d.ts.map