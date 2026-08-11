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
export class Color {
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

  /**
   * Returns the color channels as a tuple [r, g, b, a?].
   *
   * @example
   * ```typescript
   * const c = new Color(1, 0, 0, 0.5);
   * console.log(c.toArray); // [1, 0, 0, 0.5]
   * ```
   */
  public get toArray(): [number, number, number, number | undefined] {
    return [this.r, this.g, this.b, this.a];
  }

  /**
   * Returns the CSS `rgb(r, g, b)` string.
   *
   * @example
   * ```typescript
   * const c = new Color(1, 0, 0);
   * console.log(c.rgb); // "rgb(255,0,0)"
   * ```
   */
  public get rgb(): string {
    return `rgb(${Math.round(this.r * 255)},${Math.round(this.g * 255)},${Math.round(this.b * 255)})`;
  }

  /**
   * Returns the CSS `rgba(r, g, b, a)` string.
   *
   * @example
   * ```typescript
   * const c = new Color(1, 0, 0, 0.5);
   * console.log(c.rgba); // "rgba(255,0,0,0.5)"
   * ```
   */
  public get rgba(): string {
    const alpha = this.a !== undefined ? this.a : 1;
    return `rgba(${Math.round(this.r * 255)},${Math.round(this.g * 255)},${Math.round(this.b * 255)},${alpha})`;
  }

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

  /**
   * Returns the approximate luminance (brightness) of the color.
   *
   * @example
   * ```typescript
   * const white = Color.white();
   * console.log(white.brightness); // 1
   * ```
   */
  public get brightness(): number {
    return 0.299 * this.r + 0.587 * this.g + 0.114 * this.b;
  }
  /**
   * Returns the HSL (Hue, Saturation, Lightness) representation of the color.
   *
   * Hue is expressed in degrees (0–360), while saturation and lightness are
   * normalized values between 0 and 1. This conversion follows the standard
   * RGB-to-HSL algorithm.
   *
   * @returns An object containing the hue, saturation, and lightness components.
   *
   * @example
   * ```typescript
   * const red = Color.fromRgb(255, 0, 0);
   * console.log(red.hsl); // { hue: 0, saturation: 1, lightness: 0.5 }
   * ```
   *
   * @example
   * ```typescript
   * const gray = Color.fromRgb(128, 128, 128);
   * console.log(gray.hsl); // { hue: 0, saturation: 0, lightness: 0.5 }
   * ```
   *
   * @example
   * ```typescript
   * const white = Color.white();
   * console.log(white.hsl); // { hue: 0, saturation: 0, lightness: 1 }
   * ```
   */
  public get hsl(): { hue: number; saturation: number; lightness: number } {
    const getHue = (max: number, chroma: number) => {
      let hue: number = 60;
      if (chroma === 0) return 0;
      if (max === this.r) {
        hue *= (this.g - this.b) / chroma;
      } else if (max === this.g) {
        hue *= (this.b - this.r + 2 * chroma) / chroma;
      } else if (max === this.b) {
        hue *= (this.r - this.g + 4 * chroma) / chroma;
      }
      hue = (hue + 360) % 360;
      return hue;
    };
    const max = Math.max(this.r, this.g, this.b);
    const min = Math.min(this.r, this.g, this.b);
    const chroma = max - min;
    const lightness = (max + min) / 2;
    const saturation = () => {
      if (chroma === 0) return 0;
      return chroma / (1 - Math.abs(2 * lightness - 1));
    };
    return {
      hue: getHue(max, chroma),
      saturation: saturation(),
      lightness: lightness,
    };
  }
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
  public clone(): Color {
    return new Color(this.r, this.g, this.b, this.a);
  }

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
  public withAlpha(alpha: number): Color {
    return new Color(this.r, this.g, this.b, alpha);
  }

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
  public darken(factor: number): Color {
    return new Color(this.r * factor, this.g * factor, this.b * factor, this.a);
  }
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
  public lighten(factor: number): Color {
    return this.darken(Math.min(1, 1 + factor));
  }
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
  /**
   * Returns pure white `Color(1, 1, 1)`.
   *
   * @example
   * ```typescript
   * const white = Color.white();
   * ```
   */
  static white(): Color {
    return new Color(1, 1, 1);
  }

  /**
   * Returns pure black `Color(0, 0, 0)`.
   *
   * @example
   * ```typescript
   * const black = Color.black();
   * ```
   */
  static black(): Color {
    return new Color(0, 0, 0);
  }

  /**
   * Returns pure red `Color(1, 0, 0)`.
   *
   * @example
   * ```typescript
   * const red = Color.red();
   * ```
   */
  static red(): Color {
    return new Color(1, 0, 0);
  }

  /**
   * Returns pure green `Color(0, 1, 0)`.
   *
   * @example
   * ```typescript
   * const green = Color.green();
   * ```
   */
  static green(): Color {
    return new Color(0, 1, 0);
  }

  /**
   * Returns pure blue `Color(0, 0, 1)`.
   *
   * @example
   * ```typescript
   * const blue = Color.blue();
   * ```
   */
  static blue(): Color {
    return new Color(0, 0, 1);
  }

  /**
   * Returns fully transparent black `Color(0, 0, 0, 0)`.
   *
   * @example
   * ```typescript
   * const transparent = Color.transparent();
   * ```
   */
  static transparent(): Color {
    return new Color(0, 0, 0, 0);
  }
}
