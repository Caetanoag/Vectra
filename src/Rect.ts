import { Vector2 } from "./Vector2.js";
/**
 * Represents an axis-aligned rectangle (AABB).
 * Mutability: most methods modify the instance and return `this` for chaining.
 */
export class Rect {
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
	 * @param w - The new width.
	 * @returns `this` for chaining.
	 */
	public setWidth(w: number) {
		this.width = w;
		this.validate();
		this.normalize();
		return this;
	}

	/**
	 * Sets the height and normalizes.
	 * @param h - The new height.
	 * @returns `this` for chaining.
	 */
	public setHeight(h: number) {
		this.height = h;
		this.validate();
		this.normalize();
		return this;
	}

	/**
	 * Moves the rectangle to absolute coordinates.
	 * @param x - New x position.
	 * @param y - New y position.
	 * @returns `this` for chaining.
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
	 * @param v - The new position.
	 * @returns `this` for chaining.
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
	 * @param v - The new size (width, height).
	 * @returns `this` for chaining.
	 */
	public setSize(v: Vector2): Rect {
		this.width = v.x;
		this.height = v.y;
		this.validate();
		this.normalize();
		return this;
	}

	/** Returns the position as a Vector2. */
	public get position(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	/** Returns the area (width × height). */
	public get area(): number {
		return this.width * this.height;
	}

	/** Returns the y-coordinate of the top edge. */
	public get top(): number {
		return this.y;
	}

	/** Returns the x-coordinate of the left edge. */
	public get left(): number {
		return this.x;
	}

	/** Returns the y-coordinate of the bottom edge. */
	public get bottom(): number {
		return this.y + this.height;
	}

	/** Returns the x-coordinate of the right edge. */
	public get right(): number {
		return this.x + this.width;
	}

	/** Returns the center point as a Vector2. */
	public get center(): Vector2 {
		return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
	}

	/** Returns the width. */
	public getWidth(): number {
		return this.width;
	}

	/** Returns the height. */
	public getHeight(): number {
		return this.height;
	}

	/**
	 * Checks if a point is inside the rectangle (inclusive of borders).
	 * @param point - The point to test.
	 * @returns True if the point is inside (including edges).
	 */
	public contains(point: Vector2): boolean {
		const x = point.x;
		const y = point.y;
		return (
			x >= this.left && x <= this.right && y <= this.bottom && y >= this.top
		);
	}

	/**
	 * Checks if this rectangle intersects another (inclusive of borders).
	 * @param box - The other rectangle.
	 * @returns True if they overlap or touch.
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
	 * @param dx - X offset.
	 * @param dy - Y offset.
	 * @returns `this` for chaining.
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
	 * @param dx - Change in width.
	 * @param dy - Change in height.
	 * @returns `this` for chaining.
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
	 * @param dx - Half-expansion in x-axis.
	 * @param dy - Half-expansion in y-axis.
	 * @returns `this` for chaining.
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
	 * Computes the union of two rectangles.
	 * @param box - The other rectangle.
	 * @returns A new Rect that covers both rectangles.
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
	 * @param box - The other rectangle.
	 * @returns A new Rect representing the overlapping area, or `undefined` if none.
	 */
	public intersection(box: Rect): Rect | undefined {
		const top = Math.max(this.top, box.top);
		const bottom = Math.min(this.bottom, box.bottom);
		const left = Math.max(this.left, box.left);
		const right = Math.min(this.right, box.right);
		if (left > right || top > bottom) return undefined;
		return new Rect(left, top, right - left, bottom - top);
	}

	/** Creates a deep copy of this rectangle. */
	public clone(): Rect {
		return new Rect(this.x, this.y, this.width, this.height);
	}

	/** Checks if the rectangle has zero width or height. */
	public isEmpty(): boolean {
		return this.width === 0 || this.height === 0;
	}

	/**
	 * Compares two rectangles for exact equality.
	 * @param box - The other rectangle.
	 * @returns True if all properties match exactly.
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
}
