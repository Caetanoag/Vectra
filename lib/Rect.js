import { Vector2 } from "./Vector2.js";
/**
 * Represents an axis-aligned rectangle (AABB).
 * Mutability: most methods modify the instance and return `this` for chaining.
 */
export class Rect {
    x;
    y;
    width;
    height;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.validate();
        this.normalize();
    }
    /**
     * Sets the width and normalizes.
     * @param w - The new width.
     * @returns `this` for chaining.
     */
    setWidth(w) {
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
    setHeight(h) {
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
    moveTo(x, y) {
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
    setPosition(v) {
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
    setSize(v) {
        this.width = v.x;
        this.height = v.y;
        this.validate();
        this.normalize();
        return this;
    }
    /** Returns the position as a Vector2. */
    get position() {
        return new Vector2(this.x, this.y);
    }
    /** Returns the area (width × height). */
    get area() {
        return this.width * this.height;
    }
    /** Returns the y-coordinate of the top edge. */
    get top() {
        return this.y;
    }
    /** Returns the x-coordinate of the left edge. */
    get left() {
        return this.x;
    }
    /** Returns the y-coordinate of the bottom edge. */
    get bottom() {
        return this.y + this.height;
    }
    /** Returns the x-coordinate of the right edge. */
    get right() {
        return this.x + this.width;
    }
    /** Returns the center point as a Vector2. */
    get center() {
        return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
    }
    /** Returns the size (width, height) as a Vector2. */
    get size() {
        return new Vector2(this.width, this.height);
    }
    /** Returns the aspect ratio (width / height). */
    get aspectRatio() {
        return this.width / this.height;
    }
    /** Returns the width. */
    getWidth() {
        return this.width;
    }
    /** Returns the height. */
    getHeight() {
        return this.height;
    }
    /**
     * Checks if a point is inside the rectangle (inclusive of borders).
     * @param point - The point to test.
     * @returns True if the point is inside (including edges).
     */
    contains(point) {
        const x = point.x;
        const y = point.y;
        return (x >= this.left && x <= this.right && y <= this.bottom && y >= this.top);
    }
    /**
     * Checks if this rectangle fully contains another rectangle (inclusive of borders).
     * @param box - The other rectangle.
     * @returns True if every point of `box` is inside or on the edge of `this`.
     */
    containsBox(box) {
        return (this.left <= box.left &&
            this.right >= box.right &&
            this.top <= box.top &&
            this.bottom >= box.bottom);
    }
    /**
     * Checks if this rectangle intersects another (inclusive of borders).
     * @param box - The other rectangle.
     * @returns True if they overlap or touch.
     */
    intersects(box) {
        return (this.left <= box.right &&
            box.left <= this.right &&
            this.top <= box.bottom &&
            box.top <= this.bottom);
    }
    /**
     * Translates the rectangle by (dx, dy).
     * @param dx - X offset.
     * @param dy - Y offset.
     * @returns `this` for chaining.
     */
    translate(dx, dy) {
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
    resize(dx, dy) {
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
    inflate(dx, dy) {
        this.x -= dx;
        this.y -= dy;
        this.width += 2 * dx;
        this.height += 2 * dy;
        this.validate();
        this.normalize();
        return this;
    }
    /** Rounds all values to the nearest integer, returning the same rect. */
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    }
    /** Scales the rect from its top-left corner, returning the same rect. */
    scale(sx, sy) {
        this.width *= sx;
        this.height *= sy;
        return this;
    }
    /** Scales the rect from its center, returning the same rect. */
    scaleFromCenter(sx, sy) {
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
     * @param box - The other rectangle.
     * @returns A new Rect that covers both rectangles.
     */
    union(box) {
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
    intersection(box) {
        const top = Math.max(this.top, box.top);
        const bottom = Math.min(this.bottom, box.bottom);
        const left = Math.max(this.left, box.left);
        const right = Math.min(this.right, box.right);
        if (left > right || top > bottom)
            return undefined;
        return new Rect(left, top, right - left, bottom - top);
    }
    /** Creates a deep copy of this rectangle. */
    clone() {
        return new Rect(this.x, this.y, this.width, this.height);
    }
    /** Checks if the rectangle has zero width or height. */
    isEmpty() {
        return this.width === 0 || this.height === 0;
    }
    /** Squared distance from a point to the nearest edge (0 if inside).
     */
    distanceSquaredToPoint(point) {
        const dx = Math.max(this.left - point.x, 0, point.x - this.right);
        const dy = Math.max(this.top - point.y, 0, point.y - this.bottom);
        return dx * dx + dy * dy;
    }
    /** Euclidean distance from a point to the nearest edge. */
    distanceToPoint(point) {
        return Math.sqrt(this.distanceSquaredToPoint(point));
    }
    /**
     * Compares two rectangles for exact equality.
     * @param box - The other rectangle.
     * @returns True if all properties match exactly.
     */
    equals(box) {
        return (this.x === box.x &&
            this.y === box.y &&
            this.width === box.width &&
            this.height === box.height);
    }
    /**
     * Normalizes the rectangle: if width or height is negative, swaps coordinates.
     * @private
     */
    normalize() {
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
     * @param point - Vector2 representing the point
     */
    clampPoint(point) {
        return point.clamp(new Vector2(this.left, this.top), // ✅ min = (esquerda, topo)
        new Vector2(this.right, this.bottom));
    }
    /**
     * Generates a random rectangle fully contained within a given boundary.
     * @param boundary - The outer container.
     * @param minWidth - Minimum width of the generated rect (default 1).
     * @param minHeight - Minimum height of the generated rect (default 1).
     * @returns A new Rect with random position and size inside the boundary.
     */
    static generateRandomInside(boundary, minWidth = 1, minHeight = 1) {
        if (!(boundary instanceof Rect)) {
            throw new Error("Boundary must be Rect instance");
        }
        const maxWidth = boundary.width - minWidth;
        const maxHeight = boundary.height - minHeight;
        if (maxWidth < 0 || maxHeight < 0) {
            throw new Error("Boundary is too small for the minimum size constraints.");
        }
        const width = minWidth + Math.random() * maxWidth;
        const height = minHeight + Math.random() * maxHeight;
        const x = boundary.left + Math.random() * (boundary.width - width);
        const y = boundary.top + Math.random() * (boundary.height - height);
        return new Rect(x, y, width, height);
    }
    /** Creates a Rect from a center point and a size Vector2.
     * @param center - The center coordinates
     * @param size   - The width and height as a Vector2
     * @returns A new Rect created from the center point
     */
    static fromCenter(center, size) {
        const half = size.scale(0.5);
        return new Rect(center.x - half.x, center.y - half.y, size.x, size.y);
    }
    /** Creates a Rect that exactly spans between two corner points. */
    static fromCorners(a, b) {
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
    validate() {
        const values = [this.x, this.y, this.width, this.height];
        for (const v of values) {
            if (!Number.isFinite(v)) {
                throw new Error(`Invalid numeric value: ${v}. Expected a finite number.`);
            }
        }
    }
    toString() {
        return `Rect(x=${this.x}, y=${this.y}, w=${this.width}, h=${this.height})`;
    }
}
//# sourceMappingURL=Rect.js.map