/**
 * Represents a color with red, green, blue, and optional alpha channels.
 * All channels are normalized to the range [0, 1].
 * Immutable: all operations return new Color instances.
 *
 * @example
 * ```typescript
 * const red = new Color(1, 0, 0);
 * console.log(red.hex); // "#FF0000"
 * ```
 */
export declare class Color {
    r: number;
    g: number;
    b: number;
    a?: number | undefined;
    /**
     * Creates a new Color.
     *
     * @param r - Red channel, in [0, 1].
     * @param g - Green channel, in [0, 1].
     * @param b - Blue channel, in [0, 1].
     * @param a - Alpha channel, in [0, 1] (optional; treated as opaque when omitted).
     * @throws If any channel is not finite or is outside the [0, 1] range.
     * @example
     * ```typescript
     * const purple = new Color(0.5, 0, 0.5, 0.8);
     * ```
     */
    constructor(r: number, g: number, b: number, a?: number | undefined);
    /**
     * Returns the color channels as a tuple [r, g, b, a?].
     *
     * @example
     * ```typescript
     * const c = new Color(1, 0, 0, 0.5);
     * console.log(c.toArray); // [1, 0, 0, 0.5]
     * ```
     */
    get toArray(): [number, number, number, number | undefined];
    /**
     * Returns the CSS `rgb(r, g, b)` string.
     *
     * @example
     * ```typescript
     * const c = new Color(1, 0, 0);
     * console.log(c.rgb); // "rgb(255,0,0)"
     * ```
     */
    get rgb(): string;
    /**
     * Returns the CSS `rgba(r, g, b, a)` string.
     *
     * @example
     * ```typescript
     * const c = new Color(1, 0, 0, 0.5);
     * console.log(c.rgba); // "rgba(255,0,0,0.5)"
     * ```
     */
    get rgba(): string;
    /**
     * Returns the hexadecimal representation.
     * - If alpha is not present or equals 1, returns `#RRGGBB`.
     * - If alpha is defined and less than 1, returns `#RRGGBBAA`.
     *
     * @example
     * ```typescript
     * const opaque = new Color(1, 0, 0);
     * console.log(opaque.hex); // "#FF0000"
     *
     * const transparent = new Color(1, 0, 0, 0.5);
     * console.log(transparent.hex); // "#FF000080"
     * ```
     */
    get hex(): string;
    /**
     * Returns the approximate luminance (brightness) of the color.
     *
     * @example
     * ```typescript
     * const white = Color.white();
     * console.log(white.brightness); // 1
     * ```
     */
    get brightness(): number;
    /**
     * Performs linear interpolation between this color and another.
     *
     * @param other - The target color.
     * @param t - Interpolation factor in [0, 1].
     * @returns A new Color at the interpolated position.
     * @throws If `t` is outside the [0, 1] range.
     * @example
     * ```typescript
     * const black = Color.black();
     * const white = Color.white();
     * const gray = black.lerp(white, 0.5); // mid-gray
     * ```
     */
    lerp(other: Color, t: number): Color;
    /**
     * Creates a deep copy of this color.
     *
     * @returns A new Color with the same channel values.
     * @example
     * ```typescript
     * const original = Color.red();
     * const copy = original.clone();
     * ```
     */
    clone(): Color;
    /**
     * Compares colors with tolerance for floating-point errors.
     *
     * @param other - The other color.
     * @param epsilon - Tolerance (default `1e-6`).
     * @returns `true` if all channels are within `epsilon`.
     * @example
     * ```typescript
     * const a = new Color(1, 0, 0);
     * const b = new Color(1, 0, 0);
     * console.log(a.equals(b)); // true
     * ```
     */
    equals(other: Color, epsilon?: number): boolean;
    /**
     * Returns a new Color with the same RGB but a new alpha.
     *
     * @param alpha - The new alpha value, in [0, 1].
     * @returns A new Color instance with the updated alpha.
     * @example
     * ```typescript
     * const opaqueRed = Color.red();
     * const halfRed = opaqueRed.withAlpha(0.5);
     * ```
     */
    withAlpha(alpha: number): Color;
    /**
     * Returns a new Color darkened (multiplied by factor).
     *
     * @param factor - Multiplier applied to each RGB channel (e.g. 0.5 for half brightness).
     * @returns A new, darker Color.
     * @example
     * ```typescript
     * const red = Color.red();
     * const darkRed = red.darken(0.5);
     * ```
     */
    darken(factor: number): Color;
    /**
     * Returns a new Color lightened.
     *
     * @param factor - The lightening amount; internally applies `darken(1 + factor)`.
     * @returns A new, lighter Color.
     * @example
     * ```typescript
     * const red = Color.red();
     * const lighterRed = red.lighten(0.2);
     * ```
     */
    lighten(factor: number): Color;
    /**
     * Creates a Color from a hexadecimal string.
     * Supports formats: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`.
     *
     * @param hex - The hex string including '#'.
     * @returns A new Color instance.
     * @throws If the string doesn't start with `#`, has an invalid length, or contains non-hex characters.
     * @example
     * ```typescript
     * const c1 = Color.fromHex("#FF0000");
     * const c2 = Color.fromHex("#F00"); // shorthand, same as above
     * const c3 = Color.fromHex("#FF000080"); // with alpha
     * ```
     */
    static fromHex(hex: string): Color;
    /**
     * Creates a Color from integer RGB (0-255) channels.
     *
     * @param r - Red channel (0-255).
     * @param g - Green channel (0-255).
     * @param b - Blue channel (0-255).
     * @param a - Alpha channel (0-255), optional.
     * @returns A new Color instance.
     * @throws If any channel is not finite or is outside the [0, 255] range.
     * @example
     * ```typescript
     * const orange = Color.fromRgb(255, 165, 0);
     * ```
     */
    static fromRgb(r: number, g: number, b: number, a?: number): Color;
    /**
     * Returns pure white `Color(1, 1, 1)`.
     *
     * @example
     * ```typescript
     * const white = Color.white();
     * ```
     */
    static white(): Color;
    /**
     * Returns pure black `Color(0, 0, 0)`.
     *
     * @example
     * ```typescript
     * const black = Color.black();
     * ```
     */
    static black(): Color;
    /**
     * Returns pure red `Color(1, 0, 0)`.
     *
     * @example
     * ```typescript
     * const red = Color.red();
     * ```
     */
    static red(): Color;
    /**
     * Returns pure green `Color(0, 1, 0)`.
     *
     * @example
     * ```typescript
     * const green = Color.green();
     * ```
     */
    static green(): Color;
    /**
     * Returns pure blue `Color(0, 0, 1)`.
     *
     * @example
     * ```typescript
     * const blue = Color.blue();
     * ```
     */
    static blue(): Color;
    /**
     * Returns fully transparent black `Color(0, 0, 0, 0)`.
     *
     * @example
     * ```typescript
     * const transparent = Color.transparent();
     * ```
     */
    static transparent(): Color;
}
//# sourceMappingURL=Color.d.ts.map