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
export class Vector2 {
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
  constructor(
    public x: number,
    public y: number,
  ) {
    if (!Number.isFinite(x)) throw new Error(`x must be finite: ${x}`);
    if (!Number.isFinite(y)) throw new Error(`y must be finite: ${y}`);
  }
  /**
   * @returns new Vector(0, 0)
   */
  static readonly zero = new Vector2(0, 0);
  /**
   * @returns new Vector(1, 1)
   */
  static readonly one = new Vector2(1, 1);
  /**
   * @returns new Vector(1, 0)
   */
  static readonly right = new Vector2(1, 0);
  /**
   * @returns new Vector(0, 1)
   */
  static readonly up = new Vector2(0, 1);
  /**
   * The Euclidean length (magnitude) of the vector.
   *
   * @example
   * ```typescript
   * const v = new Vector2(3, 4);
   * console.log(v.length); // 5
   * ```
   */
  public get length(): number {
    return Math.hypot(this.x, this.y);
  }

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
  public lerp(other: Vector2, t: number): Vector2 {
    if (t < 0 || t > 1) throw new Error("t must be between 0 and 1");
    return new Vector2(
      this.x + (other.x - this.x) * t,
      this.y + (other.y - this.y) * t,
    );
  }

  /**
   * The angle (direction) of this vector in radians.
   *
   * @example
   * ```typescript
   * const v = new Vector2(1, 0);
   * console.log(v.angle); // 0
   * ```
   */
  public get angle(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   * The squared Euclidean length. Faster than `length` for comparisons.
   *
   * @example
   * ```typescript
   * const v = new Vector2(3, 4);
   * console.log(v.lengthSq); // 25
   * ```
   */
  public get lengthSq(): number {
    return this.x * this.x + this.y * this.y;
  }

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
  public toString(): string {
    return `Vector2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }

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
  public getAngle(v: Vector2): number {
    return Math.atan2(v.y - this.y, v.x - this.x);
  }
  /**
   * Computes the signed angle from this vector to another vector.
   * The result is in radians and lies in [-π, π].
   * Positive values indicate a counter‑clockwise rotation.
   *
   * @param v - The target vector.
   * @returns The angle in radians from `this` to `v`.
   * @example
   * ```typescript
   * const a = new Vector2(1, 0);
   * const b = new Vector2(0, 1);
   * console.log(a.angleTo(b)); // π/2 (≈1.5708)
   * ```
   */
  public angleTo(v: Vector2): number {
    const dot = this.dot(v);
    const cross = this.cross(v);
    return Math.atan2(cross, dot);
  }
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
  public add(v: Vector2): Vector2 {
    return new Vector2(v.x + this.x, v.y + this.y);
  }
  /**
   * Translates (moves) this vector by the given deltas.
   * Semantic alias for adding a displacement vector.
   *
   * @param dx - The amount to add to the x-coordinate.
   * @param dy - The amount to add to the y-coordinate.
   * @returns A new Vector2 representing the translated position.
   * @example
   * ```typescript
   * const pos = new Vector2(10, 5);
   * const moved = pos.translate(3, -2); // Vector2(13, 3)
   * ```
   */
  public translate(dx: number, dy: number): Vector2 {
    return new Vector2(this.x + dx, this.y + dy);
  }
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
  public subtract(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

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
  public scale(s_factor: number): Vector2 {
    return new Vector2(this.x * s_factor, this.y * s_factor);
  }
  /**
   * Rotates this vector counter-clockwise by a given angle (in radians).
   *
   * @param angle - The rotation angle in radians.
   * @returns A new Vector2 representing the rotated vector.
   * @example
   * ```typescript
   * const v = new Vector2(1, 0);
   * const rotated = v.rotate(Math.PI / 2); // Vector2(~0, 1)
   * ```
   */
  public rotate(angle: number): Vector2 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vector2(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos,
    );
  }
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
  public equals(other: Vector2, epsilon: number = 1e-9): boolean {
    if (!(other instanceof Vector2)) return false;
    return (
      Math.abs(this.x - other.x) < epsilon &&
      Math.abs(this.y - other.y) < epsilon
    );
  }

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
  public negate(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

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
  public truncate(): Vector2 {
    return new Vector2(Math.trunc(this.x), Math.trunc(this.y));
  }

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
  public clamp(min: Vector2, max: Vector2): Vector2 {
    return new Vector2(
      Math.max(min.x, Math.min(max.x, this.x)),
      Math.max(min.y, Math.min(max.y, this.y)),
    );
  }
  /**
   * Clamps the vector's magnitude to the range [min, max] without changing its direction.
   * If the vector is zero, returns a zero vector.
   *
   * @param min - Minimum allowed length (must be ≥ 0).
   * @param max - Maximum allowed length (must be ≥ min).
   * @returns A new Vector2 with length clamped to [min, max].
   * @throws If `min` < 0 or `max` < min.
   * @example
   * ```typescript
   * const v = new Vector2(10, 0);
   * const clamped = v.clampLength(1, 5); // Vector2(5, 0)
   * ```
   */
  public clampLength(min: number, max: number): Vector2 {
    if (min < 0) throw new Error(`min must be >= 0, got ${min}`);
    if (max < min) throw new Error(`max must be >= min, got ${max} < ${min}`);

    const len = this.length;
    if (len === 0) return Vector2.zero;

    const clamped = Math.min(Math.max(len, min), max);
    const scale = clamped / len;
    return new Vector2(this.x * scale, this.y * scale);
  }
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
  public hadamar(v: Vector2): Vector2 {
    return new Vector2(this.x * v.x, this.y * v.y);
  }

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
  public dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }
  /**
   * Computes the 2D cross product (scalar) of this vector and another.
   * In 2D, cross product is defined as: this.x * v.y - this.y * v.x.
   * It represents the signed area of the parallelogram formed by the two vectors,
   * and is positive if `v` is counter‑clockwise from `this`.
   *
   * @param v - The other vector.
   * @returns The scalar cross product.
   * @example
   * ```typescript
   * const a = new Vector2(1, 0);
   * const b = new Vector2(0, 1);
   * console.log(a.cross(b)); // 1 (positive: b is CCW from a)
   *
   * const c = new Vector2(1, 1);
   * const d = new Vector2(2, 2);
   * console.log(c.cross(d)); // 0 (collinear vectors)
   * ```
   */
  public cross(v: Vector2): number {
    return this.x * v.y - this.y * v.x;
  }
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
  public distanceTo(v: Vector2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.hypot(dx, dy);
  }

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
  public normalized(): Vector2 {
    const length: number = this.length;
    if (length === 0) return new Vector2(0, 0);
    return new Vector2(this.x / length, this.y / length);
  }
  /**
   * Returns a new vector with the same direction but a different length.
   * If the vector is zero, returns a zero vector regardless of `newLength`.
   * @param newLength - The desired magnitude.
   * @returns A new Vector2 with the specified length.
   * @example
   * ```typescript
   * const v = new Vector2(3, 4);
   * const u = v.withLength(10); // Vector2(6, 8) – length = 10
   * ```
   */
  public withLength(newLength: number): Vector2 {
    const len = this.length;
    if (len === 0) return Vector2.zero; // ou new Vector2(0,0)
    const scale = newLength / len;
    return new Vector2(this.x * scale, this.y * scale);
  }
  /**
   * Returns a new vector with the x-coordinate replaced by `newX`.
   * The y-coordinate remains unchanged.
   *
   * @param newX - The new x value.
   * @returns A new Vector2 with the updated x.
   * @example
   * ```typescript
   * const v = new Vector2(3, 4);
   * const u = v.withX(10); // Vector2(10, 4)
   * ```
   */
  public withX(newX: number): Vector2 {
    return new Vector2(newX, this.y);
  }

  /**
   * Returns a new vector with the y-coordinate replaced by `newY`.
   * The x-coordinate remains unchanged.
   *
   * @param newY - The new y value.
   * @returns A new Vector2 with the updated y.
   * @example
   * ```typescript
   * const v = new Vector2(3, 4);
   * const u = v.withY(10); // Vector2(3, 10)
   * ```
   */
  public withY(newY: number): Vector2 {
    return new Vector2(this.x, newY);
  }
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
  static fromAngle(radians: number): Vector2 {
    return new Vector2(Math.cos(radians), Math.sin(radians));
  }
  /**
   * Creates a vector from polar coordinates (angle and length).
   * @param angle - Direction in radians.
   * @param length - Magnitude (default 1).
   * @returns A new Vector2 with the given direction and length.
   * @example
   * ```typescript
   * const v = Vector2.fromPolar(Math.PI / 4, 5); // Vector2(3.5355, 3.5355)
   * ```
   */
  static fromPolar(angle: number, length: number = 1): Vector2 {
    return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
  }
}
