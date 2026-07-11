export class Color {
	constructor(
		public r: number,
		public g: number,
		public b: number,
		public a?: number,
	) {
		if (!Number.isFinite(r) || r < 0 || r > 1) {
			throw new Error(`Red channel must be in [0,1]: ${r}`);
		}
		if (!Number.isFinite(g) || g < 0 || g > 1) {
			throw new Error(`Green channel must be in [0,1]: ${g}`);
		}
		if (!Number.isFinite(b) || b < 0 || b > 1) {
			throw new Error(`Blue channel must be in [0,1]: ${b}`);
		}
		if (a !== undefined && (!Number.isFinite(a) || a < 0 || a > 1)) {
			throw new Error(`Alpha channel must be in [0,1]: ${a}`);
		}
	}

	public get toArray(): [number, number, number, number | undefined] {
		return [this.r, this.g, this.b, this.a];
	}

	public get rgb(): string {
		return `rgb(${Math.round(this.r * 255)},${Math.round(this.g * 255)},${Math.round(this.b * 255)})`;
	}

	public get rgba(): string {
		const alpha = this.a !== undefined ? this.a : 1;
		return `rgba(${Math.round(this.r * 255)},${Math.round(this.g * 255)},${Math.round(this.b * 255)},${alpha})`;
	}

	public get hex(): string {
		const toHex = (v: number) =>
			Math.round(v * 255)
				.toString(16)
				.padStart(2, "0")
				.toUpperCase();
		const rgb = toHex(this.r) + toHex(this.g) + toHex(this.b);
		if (this.a !== undefined && this.a < 1) {
			return `#${rgb}${toHex(this.a)}`;
		}
		return `#${rgb}`;
	}

	public get brightness(): number {
		return 0.299 * this.r + 0.587 * this.g + 0.114 * this.b;
	}

	public lerp(other: Color, t: number): Color {
		if (!Number.isFinite(t) || t < 0 || t > 1) {
			throw new Error(`Interpolation factor must be in [0,1]: ${t}`);
		}
		const r = this.r + (other.r - this.r) * t;
		const g = this.g + (other.g - this.g) * t;
		const b = this.b + (other.b - this.b) * t;
		const a =
			this.a !== undefined && other.a !== undefined
				? this.a + (other.a - this.a) * t
				: (this.a ?? other.a ?? 1);
		return new Color(r, g, b, a);
	}

	public clone(): Color {
		return new Color(this.r, this.g, this.b, this.a);
	}

	public equals(other: Color, epsilon: number = 1e-6): boolean {
		if (!(other instanceof Color)) return false;
		const a1 = this.a ?? 1;
		const a2 = other.a ?? 1;
		return (
			Math.abs(this.r - other.r) < epsilon &&
			Math.abs(this.g - other.g) < epsilon &&
			Math.abs(this.b - other.b) < epsilon &&
			Math.abs(a1 - a2) < epsilon
		);
	}

	static fromHex(hex: string): Color {
		const normalized = hex.trim();
		if (!normalized.startsWith("#")) {
			throw new Error(`Invalid hex color: "${hex}". Must start with #.`);
		}
		let hexStr = normalized.slice(1);

		if (hexStr.length === 3 || hexStr.length === 4) {
			hexStr = hexStr
				.split("")
				.map((c) => c + c)
				.join("");
		}

		if (hexStr.length !== 6 && hexStr.length !== 8) {
			throw new Error(
				`Invalid hex color: "${hex}". Must be 3, 4, 6, or 8 hex digits.`,
			);
		}
		if (!/^[0-9a-fA-F]+$/.test(hexStr)) {
			throw new Error(
				`Invalid hex color: "${hex}". Contains non-hex characters.`,
			);
		}

		const r = parseInt(hexStr.slice(0, 2), 16);
		const g = parseInt(hexStr.slice(2, 4), 16);
		const b = parseInt(hexStr.slice(4, 6), 16);
		const a = hexStr.length === 8 ? parseInt(hexStr.slice(6, 8), 16) : 255;

		return new Color(r / 255, g / 255, b / 255, a / 255);
	}

	static fromRgb(r: number, g: number, b: number, a?: number): Color {
		if (!Number.isFinite(r) || r < 0 || r > 255)
			throw new Error(`Red must be 0-255: ${r}`);
		if (!Number.isFinite(g) || g < 0 || g > 255)
			throw new Error(`Green must be 0-255: ${g}`);
		if (!Number.isFinite(b) || b < 0 || b > 255)
			throw new Error(`Blue must be 0-255: ${b}`);
		if (a !== undefined && (!Number.isFinite(a) || a < 0 || a > 255)) {
			throw new Error(`Alpha must be 0-255: ${a}`);
		}
		const alpha = a !== undefined ? a / 255 : undefined;
		return new Color(r / 255, g / 255, b / 255, alpha);
	}

	static white(): Color {
		return new Color(1, 1, 1);
	}
	static black(): Color {
		return new Color(0, 0, 0);
	}
	static red(): Color {
		return new Color(1, 0, 0);
	}
	static green(): Color {
		return new Color(0, 1, 0);
	}
	static blue(): Color {
		return new Color(0, 0, 1);
	}
	static transparent(): Color {
		return new Color(0, 0, 0, 0);
	}
}
