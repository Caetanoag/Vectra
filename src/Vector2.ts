export class Vector2 {
	constructor(
		public x: number,
		public y: number,
	) {
		if (!Number.isFinite(x)) throw new Error(`x must be finite: ${x}`);
		if (!Number.isFinite(y)) throw new Error(`y must be finite: ${y}`);
	}
	public get length(): number {
		return Math.hypot(this.x, this.y);
	}
	public get lengthSq(): number {
		return this.x * this.x + this.y * this.y;
	}
	public toString(): string {
		return `Vector2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
	}
	public add(v: Vector2): Vector2 {
		return new Vector2(v.x + this.x, v.y + this.y);
	}
	public subtract(v: Vector2): Vector2 {
		return new Vector2(this.x - v.x, this.y - v.y);
	}
	public scale(s_factor: number): Vector2 {
		return new Vector2(this.x * s_factor, this.y * s_factor);
	}
	public negate(): Vector2 {
		return new Vector2(-this.x, -this.y);
	}
	public hadamar(v: Vector2): Vector2 {
		return new Vector2(this.x * v.x, this.y * v.y);
	}
	public dot(v: Vector2): number {
		return this.x * v.x + this.y * v.y;
	}
	public distanceTo(v: Vector2): number {
		const dx = this.x - v.x;
		const dy = this.y - v.y;

		return Math.hypot(dx, dy);
	}
	public normalized(): Vector2 {
		const length: number = this.length;
		if (length === 0) return new Vector2(0, 0);
		return new Vector2(this.x / length, this.y / length);
	}
	static fromAngle(radians: number): Vector2 {
		return new Vector2(Math.cos(radians), Math.sin(radians));
	}
}
