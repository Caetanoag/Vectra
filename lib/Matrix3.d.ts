import { Vector2 } from "./Vector2.js";
/**
 * Represents a 3x3 matrix for 2D affine transformations.
 * Immutable: all operations return new Matrix3 instances.
 * Row-major storage: `[m00, m01, m02; m10, m11, m12; m20, m21, m22]`.
 *
 * @example
 * ```typescript
 * const m = Matrix3.identity().translate(10, 20).rotate(Math.PI / 4);
 * const p = m.applyToVector(new Vector2(0, 0));
 * ```
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
    /**
     * Creates a new Matrix3 from its nine components.
     *
     * @param m00 - Row 0, column 0.
     * @param m01 - Row 0, column 1.
     * @param m02 - Row 0, column 2.
     * @param m10 - Row 1, column 0.
     * @param m11 - Row 1, column 1.
     * @param m12 - Row 1, column 2.
     * @param m20 - Row 2, column 0.
     * @param m21 - Row 2, column 1.
     * @param m22 - Row 2, column 2.
     * @throws If any component is not a finite number.
     * @example
     * ```typescript
     * const m = new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1); // identity
     * ```
     */
    constructor(m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number);
    /**
     * Returns the identity matrix.
     *
     * @returns A new Matrix3 with no translation, rotation, or scaling.
     * @example
     * ```typescript
     * const identity = Matrix3.identity();
     * ```
     */
    static identity(): Matrix3;
    /**
     * Creates a translation matrix.
     *
     * @param tx - X translation.
     * @param ty - Y translation.
     * @returns A new Matrix3 for translation.
     * @throws If `tx` or `ty` is not finite.
     * @example
     * ```typescript
     * const m = Matrix3.translation(100, 50);
     * ```
     */
    static translation(tx: number, ty: number): Matrix3;
    /**
     * Creates a rotation matrix.
     *
     * @param angle - Rotation angle in radians (counter-clockwise).
     * @param center - Optional center point; defaults to origin (0,0).
     * @returns A new Matrix3 for rotation.
     * @throws If `angle` is not finite.
     * @example
     * ```typescript
     * const m = Matrix3.rotation(Math.PI / 2); // rotate 90° around origin
     * const m2 = Matrix3.rotation(Math.PI / 2, new Vector2(50, 50)); // around a point
     * ```
     */
    static rotation(angle: number, center?: Vector2): Matrix3;
    /**
     * Creates a scaling matrix.
     *
     * @param sx - X scale factor.
     * @param sy - Y scale factor (optional, defaults to `sx` for uniform scaling).
     * @returns A new Matrix3 for scaling.
     * @throws If `sx` or `sy` is not finite.
     * @example
     * ```typescript
     * const uniform = Matrix3.scaling(2); // scales x and y by 2
     * const nonUniform = Matrix3.scaling(2, 0.5);
     * ```
     */
    static scaling(sx: number, sy?: number): Matrix3;
    /**
     * Multiplies this matrix by another: `this * other`.
     *
     * @param other - The matrix to multiply by.
     * @returns A new Matrix3 representing the composition.
     * @example
     * ```typescript
     * const translated = Matrix3.translation(10, 0);
     * const rotated = Matrix3.rotation(Math.PI / 4);
     * const combined = translated.multiply(rotated);
     * ```
     */
    multiply(other: Matrix3): Matrix3;
    /**
     * Translates this matrix: `this * translation(dx, dy)`.
     *
     * @param dx - X translation.
     * @param dy - Y translation.
     * @returns A new Matrix3 with translation applied after this matrix.
     * @throws If `dx` or `dy` is not finite.
     * @example
     * ```typescript
     * const m = Matrix3.identity().translate(10, 20);
     * ```
     */
    translate(dx: number, dy: number): Matrix3;
    /**
     * Rotates this matrix: `this * rotation(angle)`.
     *
     * @param angle - Rotation angle in radians.
     * @returns A new Matrix3 with rotation applied after this matrix.
     * @throws If `angle` is not finite.
     * @example
     * ```typescript
     * const m = Matrix3.identity().rotate(Math.PI / 2);
     * ```
     */
    rotate(angle: number): Matrix3;
    /**
     * Scales this matrix: `this * scaling(sx, sy)`.
     *
     * @param sx - X scale factor.
     * @param sy - Y scale factor (optional).
     * @returns A new Matrix3 with scaling applied after this matrix.
     * @throws If `sx` or `sy` is not finite.
     * @example
     * ```typescript
     * const m = Matrix3.identity().scale(2, 2);
     * ```
     */
    scale(sx: number, sy?: number): Matrix3;
    /**
     * Applies the transformation to a 2D point.
     *
     * @param v - The vector to transform.
     * @returns A new Vector2 representing the transformed point.
     * @example
     * ```typescript
     * const m = Matrix3.translation(10, 0);
     * const p = m.applyToVector(new Vector2(0, 0)); // Vector2(10, 0)
     * ```
     */
    applyToVector(v: Vector2): Vector2;
    /**
     * Applies the transformation to a direction vector (ignores translation).
     *
     * @param v - The direction vector.
     * @returns A new Vector2 representing the transformed direction.
     * @example
     * ```typescript
     * const m = Matrix3.translation(100, 100).rotate(Math.PI / 2);
     * const dir = m.applyToDirection(new Vector2(1, 0)); // rotated, but not translated
     * ```
     */
    applyToDirection(v: Vector2): Vector2;
    /**
     * Converts the matrix to the format used by CanvasRenderingContext2D.
     * Returns `[a, b, c, d, e, f]` for `setTransform(a, b, c, d, e, f)`.
     * Assumes the last row is `[0, 0, 1]`.
     *
     * @returns A 6-element tuple compatible with the Canvas 2D API.
     * @example
     * ```typescript
     * const m = Matrix3.translation(10, 20);
     * const [a, b, c, d, e, f] = m.toCanvasTransform();
     * ctx.setTransform(a, b, c, d, e, f);
     * ```
     */
    toCanvasTransform(): [number, number, number, number, number, number];
    /**
     * Inverts the matrix.
     *
     * @returns A new Matrix3 representing the inverse, or `null` if not invertible.
     * @example
     * ```typescript
     * const m = Matrix3.translation(10, 20);
     * const inverse = m.invert();
     * if (inverse) {
     *     const back = inverse.applyToVector(new Vector2(10, 20)); // Vector2(0, 0)
     * }
     * ```
     */
    invert(): Matrix3 | null;
    /**
     * Compares two matrices with tolerance.
     *
     * @param other - The other matrix.
     * @param epsilon - Tolerance (default `1e-9`).
     * @returns `true` if all components are within `epsilon`.
     * @example
     * ```typescript
     * const a = Matrix3.identity();
     * const b = Matrix3.identity();
     * console.log(a.equals(b)); // true
     * ```
     */
    equals(other: Matrix3, epsilon?: number): boolean;
    /**
     * Creates a deep copy of the matrix.
     *
     * @returns A new Matrix3 with the same components.
     * @example
     * ```typescript
     * const original = Matrix3.identity();
     * const copy = original.clone();
     * ```
     */
    clone(): Matrix3;
    /**
     * Returns the matrix as a flat array in row-major order.
     *
     * @returns A 9-element array: `[m00, m01, m02, m10, m11, m12, m20, m21, m22]`.
     * @example
     * ```typescript
     * const arr = Matrix3.identity().toArray();
     * // [1, 0, 0, 0, 1, 0, 0, 0, 1]
     * ```
     */
    toArray(): number[];
    /**
     * Returns a string representation of the matrix.
     *
     * @returns A human-readable string listing all nine components.
     * @example
     * ```typescript
     * console.log(Matrix3.identity().toString());
     * // "Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1)"
     * ```
     */
    toString(): string;
}
//# sourceMappingURL=Matrix3.d.ts.map