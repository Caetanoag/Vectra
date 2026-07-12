import { Matrix3 } from "./Matrix3.js";
import { Vector2 } from "./Vector2.js";
export class Transform {
	constructor(
		public position: Vector2 = new Vector2(0, 0),
		public rotation: number = 0,
		public scale: Vector2 = new Vector2(1, 1),
	) {
		if (!Number.isFinite(rotation)) {
			throw new Error("Rotation must be finite");
		}
	}
	public setPosition(v: Vector2): this {
		this.position = v;
		return this;
	}
	public setRotation(angle: number): this {
		if (!Number.isFinite(angle)) {
			throw new Error("Angle must be finite");
		}
		this.rotation = angle;
		return this;
	}
	public setScale(v: Vector2): this {
		this.scale = v;
		return this;
	}
	public translate(dx: number, dy: number): this {
		if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
			throw new Error("dx and dy must be finite");
		}
		this.position.x += dx;
		this.position.y += dy;
		return this;
	}
	public rotate(angle: number): this {
		if (!Number.isFinite(angle)) throw new Error("angle must be finite");
		this.rotation += angle;
		return this;
	}
	public scaleBy(sx: number, sy: number): this {
		if (!Number.isFinite(sx) || !Number.isFinite(sy)) {
			throw new Error("sx and sy must be finite");
		}
		this.scale.x *= sx;
		this.scale.y *= sy;
		return this;
	}
	public getMatrix(): Matrix3 {
		return Matrix3.translation(this.position.x, this.position.y)
			.multiply(Matrix3.rotation(this.rotation))
			.multiply(Matrix3.scaling(this.scale.x, this.scale.y));
	}
	private _parent: Transform | null = null;

	get parent(): Transform | null {
		return this._parent;
	}

	public setParent(parent: Transform | null): void {
		this._parent = parent;
	}

	public getWorldMatrix(): Matrix3 {
		const local = this.getMatrix();
		if (!this._parent) return local;
		return this._parent.getWorldMatrix().multiply(local);
	}
}
