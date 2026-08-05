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
export class Matrix3 {
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
	constructor(
		public readonly m00: number,
		public readonly m01: number,
		public readonly m02: number,
		public readonly m10: number,
		public readonly m11: number,
		public readonly m12: number,
		public readonly m20: number,
		public readonly m21: number,
		public readonly m22: number,
	) {
		if (![m00, m01, m02, m10, m11, m12, m20, m21, m22].every(Number.isFinite)) {
			throw new Error("All Matrix3 values must be finite.");
		}
	}

	/**
	 * Returns the identity matrix.
	 *
	 * @returns A new Matrix3 with no translation, rotation, or scaling.
	 * @example
	 * ```typescript
	 * const identity = Matrix3.identity();
	 * ```
	 */
	static identity(): Matrix3 {
		return new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
	}

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
	static translation(tx: number, ty: number): Matrix3 {
		if (!Number.isFinite(tx) || !Number.isFinite(ty)) {
			throw new Error("tx and ty must be finite values");
		}
		return new Matrix3(1, 0, tx, 0, 1, ty, 0, 0, 1);
	}

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
	static rotation(angle: number, center?: Vector2): Matrix3 {
		if (!Number.isFinite(angle)) {
			throw new Error(`Angle must be finite: ${angle}`);
		}
		const cx = center?.x ?? 0;
		const cy = center?.y ?? 0;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		return new Matrix3(
			cos,
			-sin,
			cx - cx * cos + cy * sin,
			sin,
			cos,
			cy - cx * sin - cy * cos,
			0,
			0,
			1,
		);
	}

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
	static scaling(sx: number, sy?: number): Matrix3 {
		if (!Number.isFinite(sx)) throw new Error("sx must be finite");
		if (sy !== undefined && !Number.isFinite(sy))
			throw new Error("sy must be finite if provided");
		return new Matrix3(sx, 0, 0, 0, sy ?? sx, 0, 0, 0, 1);
	}

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
	public multiply(other: Matrix3): Matrix3 {
		const b = other;
		return new Matrix3(
			this.m00 * b.m00 + this.m01 * b.m10 + this.m02 * b.m20,
			this.m00 * b.m01 + this.m01 * b.m11 + this.m02 * b.m21,
			this.m00 * b.m02 + this.m01 * b.m12 + this.m02 * b.m22,
			this.m10 * b.m00 + this.m11 * b.m10 + this.m12 * b.m20,
			this.m10 * b.m01 + this.m11 * b.m11 + this.m12 * b.m21,
			this.m10 * b.m02 + this.m11 * b.m12 + this.m12 * b.m22,
			this.m20 * b.m00 + this.m21 * b.m10 + this.m22 * b.m20,
			this.m20 * b.m01 + this.m21 * b.m11 + this.m22 * b.m21,
			this.m20 * b.m02 + this.m21 * b.m12 + this.m22 * b.m22,
		);
	}

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
	public translate(dx: number, dy: number): Matrix3 {
		if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
			throw new Error("dx and dy must be finite");
		}
		return this.multiply(Matrix3.translation(dx, dy));
	}

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
	public rotate(angle: number): Matrix3 {
		if (!Number.isFinite(angle)) {
			throw new Error("angle must be finite");
		}
		return this.multiply(Matrix3.rotation(angle));
	}

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
	public scale(sx: number, sy?: number): Matrix3 {
		if (!Number.isFinite(sx)) throw new Error("sx must be finite");
		if (sy !== undefined && !Number.isFinite(sy)) {
			throw new Error("sy must be finite if provided");
		}
		return this.multiply(Matrix3.scaling(sx, sy));
	}

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
	public applyToVector(v: Vector2): Vector2 {
		const x = v.x;
		const y = v.y;
		const nx = this.m00 * x + this.m01 * y + this.m02;
		const ny = this.m10 * x + this.m11 * y + this.m12;
		return new Vector2(nx, ny);
	}

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
	public applyToDirection(v: Vector2): Vector2 {
		const x = v.x;
		const y = v.y;
		const nx = this.m00 * x + this.m01 * y;
		const ny = this.m10 * x + this.m11 * y;
		return new Vector2(nx, ny);
	}

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
	public toCanvasTransform(): [number, number, number, number, number, number] {
		return [
			this.m00, // a (scale x)
			this.m10, // b (skew y)
			this.m01, // c (skew x)
			this.m11, // d (scale y)
			this.m02, // e (translate x)
			this.m12, // f (translate y)
		];
	}

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
	public invert(): Matrix3 | null {
		const a = this.m00,
			b = this.m01,
			c = this.m02;
		const d = this.m10,
			e = this.m11,
			f = this.m12;
		const g = this.m20,
			h = this.m21,
			i = this.m22;

		const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
		if (Math.abs(det) < 1e-12) return null;

		const invDet = 1 / det;
		return new Matrix3(
			(e * i - f * h) * invDet,
			(c * h - b * i) * invDet,
			(b * f - c * e) * invDet,
			(f * g - d * i) * invDet,
			(a * i - c * g) * invDet,
			(c * d - a * f) * invDet,
			(d * h - e * g) * invDet,
			(b * g - a * h) * invDet,
			(a * e - b * d) * invDet,
		);
	}

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
	public equals(other: Matrix3, epsilon: number = 1e-9): boolean {
		if (!(other instanceof Matrix3)) return false;
		return (
			Math.abs(this.m00 - other.m00) < epsilon &&
			Math.abs(this.m01 - other.m01) < epsilon &&
			Math.abs(this.m02 - other.m02) < epsilon &&
			Math.abs(this.m10 - other.m10) < epsilon &&
			Math.abs(this.m11 - other.m11) < epsilon &&
			Math.abs(this.m12 - other.m12) < epsilon &&
			Math.abs(this.m20 - other.m20) < epsilon &&
			Math.abs(this.m21 - other.m21) < epsilon &&
			Math.abs(this.m22 - other.m22) < epsilon
		);
	}

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
	public clone(): Matrix3 {
		return new Matrix3(
			this.m00,
			this.m01,
			this.m02,
			this.m10,
			this.m11,
			this.m12,
			this.m20,
			this.m21,
			this.m22,
		);
	}

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
	public toArray(): number[] {
		return [
			this.m00,
			this.m01,
			this.m02,
			this.m10,
			this.m11,
			this.m12,
			this.m20,
			this.m21,
			this.m22,
		];
	}

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
	public toString(): string {
		return `Matrix3(${this.m00}, ${this.m01}, ${this.m02}, ${this.m10}, ${this.m11}, ${this.m12}, ${this.m20}, ${this.m21}, ${this.m22})`;
	}
}
