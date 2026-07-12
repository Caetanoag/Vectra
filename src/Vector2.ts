/**
 * Represents a 2D vector with x and y components.
 * All operations are immutable, returning new Vector2 instances.
 */
export class Vector2 {
	constructor(
		/** The x-coordinate. Must be finite. */
		public x: number,
		/** The y-coordinate. Must be finite. */
		public y: number,
	) {
		if (!Number.isFinite(x)) throw new Error(`x must be finite: ${x}`);
		if (!Number.isFinite(y)) throw new Error(`y must be finite: ${y}`);
	}

	/** The Euclidean length (magnitude) of the vector. */
	public get length(): number {
		return Math.hypot(this.x, this.y);
	}

	/** The squared Euclidean length. Faster than `length` for comparisons. */
	public get lengthSq(): number {
		return this.x * this.x + this.y * this.y;
	}

	/** Returns a string representation with two decimal places. */
	public toString(): string {
		return `Vector2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
	}
	/**
	 * Returns the angle in radians from this vector to another vector.
	 * @param v
	 * @returns
	 */
	public getAngle(v: Vector2): number {
		return Math.atan2(v.y - this.y, v.x - this.x);
	}
	/**
	 * Adds another vector to this one.
	 * @param v - The vector to add.
	 * @returns A new Vector2 with the sum of both vectors.
	 */
	public add(v: Vector2): Vector2 {
		return new Vector2(v.x + this.x, v.y + this.y);
	}

	/**
	 * Subtracts another vector from this one.
	 * @param v - The vector to subtract.
	 * @returns A new Vector2 representing this - v.
	 */
	public subtract(v: Vector2): Vector2 {
		return new Vector2(this.x - v.x, this.y - v.y);
	}

	/**
	 * Scales this vector by a scalar factor.
	 * @param s_factor - The scalar multiplier.
	 * @returns A new Vector2 with components multiplied by the scalar.
	 */
	public scale(s_factor: number): Vector2 {
		return new Vector2(this.x * s_factor, this.y * s_factor);
	}

	/**
	 * Negates the vector (multiplies by -1).
	 * @returns A new Vector2 with both components negated.
	 */
	public negate(): Vector2 {
		return new Vector2(-this.x, -this.y);
	}

	/**
	 * Computes the component-wise product (Hadamard product).
	 * @param v - The other vector.
	 * @returns A new Vector2 with components multiplied element-wise.
	 */
	public hadamar(v: Vector2): Vector2 {
		return new Vector2(this.x * v.x, this.y * v.y);
	}

	/**
	 * Computes the dot product (scalar product).
	 * @param v - The other vector.
	 * @returns The dot product as a number.
	 */
	public dot(v: Vector2): number {
		return this.x * v.x + this.y * v.y;
	}

	/**
	 * Computes the Euclidean distance to another vector.
	 * @param v - The other vector.
	 * @returns The distance as a number.
	 */
	public distanceTo(v: Vector2): number {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		return Math.hypot(dx, dy);
	}

	/**
	 * Returns a normalized (unit) vector in the same direction.
	 * If the vector is zero, returns a zero vector.
	 * @returns A new Vector2 with length 1, or zero vector if length is 0.
	 */
	public normalized(): Vector2 {
		const length: number = this.length;
		if (length === 0) return new Vector2(0, 0);
		return new Vector2(this.x / length, this.y / length);
	}

	/**
	 * Creates a unit vector from an angle.
	 * @param radians - The angle in radians.
	 * @returns A new Vector2 representing (cos(angle), sin(angle)).
	 */
	static fromAngle(radians: number): Vector2 {
		return new Vector2(Math.cos(radians), Math.sin(radians));
	}
}
