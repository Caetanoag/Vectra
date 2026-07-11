import { Vector2 } from "./Vector2.js";

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
	public setWidth(w: number) {
		this.width = w;
		this.validate();
		this.normalize();
		return this;
	}
	public setHeight(h: number) {
		this.height = h;
		this.validate();
		this.normalize();
		return this;
	}
	public moveTo(x: number, y: number): Rect {
		if (!Number.isFinite(x) || !Number.isFinite(y)) {
			throw new Error(`Invalid coordinates: (${x}, ${y})`);
		}
		this.x = x;
		this.y = y;
		this.validate();
		return this;
	}
	public setPosition(v: Vector2): Rect {
		if (!Number.isFinite(v.x) || !Number.isFinite(v.y)) {
			throw new Error(`Invalid vector: ${v}`);
		}
		this.x = v.x;
		this.y = v.y;
		this.validate();
		return this;
	}
	public setSize(v: Vector2): Rect {
		this.width = v.x;
		this.height = v.y;
		this.validate();
		this.normalize();
		return this;
	}
	public get position(): Vector2 {
		return new Vector2(this.x, this.y);
	}
	public get area(): number {
		return this.width * this.height;
	}
	public get top(): number {
		return this.y;
	}
	public get left(): number {
		return this.x;
	}
	public get bottom(): number {
		return this.y + this.height;
	}
	public get right(): number {
		return this.x + this.width;
	}
	public get center(): Vector2 {
		return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
	}
	public getWidth(): number {
		return this.width;
	}
	public getHeight(): number {
		return this.height;
	}
	public contains(point: Vector2): boolean {
		const x = point.x;
		const y = point.y;
		return (
			x >= this.left && x <= this.right && y <= this.bottom && y >= this.top
		);
	}
	public intersects(box: Rect): boolean {
		return (
			this.left <= box.right &&
			box.left <= this.right &&
			this.top <= box.bottom &&
			box.top <= this.bottom
		);
	}
	public translate(dx: number, dy: number): Rect {
		if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
			throw new Error(`Invalid delta: (${dx}, ${dy})`);
		}
		this.x += dx;
		this.y += dy;
		return this;
	}
	public resize(dx: number, dy: number): Rect {
		this.width += dx;
		this.height += dy;
		this.validate();
		this.normalize();
		return this;
	}
	public inflate(dx: number, dy: number): Rect {
		this.x -= dx;
		this.y -= dy;
		this.width += 2 * dx;
		this.height += 2 * dy;
		this.validate();
		this.normalize();
		return this;
	}
	public union(box: Rect): Rect {
		const top = Math.min(this.top, box.top);
		const bottom = Math.max(this.bottom, box.bottom);
		const left = Math.min(this.left, box.left);
		const right = Math.max(this.right, box.right);

		return new Rect(left, top, right - left, bottom - top);
	}
	public intersection(box: Rect): Rect | undefined {
		const top = Math.max(this.top, box.top);
		const bottom = Math.min(this.bottom, box.bottom);
		const left = Math.max(this.left, box.left);
		const right = Math.min(this.right, box.right);

		if (left > right || top > bottom) return undefined;
		return new Rect(left, top, right - left, bottom - top);
	}
	public clone(): Rect {
		return new Rect(this.x, this.y, this.width, this.height);
	}
	public isEmpty(): boolean {
		return this.width === 0 || this.height === 0;
	}
	public equals(box: Rect): boolean {
		return (
			this.x === box.x &&
			this.y === box.y &&
			this.width === box.width &&
			this.height === box.height
		);
	}
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
