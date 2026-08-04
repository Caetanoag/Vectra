/**
 * Represents a color with red, green, blue, and optional alpha channels.
 * All channels are normalized to the range [0, 1].
 * Immutable: all operations return new Color instances.
 */
export declare class Color {
    r: number;
    g: number;
    b: number;
    a?: number | undefined;
    constructor(r: number, g: number, b: number, a?: number | undefined);
    /** Returns the color channels as a tuple [r, g, b, a?]. */
    get toArray(): [number, number, number, number | undefined];
    /** Returns the CSS `rgb(r, g, b)` string. */
    get rgb(): string;
    /** Returns the CSS `rgba(r, g, b, a)` string. */
    get rgba(): string;
    /**
     * Returns the hexadecimal representation.
     * - If alpha is not present or equals 1, returns `#RRGGBB`.
     * - If alpha is defined and less than 1, returns `#RRGGBBAA`.
     */
    get hex(): string;
    /** Returns the approximate luminance (brightness) of the color. */
    get brightness(): number;
    /**
     * Performs linear interpolation between this color and another.
     * @param other - The target color.
     * @param t - Interpolation factor in [0, 1].
     * @returns A new Color at the interpolated position.
     */
    lerp(other: Color, t: number): Color;
    /** Creates a deep copy of this color. */
    clone(): Color;
    /**
     * Compares colors with tolerance for floating-point errors.
     * @param other - The other color.
     * @param epsilon - Tolerance (default 1e-6).
     * @returns True if all channels are within epsilon.
     */
    equals(other: Color, epsilon?: number): boolean;
    /** Returns a new Color with the same RGB but a new alpha. */
    withAlpha(alpha: number): Color;
    /** Returns a new Color darkened (multiplied by factor). */
    darken(factor: number): Color;
    /** Returns a new Color lightened. */
    lighten(factor: number): Color;
    /**
     * Creates a Color from a hexadecimal string.
     * Supports formats: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`.
     * @param hex - The hex string including '#'.
     * @returns A new Color instance.
     */
    static fromHex(hex: string): Color;
    /**
     * Creates a Color from integer RGB (0-255) channels.
     * @param r - Red channel (0-255).
     * @param g - Green channel (0-255).
     * @param b - Blue channel (0-255).
     * @param a - Alpha channel (0-255), optional.
     * @returns A new Color instance.
     */
    static fromRgb(r: number, g: number, b: number, a?: number): Color;
    /** Returns pure white `Color(1, 1, 1)`. */
    static white(): Color;
    /** Returns pure black `Color(0, 0, 0)`. */
    static black(): Color;
    /** Returns pure red `Color(1, 0, 0)`. */
    static red(): Color;
    /** Returns pure green `Color(0, 1, 0)`. */
    static green(): Color;
    /** Returns pure blue `Color(0, 0, 1)`. */
    static blue(): Color;
    /** Returns fully transparent black `Color(0, 0, 0, 0)`. */
    static transparent(): Color;
}
//# sourceMappingURL=Color.d.ts.map