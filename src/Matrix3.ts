import { Vector2 } from "./Vector2.js";

export class Matrix3 {
	constructor(
		public readonly m00: number,
		public readonly m01: number,
		public readonly m02: number,
		public readonly m10: number,
		public readonly m11: number,
		public readonly m12: number,
		public readonly m20: number,
		public readonly m21: number,
		public readonly m22: number,
	) {
		if (![m00, m01, m02, m10, m11, m12, m20, m21, m22].every(Number.isFinite)) {
			throw new Error("All Matrix3 values must be finite.");
		}
	}

	static identity(): Matrix3 {
		return new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
	}
	static translation(tx: number, ty: number): Matrix3 {
		if (!Number.isFinite(tx) || !Number.isFinite(ty)) {
			throw new Error("tx and ty must be finite values");
		}
		return new Matrix3(1, 0, tx, 0, 1, ty, 0, 0, 1);
	}
	static rotation(angle: number, center?: Vector2): Matrix3 {
		if (!Number.isFinite(angle)) {
			throw new Error(`Angle must be finite: ${angle}`);
		}
		const cx = center?.x ?? 0;
		const cy = center?.y ?? 0;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		return new Matrix3(
			cos,
			-sin,
			cx - cx * cos + cy * sin,
			sin,
			cos,
			cy - cx * sin - cy * cos,
			0,
			0,
			1,
		);
	}

	static scaling(sx: number, sy?: number): Matrix3 {
		if (!Number.isFinite(sx)) throw new Error("sx must be finite");
		if (sy !== undefined && !Number.isFinite(sy))
			throw new Error("sy must be finite if provided");
		return new Matrix3(sx, 0, 0, 0, sy ?? sx, 0, 0, 0, 1);
	}
	public multiply(other: Matrix3): Matrix3 {
		const b = other;
		return new Matrix3(
			this.m00 * b.m00 + this.m01 * b.m10 + this.m02 * b.m20,
			this.m00 * b.m01 + this.m01 * b.m11 + this.m02 * b.m21,
			this.m00 * b.m02 + this.m01 * b.m12 + this.m02 * b.m22,

			this.m10 * b.m00 + this.m11 * b.m10 + this.m12 * b.m20,
			this.m10 * b.m01 + this.m11 * b.m11 + this.m12 * b.m21,
			this.m10 * b.m02 + this.m11 * b.m12 + this.m12 * b.m22,

			this.m20 * b.m00 + this.m21 * b.m10 + this.m22 * b.m20,
			this.m20 * b.m01 + this.m21 * b.m11 + this.m22 * b.m21,
			this.m20 * b.m02 + this.m21 * b.m12 + this.m22 * b.m22,
		);
	}
	public translate(dx: number, dy: number): Matrix3 {
		if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
			throw new Error("dx and dy must be finite");
		}
		return this.multiply(Matrix3.translation(dx, dy));
	}

	public rotate(angle: number): Matrix3 {
		if (!Number.isFinite(angle)) {
			throw new Error("angle must be finite");
		}
		return this.multiply(Matrix3.rotation(angle));
	}

	public scale(sx: number, sy?: number): Matrix3 {
		if (!Number.isFinite(sx)) throw new Error("sx must be finite");
		if (sy !== undefined && !Number.isFinite(sy)) {
			throw new Error("sy must be finite if provided");
		}
		return this.multiply(Matrix3.scaling(sx, sy));
	}

	public applyToVector(v: Vector2): Vector2 {
		const x = v.x;
		const y = v.y;
		const nx = this.m00 * x + this.m01 * y + this.m02;
		const ny = this.m10 * x + this.m11 * y + this.m12;
		return new Vector2(nx, ny);
	}

	public applyToDirection(v: Vector2): Vector2 {
		const x = v.x;
		const y = v.y;
		const nx = this.m00 * x + this.m01 * y;
		const ny = this.m10 * x + this.m11 * y;
		return new Vector2(nx, ny);
	}
	public toCanvasTransform(): [number, number, number, number, number, number] {
		// Converting from row-major to line-major
		// Note that the Canvas API assumes the last line is always [0, 0, 1]
		return [
			this.m00, // a
			this.m10, // b
			this.m01, // c
			this.m11, // d
			this.m02, // e
			this.m12, // f
		];
	}
	public invert(): Matrix3 | null {
		const a = this.m00,
			b = this.m01,
			c = this.m02;
		const d = this.m10,
			e = this.m11,
			f = this.m12;
		const g = this.m20,
			h = this.m21,
			i = this.m22;

		const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
		if (Math.abs(det) < 1e-12) return null;

		const invDet = 1 / det;
		return new Matrix3(
			(e * i - f * h) * invDet,
			(c * h - b * i) * invDet,
			(b * f - c * e) * invDet,
			(f * g - d * i) * invDet,
			(a * i - c * g) * invDet,
			(c * d - a * f) * invDet,
			(d * h - e * g) * invDet,
			(b * g - a * h) * invDet,
			(a * e - b * d) * invDet,
		);
	}
	public equals(other: Matrix3, epsilon: number = 1e-9): boolean {
		if (!(other instanceof Matrix3)) return false;
		return (
			Math.abs(this.m00 - other.m00) < epsilon &&
			Math.abs(this.m01 - other.m01) < epsilon &&
			Math.abs(this.m02 - other.m02) < epsilon &&
			Math.abs(this.m10 - other.m10) < epsilon &&
			Math.abs(this.m11 - other.m11) < epsilon &&
			Math.abs(this.m12 - other.m12) < epsilon &&
			Math.abs(this.m20 - other.m20) < epsilon &&
			Math.abs(this.m21 - other.m21) < epsilon &&
			Math.abs(this.m22 - other.m22) < epsilon
		);
	}

	public clone(): Matrix3 {
		return new Matrix3(
			this.m00,
			this.m01,
			this.m02,
			this.m10,
			this.m11,
			this.m12,
			this.m20,
			this.m21,
			this.m22,
		);
	}

	public toArray(): number[] {
		return [
			this.m00,
			this.m01,
			this.m02,
			this.m10,
			this.m11,
			this.m12,
			this.m20,
			this.m21,
			this.m22,
		];
	}
	public toString(): string {
		return `Matrix3(${this.m00}, ${this.m01}, ${this.m02}, ${this.m10}, ${this.m11}, ${this.m12}, ${this.m20}, ${this.m21}, ${this.m22})`;
	}
}
