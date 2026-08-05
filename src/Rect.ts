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
export class Rect {
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
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
  ) {
    this.validate();
    this.normalize();
  }

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
  public setWidth(w: number) {
    this.width = w;
    this.validate();
    this.normalize();
    return this;
  }

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
  public setHeight(h: number) {
    this.height = h;
    this.validate();
    this.normalize();
    return this;
  }

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
  public moveTo(x: number, y: number): Rect {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new Error(`Invalid coordinates: (${x}, ${y})`);
    }
    this.x = x;
    this.y = y;
    this.validate();
    return this;
  }

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
  public setPosition(v: Vector2): Rect {
    if (!Number.isFinite(v.x) || !Number.isFinite(v.y)) {
      throw new Error(`Invalid vector: ${v}`);
    }
    this.x = v.x;
    this.y = v.y;
    this.validate();
    return this;
  }

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
  public setSize(v: Vector2): Rect {
    this.width = v.x;
    this.height = v.y;
    this.validate();
    this.normalize();
    return this;
  }

  /**
   * Returns the position as a Vector2.
   *
   * @example
   * ```typescript
   * const rect = new Rect(10, 20, 100, 50);
   * console.log(rect.position); // Vector2(10, 20)
   * ```
   */
  public get position(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * Returns the area (width × height).
   *
   * @example
   * ```typescript
   * const rect = new Rect(0, 0, 10, 5);
   * console.log(rect.area); // 50
   * ```
   */
  public get area(): number {
    return this.width * this.height;
  }

  /**
   * Returns the y-coordinate of the top edge.
   *
   * @example
   * ```typescript
   * const rect = new Rect(0, 10, 100, 50);
   * console.log(rect.top); // 10
   * ```
   */
  public get top(): number {
    return this.y;
  }

  /**
   * Returns the x-coordinate of the left edge.
   *
   * @example
   * ```typescript
   * const rect = new Rect(10, 0, 100, 50);
   * console.log(rect.left); // 10
   * ```
   */
  public get left(): number {
    return this.x;
  }

  /**
   * Returns the y-coordinate of the bottom edge.
   *
   * @example
   * ```typescript
   * const rect = new Rect(0, 10, 100, 50);
   * console.log(rect.bottom); // 60
   * ```
   */
  public get bottom(): number {
    return this.y + this.height;
  }

  /**
   * Returns the x-coordinate of the right edge.
   *
   * @example
   * ```typescript
   * const rect = new Rect(10, 0, 100, 50);
   * console.log(rect.right); // 110
   * ```
   */
  public get right(): number {
    return this.x + this.width;
  }

  /**
   * Returns the center point as a Vector2.
   *
   * @example
   * ```typescript
   * const rect = new Rect(0, 0, 100, 50);
   * console.log(rect.center); // Vector2(50, 25)
   * ```
   */
  public get center(): Vector2 {
    return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
  }

  /**
   * Returns the size (width, height) as a Vector2.
   *
   * @example
   * ```typescript
   * const rect = new Rect(0, 0, 100, 50);
   * console.log(rect.size); // Vector2(100, 50)
   * ```
   */
  public get size(): Vector2 {
    return new Vector2(this.width, this.height);
  }

  /**
   * Returns the aspect ratio (width / height).
   *
   * @example
   * ```typescript
   * const rect = new Rect(0, 0, 200, 100);
   * console.log(rect.aspectRatio); // 2
   * ```
   */
  public get aspectRatio(): number {
    return this.width / this.height;
  }

  /**
   * Returns the width.
   *
   * @example
   * ```typescript
   * const rect = new Rect(0, 0, 100, 50);
   * console.log(rect.getWidth()); // 100
   * ```
   */
  public getWidth(): number {
    return this.width;
  }

  /**
   * Returns the height.
   *
   * @example
   * ```typescript
   * const rect = new Rect(0, 0, 100, 50);
   * console.log(rect.getHeight()); // 50
   * ```
   */
  public getHeight(): number {
    return this.height;
  }

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
  public contains(point: Vector2): boolean {
    const x = point.x;
    const y = point.y;
    return (
      x >= this.left && x <= this.right && y <= this.bottom && y >= this.top
    );
  }

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
  public containsBox(box: Rect): boolean {
    return (
      this.left <= box.left &&
      this.right >= box.right &&
      this.top <= box.top &&
      this.bottom >= box.bottom
    );
  }

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
  public intersects(box: Rect): boolean {
    return (
      this.left <= box.right &&
      box.left <= this.right &&
      this.top <= box.bottom &&
      box.top <= this.bottom
    );
  }

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
  public translate(dx: number, dy: number): Rect {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
      throw new Error(`Invalid delta: (${dx}, ${dy})`);
    }
    this.x += dx;
    this.y += dy;
    return this;
  }

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
  public resize(dx: number, dy: number): Rect {
    this.width += dx;
    this.height += dy;
    this.validate();
    this.normalize();
    return this;
  }

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
  public inflate(dx: number, dy: number): Rect {
    this.x -= dx;
    this.y -= dy;
    this.width += 2 * dx;
    this.height += 2 * dy;
    this.validate();
    this.normalize();
    return this;
  }

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
  public round(): this {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  }

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
  public scale(sx: number, sy: number): this {
    this.width *= sx;
    this.height *= sy;
    return this;
  }

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
  public scaleFromCenter(sx: number, sy: number): this {
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;
    this.width *= sx;
    this.height *= sy;
    this.x = cx - this.width / 2;
    this.y = cy - this.height / 2;
    return this;
  }

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
  public union(box: Rect): Rect {
    const top = Math.min(this.top, box.top);
    const bottom = Math.max(this.bottom, box.bottom);
    const left = Math.min(this.left, box.left);
    const right = Math.max(this.right, box.right);
    return new Rect(left, top, right - left, bottom - top);
  }

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
  public intersection(box: Rect): Rect | undefined {
    const top = Math.max(this.top, box.top);
    const bottom = Math.min(this.bottom, box.bottom);
    const left = Math.max(this.left, box.left);
    const right = Math.min(this.right, box.right);
    if (left > right || top > bottom) return undefined;
    return new Rect(left, top, right - left, bottom - top);
  }

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
  public clone(): Rect {
    return new Rect(this.x, this.y, this.width, this.height);
  }

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
  public isEmpty(): boolean {
    return this.width === 0 || this.height === 0;
  }

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
  public distanceSquaredToPoint(point: Vector2): number {
    const dx = Math.max(this.left - point.x, 0, point.x - this.right);
    const dy = Math.max(this.top - point.y, 0, point.y - this.bottom);
    return dx * dx + dy * dy;
  }

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
  public distanceToPoint(point: Vector2): number {
    return Math.sqrt(this.distanceSquaredToPoint(point));
  }

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
  public equals(box: Rect): boolean {
    return (
      this.x === box.x &&
      this.y === box.y &&
      this.width === box.width &&
      this.height === box.height
    );
  }

  /**
   * Normalizes the rectangle: if width or height is negative, swaps coordinates.
   * @private
   */
  private normalize(): void {
    if (this.width < 0) {
      this.x += this.width;
      this.width *= -1;
    }
    if (this.height < 0) {
      this.y += this.height;
      this.height *= -1;
    }
  }

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
  public clampPoint(point: Vector2): Vector2 {
    return point.clamp(
      new Vector2(this.left, this.top), // ✅ min = (esquerda, topo)
      new Vector2(this.right, this.bottom), // ✅ max = (direita, base)
    );
  }

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
  public static generateRandomInside(
    boundary: Rect,
    minWidth: number = 1,
    minHeight: number = 1,
  ): Rect {
    if (!(boundary instanceof Rect)) {
      throw new Error("Boundary must be Rect instance");
    }
    const maxWidth = boundary.width - minWidth;
    const maxHeight = boundary.height - minHeight;

    if (maxWidth < 0 || maxHeight < 0) {
      throw new Error(
        "Boundary is too small for the minimum size constraints.",
      );
    }
    const width = minWidth + Math.random() * maxWidth;
    const height = minHeight + Math.random() * maxHeight;
    const x = boundary.left + Math.random() * (boundary.width - width);
    const y = boundary.top + Math.random() * (boundary.height - height);
    return new Rect(x, y, width, height);
  }

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
  public static fromCenter(center: Vector2, size: Vector2): Rect {
    const half = size.scale(0.5);
    return new Rect(center.x - half.x, center.y - half.y, size.x, size.y);
  }

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
  public static fromCorners(a: Vector2, b: Vector2): Rect {
    const left = Math.min(a.x, b.x);
    const right = Math.max(a.x, b.x);
    const top = Math.min(a.y, b.y);
    const bottom = Math.max(a.y, b.y);
    return new Rect(left, top, right - left, bottom - top);
  }

  /**
   * Validates that all numeric values are finite.
   * @private
   */
  private validate(): void {
    const values = [this.x, this.y, this.width, this.height];
    for (const v of values) {
      if (!Number.isFinite(v)) {
        throw new Error(
          `Invalid numeric value: ${v}. Expected a finite number.`,
        );
      }
    }
  }

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
  public toString(): string {
    return `Rect(x=${this.x}, y=${this.y}, w=${this.width}, h=${this.height})`;
  }
}
