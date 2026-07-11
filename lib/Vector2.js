export class Vector2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        if (!Number.isFinite(x))
            throw new Error(`x must be finite: ${x}`);
        if (!Number.isFinite(y))
            throw new Error(`y must be finite: ${y}`);
    }
    get length() {
        return Math.hypot(this.x, this.y);
    }
    get lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    toString() {
        return `Vector2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
    add(v) {
        return new Vector2(v.x + this.x, v.y + this.y);
    }
    subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    scale(s_factor) {
        return new Vector2(this.x * s_factor, this.y * s_factor);
    }
    negate() {
        return new Vector2(-this.x, -this.y);
    }
    hadamar(v) {
        return new Vector2(this.x * v.x, this.y * v.y);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    distanceTo(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.hypot(dx, dy);
    }
    normalized() {
        const length = this.length;
        if (length === 0)
            return new Vector2(0, 0);
        return new Vector2(this.x / length, this.y / length);
    }
    static fromAngle(radians) {
        return new Vector2(Math.cos(radians), Math.sin(radians));
    }
}
