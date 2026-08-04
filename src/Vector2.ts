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
  /** Linear interpolation between this vector and another. */
  public lerp(other: Vector2, t: number): Vector2 {
    if (t < 0 || t > 1) throw new Error("t must be between 0 and 1");
    return new Vector2(
      this.x + (other.x - this.x) * t,
      this.y + (other.y - this.y) * t,
    );
  }
  /** The angle (direction) of this vector in radians. */
  public get angle(): number {
    return Math.atan2(this.y, this.x);
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
  /** Compares vectors with tolerance. */
  public equals(other: Vector2, epsilon: number = 1e-9): boolean {
    if (!(other instanceof Vector2)) return false;
    return (
      Math.abs(this.x - other.x) < epsilon &&
      Math.abs(this.y - other.y) < epsilon
    );
  }
  /**
   * Negates the vector (multiplies by -1).
   * @returns A new Vector2 with both components negated.
   */
  public negate(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }
  public truncate(): Vector2 {
    return new Vector2(Math.trunc(this.x), Math.trunc(this.y));
  }
  /**
   *  Clamps the vector components between min and max values.
   * @param min - The min values to x and y, represented by a Vector2 instance
   * @param max - The max values of x and y, represented by a Vector2 instance
   */
  public clamp(min: Vector2, max: Vector2): Vector2 {
    return new Vector2(
      Math.max(min.x, Math.min(max.x, this.x)),
      Math.max(min.y, Math.min(max.y, this.y)),
    );
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
