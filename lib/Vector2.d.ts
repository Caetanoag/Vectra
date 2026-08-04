/**
 * Represents a 2D vector with x and y components.
 * All operations are immutable, returning new Vector2 instances.
 */
export declare class Vector2 {
    /** The x-coordinate. Must be finite. */
    x: number;
    /** The y-coordinate. Must be finite. */
    y: number;
    constructor(
    /** The x-coordinate. Must be finite. */
    x: number, 
    /** The y-coordinate. Must be finite. */
    y: number);
    /** The Euclidean length (magnitude) of the vector. */
    get length(): number;
    /** Linear interpolation between this vector and another. */
    lerp(other: Vector2, t: number): Vector2;
    /** The angle (direction) of this vector in radians. */
    get angle(): number;
    /** The squared Euclidean length. Faster than `length` for comparisons. */
    get lengthSq(): number;
    /** Returns a string representation with two decimal places. */
    toString(): string;
    /**
     * Returns the angle in radians from this vector to another vector.
     * @param v
     * @returns
     */
    getAngle(v: Vector2): number;
    /**
     * Adds another vector to this one.
     * @param v - The vector to add.
     * @returns A new Vector2 with the sum of both vectors.
     */
    add(v: Vector2): Vector2;
    /**
     * Subtracts another vector from this one.
     * @param v - The vector to subtract.
     * @returns A new Vector2 representing this - v.
     */
    subtract(v: Vector2): Vector2;
    /**
     * Scales this vector by a scalar factor.
     * @param s_factor - The scalar multiplier.
     * @returns A new Vector2 with components multiplied by the scalar.
     */
    scale(s_factor: number): Vector2;
    /** Compares vectors with tolerance. */
    equals(other: Vector2, epsilon?: number): boolean;
    /**
     * Negates the vector (multiplies by -1).
     * @returns A new Vector2 with both components negated.
     */
    negate(): Vector2;
    truncate(): Vector2;
    /**
     *  Clamps the vector components between min and max values.
     * @param min - The min values to x and y, represented by a Vector2 instance
     * @param max - The max values of x and y, represented by a Vector2 instance
     */
    clamp(min: Vector2, max: Vector2): Vector2;
    /**
     * Computes the component-wise product (Hadamard product).
     * @param v - The other vector.
     * @returns A new Vector2 with components multiplied element-wise.
     */
    hadamar(v: Vector2): Vector2;
    /**
     * Computes the dot product (scalar product).
     * @param v - The other vector.
     * @returns The dot product as a number.
     */
    dot(v: Vector2): number;
    /**
     * Computes the Euclidean distance to another vector.
     * @param v - The other vector.
     * @returns The distance as a number.
     */
    distanceTo(v: Vector2): number;
    /**
     * Returns a normalized (unit) vector in the same direction.
     * If the vector is zero, returns a zero vector.
     * @returns A new Vector2 with length 1, or zero vector if length is 0.
     */
    normalized(): Vector2;
    /**
     * Creates a unit vector from an angle.
     * @param radians - The angle in radians.
     * @returns A new Vector2 representing (cos(angle), sin(angle)).
     */
    static fromAngle(radians: number): Vector2;
}
//# sourceMappingURL=Vector2.d.ts.map