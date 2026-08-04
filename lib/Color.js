/**
 * Represents a color with red, green, blue, and optional alpha channels.
 * All channels are normalized to the range [0, 1].
 * Immutable: all operations return new Color instances.
 */
export class Color {
    r;
    g;
    b;
    a;
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
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
    /** Returns the color channels as a tuple [r, g, b, a?]. */
    get toArray() {
        return [this.r, this.g, this.b, this.a];
    }
    /** Returns the CSS `rgb(r, g, b)` string. */
    get rgb() {
        return `rgb(${Math.round(this.r * 255)},${Math.round(this.g * 255)},${Math.round(this.b * 255)})`;
    }
    /** Returns the CSS `rgba(r, g, b, a)` string. */
    get rgba() {
        const alpha = this.a !== undefined ? this.a : 1;
        return `rgba(${Math.round(this.r * 255)},${Math.round(this.g * 255)},${Math.round(this.b * 255)},${alpha})`;
    }
    /**
     * Returns the hexadecimal representation.
     * - If alpha is not present or equals 1, returns `#RRGGBB`.
     * - If alpha is defined and less than 1, returns `#RRGGBBAA`.
     */
    get hex() {
        const toHex = (v) => Math.round(v * 255)
            .toString(16)
            .padStart(2, "0")
            .toUpperCase();
        const rgb = toHex(this.r) + toHex(this.g) + toHex(this.b);
        if (this.a !== undefined && this.a < 1) {
            return `#${rgb}${toHex(this.a)}`;
        }
        return `#${rgb}`;
    }
    /** Returns the approximate luminance (brightness) of the color. */
    get brightness() {
        return 0.299 * this.r + 0.587 * this.g + 0.114 * this.b;
    }
    /**
     * Performs linear interpolation between this color and another.
     * @param other - The target color.
     * @param t - Interpolation factor in [0, 1].
     * @returns A new Color at the interpolated position.
     */
    lerp(other, t) {
        if (!Number.isFinite(t) || t < 0 || t > 1) {
            throw new Error(`Interpolation factor must be in [0,1]: ${t}`);
        }
        const r = this.r + (other.r - this.r) * t;
        const g = this.g + (other.g - this.g) * t;
        const b = this.b + (other.b - this.b) * t;
        const a = this.a !== undefined && other.a !== undefined
            ? this.a + (other.a - this.a) * t
            : (this.a ?? other.a ?? 1);
        return new Color(r, g, b, a);
    }
    /** Creates a deep copy of this color. */
    clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }
    /**
     * Compares colors with tolerance for floating-point errors.
     * @param other - The other color.
     * @param epsilon - Tolerance (default 1e-6).
     * @returns True if all channels are within epsilon.
     */
    equals(other, epsilon = 1e-6) {
        if (!(other instanceof Color))
            return false;
        const a1 = this.a ?? 1;
        const a2 = other.a ?? 1;
        return (Math.abs(this.r - other.r) < epsilon &&
            Math.abs(this.g - other.g) < epsilon &&
            Math.abs(this.b - other.b) < epsilon &&
            Math.abs(a1 - a2) < epsilon);
    }
    /** Returns a new Color with the same RGB but a new alpha. */
    withAlpha(alpha) {
        return new Color(this.r, this.g, this.b, alpha);
    }
    /** Returns a new Color darkened (multiplied by factor). */
    darken(factor) {
        return new Color(this.r * factor, this.g * factor, this.b * factor, this.a);
    }
    /** Returns a new Color lightened. */
    lighten(factor) {
        return this.darken(1 + factor);
    }
    /**
     * Creates a Color from a hexadecimal string.
     * Supports formats: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`.
     * @param hex - The hex string including '#'.
     * @returns A new Color instance.
     */
    static fromHex(hex) {
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
            throw new Error(`Invalid hex color: "${hex}". Must be 3, 4, 6, or 8 hex digits.`);
        }
        if (!/^[0-9a-fA-F]+$/.test(hexStr)) {
            throw new Error(`Invalid hex color: "${hex}". Contains non-hex characters.`);
        }
        const r = parseInt(hexStr.slice(0, 2), 16);
        const g = parseInt(hexStr.slice(2, 4), 16);
        const b = parseInt(hexStr.slice(4, 6), 16);
        const a = hexStr.length === 8 ? parseInt(hexStr.slice(6, 8), 16) : 255;
        return new Color(r / 255, g / 255, b / 255, a / 255);
    }
    /**
     * Creates a Color from integer RGB (0-255) channels.
     * @param r - Red channel (0-255).
     * @param g - Green channel (0-255).
     * @param b - Blue channel (0-255).
     * @param a - Alpha channel (0-255), optional.
     * @returns A new Color instance.
     */
    static fromRgb(r, g, b, a) {
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
    /** Returns pure white `Color(1, 1, 1)`. */
    static white() {
        return new Color(1, 1, 1);
    }
    /** Returns pure black `Color(0, 0, 0)`. */
    static black() {
        return new Color(0, 0, 0);
    }
    /** Returns pure red `Color(1, 0, 0)`. */
    static red() {
        return new Color(1, 0, 0);
    }
    /** Returns pure green `Color(0, 1, 0)`. */
    static green() {
        return new Color(0, 1, 0);
    }
    /** Returns pure blue `Color(0, 0, 1)`. */
    static blue() {
        return new Color(0, 0, 1);
    }
    /** Returns fully transparent black `Color(0, 0, 0, 0)`. */
    static transparent() {
        return new Color(0, 0, 0, 0);
    }
}
//# sourceMappingURL=Color.js.map