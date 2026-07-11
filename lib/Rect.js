import { Vector2 } from "./Vector2.js";
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
    setWidth(w) {
        this.width = w;
        this.validate();
        this.normalize();
        return this;
    }
    setHeight(h) {
        this.height = h;
        this.validate();
        this.normalize();
        return this;
    }
    moveTo(x, y) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            throw new Error(`Invalid coordinates: (${x}, ${y})`);
        }
        this.x = x;
        this.y = y;
        this.validate();
        return this;
    }
    setPosition(v) {
        if (!Number.isFinite(v.x) || !Number.isFinite(v.y)) {
            throw new Error(`Invalid vector: ${v}`);
        }
        this.x = v.x;
        this.y = v.y;
        this.validate();
        return this;
    }
    setSize(v) {
        this.width = v.x;
        this.height = v.y;
        this.validate();
        this.normalize();
        return this;
    }
    get position() {
        return new Vector2(this.x, this.y);
    }
    get area() {
        return this.width * this.height;
    }
    get top() {
        return this.y;
    }
    get left() {
        return this.x;
    }
    get bottom() {
        return this.y + this.height;
    }
    get right() {
        return this.x + this.width;
    }
    get center() {
        return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    contains(point) {
        const x = point.x;
        const y = point.y;
        return (x >= this.left && x <= this.right && y <= this.bottom && y >= this.top);
    }
    intersects(box) {
        return (this.left <= box.right &&
            box.left <= this.right &&
            this.top <= box.bottom &&
            box.top <= this.bottom);
    }
    translate(dx, dy) {
        if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
            throw new Error(`Invalid delta: (${dx}, ${dy})`);
        }
        this.x += dx;
        this.y += dy;
        return this;
    }
    resize(dx, dy) {
        this.width += dx;
        this.height += dy;
        this.validate();
        this.normalize();
        return this;
    }
    inflate(dx, dy) {
        this.x -= dx;
        this.y -= dy;
        this.width += 2 * dx;
        this.height += 2 * dy;
        this.validate();
        this.normalize();
        return this;
    }
    union(box) {
        const top = Math.min(this.top, box.top);
        const bottom = Math.max(this.bottom, box.bottom);
        const left = Math.min(this.left, box.left);
        const right = Math.max(this.right, box.right);
        return new Rect(left, top, right - left, bottom - top);
    }
    intersection(box) {
        const top = Math.max(this.top, box.top);
        const bottom = Math.min(this.bottom, box.bottom);
        const left = Math.max(this.left, box.left);
        const right = Math.min(this.right, box.right);
        if (left > right || top > bottom)
            return undefined;
        return new Rect(left, top, right - left, bottom - top);
    }
    clone() {
        return new Rect(this.x, this.y, this.width, this.height);
    }
    isEmpty() {
        return this.width === 0 || this.height === 0;
    }
    equals(box) {
        return (this.x === box.x &&
            this.y === box.y &&
            this.width === box.width &&
            this.height === box.height);
    }
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
    validate() {
        const values = [this.x, this.y, this.width, this.height];
        for (const v of values) {
            if (!Number.isFinite(v)) {
                throw new Error(`Invalid numeric value: ${v}. Expected a finite number.`);
            }
        }
    }
}
