import { Matrix3 } from "./Matrix3.js";
import { Vector2 } from "./Vector2.js";
/**
 * Represents a 2D transform with position, rotation, and scale.
 * Mutability: methods modify the instance and return `this` for chaining.
 * Supports hierarchical transformations through `parent` references.
 */
export class Transform {
	constructor(
		/** Position in world space (default: (0,0)). */
		public position: Vector2 = new Vector2(0, 0),
		/** Rotation in radians (default: 0). */
		public rotation: number = 0,
		/** Scale factors (default: (1,1)). */
		public scale: Vector2 = new Vector2(1, 1),
	) {
		if (!Number.isFinite(rotation)) {
			throw new Error("Rotation must be finite");
		}
	}

	/** Sets the position and returns `this` for chaining. */
	public setPosition(v: Vector2): this {
		this.position = v;
		return this;
	}

	/** Sets the rotation and returns `this` for chaining. */
	public setRotation(angle: number): this {
		if (!Number.isFinite(angle)) {
			throw new Error("Angle must be finite");
		}
		this.rotation = angle;
		return this;
	}

	/** Sets the scale and returns `this` for chaining. */
	public setScale(v: Vector2): this {
		this.scale = v;
		return this;
	}

	/**
	 * Translates the transform's position.
	 * @param dx - X offset.
	 * @param dy - Y offset.
	 * @returns `this` for chaining.
	 */
	public translate(dx: number, dy: number): this {
		if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
			throw new Error("dx and dy must be finite");
		}
		this.position.x += dx;
		this.position.y += dy;
		return this;
	}

	/**
	 * Rotates the transform (adds to the current rotation).
	 * @param angle - Additional rotation in radians.
	 * @returns `this` for chaining.
	 */
	public rotate(angle: number): this {
		if (!Number.isFinite(angle)) throw new Error("angle must be finite");
		this.rotation += angle;
		return this;
	}

	/**
	 * Scales the transform (multiplies current scale).
	 * @param sx - X scale factor.
	 * @param sy - Y scale factor.
	 * @returns `this` for chaining.
	 */
	public scaleBy(sx: number, sy: number): this {
		if (!Number.isFinite(sx) || !Number.isFinite(sy)) {
			throw new Error("sx and sy must be finite");
		}
		this.scale.x *= sx;
		this.scale.y *= sy;
		return this;
	}

	/**
	 * Generates the local transformation matrix.
	 * Composition order: scale → rotation → translation.
	 * @returns A Matrix3 representing the local transform.
	 */
	public getMatrix(): Matrix3 {
		return Matrix3.translation(this.position.x, this.position.y)
			.multiply(Matrix3.rotation(this.rotation))
			.multiply(Matrix3.scaling(this.scale.x, this.scale.y));
	}

	private _parent: Transform | null = null;

	/** Returns the parent transform, if any. */
	get parent(): Transform | null {
		return this._parent;
	}

	/** Sets the parent transform. */
	public setParent(parent: Transform | null): void {
		this._parent = parent;
	}

	/**
	 * Generates the world transformation matrix (combines with parent).
	 * @returns A Matrix3 representing the world transform.
	 */
	public getWorldMatrix(): Matrix3 {
		const local = this.getMatrix();
		if (!this._parent) return local;
		return this._parent.getWorldMatrix().multiply(local);
	}
}
