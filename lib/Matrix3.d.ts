import { Vector2 } from "./Vector2.js";
/**
 * Represents a 3x3 matrix for 2D affine transformations.
 * Immutable: all operations return new Matrix3 instances.
 * Row-major storage: `[m00, m01, m02; m10, m11, m12; m20, m21, m22]`.
 */
export declare class Matrix3 {
    readonly m00: number;
    readonly m01: number;
    readonly m02: number;
    readonly m10: number;
    readonly m11: number;
    readonly m12: number;
    readonly m20: number;
    readonly m21: number;
    readonly m22: number;
    constructor(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number);
    /** Returns the identity matrix. */
    static identity(): Matrix3;
    /**
     * Creates a translation matrix.
     * @param tx - X translation.
     * @param ty - Y translation.
     * @returns A new Matrix3 for translation.
     */
    static translation(tx: number, ty: number): Matrix3;
    /**
     * Creates a rotation matrix.
     * @param angle - Rotation angle in radians (counter-clockwise).
     * @param center - Optional center point; defaults to origin (0,0).
     * @returns A new Matrix3 for rotation.
     */
    static rotation(angle: number, center?: Vector2): Matrix3;
    /**
     * Creates a scaling matrix.
     * @param sx - X scale factor.
     * @param sy - Y scale factor (optional, defaults to sx for uniform scaling).
     * @returns A new Matrix3 for scaling.
     */
    static scaling(sx: number, sy?: number): Matrix3;
    /**
     * Multiplies this matrix by another: `this * other`.
     * @param other - The matrix to multiply by.
     * @returns A new Matrix3 representing the composition.
     */
    multiply(other: Matrix3): Matrix3;
    /**
     * Translates this matrix: `this * translation(dx, dy)`.
     * @param dx - X translation.
     * @param dy - Y translation.
     * @returns A new Matrix3 with translation applied after this matrix.
     */
    translate(dx: number, dy: number): Matrix3;
    /**
     * Rotates this matrix: `this * rotation(angle)`.
     * @param angle - Rotation angle in radians.
     * @returns A new Matrix3 with rotation applied after this matrix.
     */
    rotate(angle: number): Matrix3;
    /**
     * Scales this matrix: `this * scaling(sx, sy)`.
     * @param sx - X scale factor.
     * @param sy - Y scale factor (optional).
     * @returns A new Matrix3 with scaling applied after this matrix.
     */
    scale(sx: number, sy?: number): Matrix3;
    /**
     * Applies the transformation to a 2D point.
     * @param v - The vector to transform.
     * @returns A new Vector2 representing the transformed point.
     */
    applyToVector(v: Vector2): Vector2;
    /**
     * Applies the transformation to a direction vector (ignores translation).
     * @param v - The direction vector.
     * @returns A new Vector2 representing the transformed direction.
     */
    applyToDirection(v: Vector2): Vector2;
    /**
     * Converts the matrix to the format used by CanvasRenderingContext2D.
     * Returns `[a, b, c, d, e, f]` for `setTransform(a, b, c, d, e, f)`.
     * Assumes the last row is `[0, 0, 1]`.
     */
    toCanvasTransform(): [number, number, number, number, number, number];
    /**
     * Inverts the matrix.
     * @returns A new Matrix3 representing the inverse, or `null` if not invertible.
     */
    invert(): Matrix3 | null;
    /**
     * Compares two matrices with tolerance.
     * @param other - The other matrix.
     * @param epsilon - Tolerance (default 1e-9).
     * @returns True if all components are within epsilon.
     */
    equals(other: Matrix3, epsilon?: number): boolean;
    /** Creates a deep copy of the matrix. */
    clone(): Matrix3;
    /** Returns the matrix as a flat array in row-major order. */
    toArray(): number[];
    /** Returns a string representation of the matrix. */
    toString(): string;
}
//# sourceMappingURL=Matrix3.d.ts.map