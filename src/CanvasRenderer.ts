import type { Color } from "./Color.js";
import type { Matrix3 } from "./Matrix3.js";
import { Rect } from "./Rect.js";
import type { Transform } from "./Transform.js";
import type { Vector2 } from "./Vector2.js";

/** Options for text rendering. */
interface TextOptions {
  /** Font family (default: 'sans-serif'). */
  fontFamily?: string;
  /** Font size in pixels (default: 16). */
  fontSize?: number;
  /** Font style: 'normal', 'italic', or 'oblique' (default: 'normal'). */
  fontStyle?: "normal" | "italic" | "oblique";
  /** Font weight (default: 'normal'). */
  fontWeight?: string;
  /** Text alignment (default: 'start'). */
  textAlign?: CanvasTextAlign;
  /** Text baseline (default: 'alphabetic'). */
  textBaseline?: CanvasTextBaseline;
  /** Maximum width for rendering (optional). */
  maxWidth?: number;
}

/**
 * Wraps the HTML Canvas 2D context providing a higher-level API.
 * Handles shapes, transforms, text, and state management.
 *
 * @example
 * ```typescript
 * const canvas = document.getElementById("scene") as HTMLCanvasElement;
 * const renderer = new CanvasRenderer(canvas);
 *
 * renderer.clear();
 * renderer.fillRect(new Rect(10, 10, 100, 50), Color.red());
 * ```
 */
export class CanvasRenderer {
  private readonly ctx: CanvasRenderingContext2D;

  /**
   * Creates a new CanvasRenderer bound to a canvas element.
   *
   * @param canvas - The HTML canvas element to render to.
   * @throws If a 2D context is not available.
   * @example
   * ```typescript
   * const canvas = document.querySelector("canvas")!;
   * const renderer = new CanvasRenderer(canvas);
   * ```
   */
  constructor(public canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context not available.");
    this.ctx = ctx;
  }

  /**
   * The current canvas width in pixels.
   *
   * @example
   * ```typescript
   * console.log(renderer.width); // e.g. 800
   * ```
   */
  get width(): number {
    return this.canvas.width;
  }

  /**
   * The current canvas height in pixels.
   *
   * @example
   * ```typescript
   * console.log(renderer.height); // e.g. 600
   * ```
   */
  get height(): number {
    return this.canvas.height;
  }

  /**
   * The bounding box of the canvas.
   *
   * @example
   * ```typescript
   * const bounds = renderer.boundingRect; // Rect(0, 0, width, height)
   * ```
   */
  get boundingRect(): Rect {
    return new Rect(0, 0, this.width, this.height);
  }

  /**
   * The raw Canvas 2D rendering context. Use cautiously.
   *
   * @example
   * ```typescript
   * // Drop down to the native API for something not wrapped by CanvasRenderer:
   * renderer.context.globalAlpha = 0.5;
   * ```
   */
  get context(): CanvasRenderingContext2D {
    return this.ctx;
  }

  /**
   * Resizes the canvas element.
   *
   * @param width - New width in pixels.
   * @param height - New height in pixels.
   * @example
   * ```typescript
   * renderer.setSize(1024, 768);
   * ```
   */
  public setSize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * Clears the canvas, optionally within a region.
   *
   * @param rect - If provided, only clears that area; otherwise clears the entire canvas.
   * @example
   * ```typescript
   * renderer.clear(); // clear everything
   * renderer.clear(new Rect(0, 0, 100, 100)); // clear just the top-left corner
   * ```
   */
  public clear(rect?: Rect): void {
    if (rect) {
      this.context.clearRect(
        rect.left,
        rect.top,
        rect.getWidth(),
        rect.getHeight(),
      );
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // ============== Shapes ==============

  /**
   * Fills a rectangle with a solid color.
   *
   * @param rect - The rectangle to fill.
   * @param color - The fill color.
   * @example
   * ```typescript
   * renderer.fillRect(new Rect(10, 10, 200, 100), Color.blue());
   * ```
   */
  public fillRect(rect: Rect, color: Color): void {
    this.context.save();
    this.context.fillStyle = color.hex;
    this.context.fillRect(
      rect.left,
      rect.top,
      rect.getWidth(),
      rect.getHeight(),
    );
    this.context.restore();
  }

  /**
   * Draws the border of a rectangle.
   *
   * @param rect - The rectangle to outline.
   * @param color - The stroke color.
   * @param lineWidth - The line width in pixels (default: `2`).
   * @example
   * ```typescript
   * renderer.strokeRect(new Rect(10, 10, 200, 100), Color.black(), 3);
   * ```
   */
  public strokeRect(rect: Rect, color: Color, lineWidth?: number): void {
    this.context.save();
    this.context.strokeStyle = color.hex;
    this.context.lineWidth = lineWidth ?? 2;
    this.context.strokeRect(
      rect.left,
      rect.top,
      rect.getWidth(),
      rect.getHeight(),
    );
    this.context.restore();
  }

  /**
   * Fills a circle with a solid color.
   *
   * @param center - The center point of the circle.
   * @param radius - The circle's radius. Must be a positive, finite number.
   * @param color - The fill color.
   * @throws If `radius` is not a positive finite number.
   * @example
   * ```typescript
   * renderer.fillCircle(new Vector2(150, 150), 40, Color.green());
   * ```
   */
  public fillCircle(center: Vector2, radius: number, color: Color): void {
    this.context.save();
    this.context.fillStyle = color.hex;
    this.createCircle(center, radius);
    this.context.fill();
    this.context.restore();
  }

  /**
   * Draws the outline of a circle.
   *
   * @param center - The center point of the circle.
   * @param radius - The circle's radius. Must be a positive, finite number.
   * @param color - The stroke color.
   * @param lineWidth - The line width in pixels (default: `2`).
   * @throws If `radius` is not a positive finite number.
   * @example
   * ```typescript
   * renderer.strokeCircle(new Vector2(150, 150), 40, Color.black());
   * ```
   */
  public strokeCircle(
    center: Vector2,
    radius: number,
    color: Color,
    lineWidth?: number,
  ): void {
    this.context.save();
    this.context.lineWidth = lineWidth ?? 2;
    this.context.strokeStyle = color.hex;
    this.createCircle(center, radius);
    this.context.stroke();
    this.context.restore();
  }

  /**
   * Fills a polygon defined by a list of vertices.
   *
   * @param points - The polygon's vertices, in order. Must contain at least 3 points.
   * @param color - The fill color.
   * @throws If fewer than 3 points are provided, or if any point has non-finite coordinates.
   * @example
   * ```typescript
   * const triangle = [
   *     new Vector2(100, 0),
   *     new Vector2(200, 100),
   *     new Vector2(0, 100),
   * ];
   * renderer.fillPolygon(triangle, Color.red());
   * ```
   */
  public fillPolygon(points: Vector2[], color: Color): void {
    this.context.save();
    this.context.fillStyle = color.hex;
    this.createPolygon(points);
    this.context.fill();
    this.context.restore();
  }

  /**
   * Draws the outline of a polygon.
   *
   * @param points - The polygon's vertices, in order. Must contain at least 3 points.
   * @param color - The stroke color.
   * @param lineWidth - The line width in pixels (default: `2`).
   * @throws If fewer than 3 points are provided, or if any point has non-finite coordinates.
   * @example
   * ```typescript
   * const triangle = [
   *     new Vector2(100, 0),
   *     new Vector2(200, 100),
   *     new Vector2(0, 100),
   * ];
   * renderer.strokePolygon(triangle, Color.black());
   * ```
   */
  public strokePolygon(
    points: Vector2[],
    color: Color,
    lineWidth?: number,
  ): void {
    this.context.save();
    this.context.strokeStyle = color.hex;
    this.context.lineWidth = lineWidth ?? 2;
    this.createPolygon(points);
    this.context.stroke();
    this.context.restore();
  }

  /**
   * Draws a line segment between two points.
   *
   * @param from - The starting point.
   * @param to - The ending point.
   * @param color - The line color.
   * @param lineWidth - The line width in pixels (default: `2`).
   * @throws If `from` or `to` has non-finite coordinates.
   * @example
   * ```typescript
   * renderer.drawLine(new Vector2(0, 0), new Vector2(100, 100), Color.black(), 4);
   * ```
   */
  public drawLine(
    from: Vector2,
    to: Vector2,
    color: Color,
    lineWidth?: number,
  ): void {
    if (!Number.isFinite(from.x) || !Number.isFinite(from.y)) {
      throw new Error("From must have finite coordinates.");
    }
    if (!Number.isFinite(to.x) || !Number.isFinite(to.y)) {
      throw new Error("To must have finite coordinates.");
    }
    this.context.save();
    this.context.strokeStyle = color.hex;
    this.context.lineWidth = lineWidth ?? 2;
    this.context.beginPath();
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(to.x, to.y);
    this.context.stroke();
    this.context.restore();
  }

  // ============== Transforms ==============

  /**
   * Translates the canvas context.
   *
   * @param dx - X offset.
   * @param dy - Y offset.
   * @throws If `dx` or `dy` is not finite.
   * @example
   * ```typescript
   * renderer.translate(50, 50);
   * renderer.fillRect(new Rect(0, 0, 10, 10), Color.red()); // drawn at (50, 50)
   * ```
   */
  public translate(dx: number, dy: number): void {
    if (!Number.isFinite(dx)) {
      throw new Error(`Dx must have finite value: ${dx}`);
    }
    if (!Number.isFinite(dy)) {
      throw new Error(`Dy must have finite value: ${dy}`);
    }
    this.context.translate(dx, dy);
  }

  /**
   * Rotates the canvas context.
   *
   * @param angle - The rotation angle in radians.
   * @throws If `angle` is not finite.
   * @example
   * ```typescript
   * renderer.rotate(Math.PI / 4); // rotate subsequent drawing by 45 degrees
   * ```
   */
  public rotate(angle: number): void {
    if (!Number.isFinite(angle)) {
      throw new Error("Angle must have finite value");
    }
    this.context.rotate(angle);
  }

  /**
   * Scales the canvas context.
   *
   * @param sx - X scale factor.
   * @param sy - Y scale factor.
   * @throws If `sx` or `sy` is not finite.
   * @example
   * ```typescript
   * renderer.scale(2, 2); // subsequent drawing is doubled in size
   * ```
   */
  public scale(sx: number, sy: number): void {
    if (!Number.isFinite(sx)) {
      throw new Error(`sx must have finite value: ${sx}`);
    }
    if (!Number.isFinite(sy)) {
      throw new Error(`sy must have finite value: ${sy}`);
    }
    this.context.scale(sx, sy);
  }

  /**
   * Saves the current drawing state.
   *
   * @example
   * ```typescript
   * renderer.save();
   * renderer.rotate(Math.PI / 2);
   * renderer.fillRect(new Rect(0, 0, 50, 50), Color.red());
   * renderer.restore(); // undo the rotation
   * ```
   */
  public save(): void {
    this.context.save();
  }

  /**
   * Restores the most recently saved drawing state.
   *
   * @example
   * ```typescript
   * renderer.save();
   * // ...modify state...
   * renderer.restore();
   * ```
   */
  public restore(): void {
    this.context.restore();
  }

  /**
   * Resets the transform to identity.
   *
   * @example
   * ```typescript
   * renderer.translate(100, 100);
   * renderer.resetTransform(); // back to (0, 0) origin
   * ```
   */
  public resetTransform(): void {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  /**
   * Multiplies the current transform by a Matrix3.
   *
   * @param matrix - The matrix to apply.
   * @example
   * ```typescript
   * const m = Matrix3.translation(50, 50).rotate(Math.PI / 4);
   * renderer.applyMatrix(m);
   * ```
   */
  public applyMatrix(matrix: Matrix3): void {
    const [a, b, c, d, e, f] = matrix.toCanvasTransform();
    this.context.transform(a, b, c, d, e, f);
  }

  /**
   * Multiplies the current transform by a Transform's world matrix.
   *
   * @param transform - The transform whose world matrix will be applied.
   * @example
   * ```typescript
   * const entityTransform = new Transform(new Vector2(100, 100));
   * renderer.applyTransform(entityTransform);
   * renderer.fillRect(new Rect(-10, -10, 20, 20), Color.red());
   * ```
   */
  public applyTransform(transform: Transform): void {
    const matrix = transform.getWorldMatrix();
    const [a, b, c, d, e, f] = matrix.toCanvasTransform();
    this.context.transform(a, b, c, d, e, f);
  }

  /**
   * Sets the current transform to a Transform's world matrix, discarding any
   * previously accumulated transform.
   *
   * @param transform - The transform whose world matrix will replace the current transform.
   * @example
   * ```typescript
   * renderer.setTransform(entityTransform);
   * ```
   */
  public setTransform(transform: Transform): void {
    const matrix = transform.getWorldMatrix();
    const [a, b, c, d, e, f] = matrix.toCanvasTransform();
    this.context.setTransform(a, b, c, d, e, f);
  }

  // ============== Text ==============

  /**
   * Builds the CSS font string from options.
   * @private
   */
  private getFontString(options: TextOptions): string {
    const style = options.fontStyle ?? "normal";
    const weight = options.fontWeight ?? "normal";
    const size = options.fontSize ?? 16;
    const family = options.fontFamily ?? "sans-serif";
    return `${style} ${weight} ${size}px ${family}`;
  }

  /**
   * Fills text with a solid color.
   *
   * @param text - The text string to render.
   * @param position - The anchor position.
   * @param color - The fill color.
   * @param options - Text styling options.
   * @throws If `position` has non-finite coordinates.
   * @example
   * ```typescript
   * renderer.fillText("Score: 100", new Vector2(20, 30), Color.white(), {
   *     fontSize: 24,
   *     fontWeight: "bold",
   * });
   * ```
   */
  public fillText(
    text: string,
    position: Vector2,
    color: Color,
    options: TextOptions = {},
  ): void {
    if (!Number.isFinite(position.x) || !Number.isFinite(position.y)) {
      throw new Error("Position must have finite coordinates.");
    }
    this.context.save();
    this.context.font = this.getFontString(options);
    if (options.textAlign) this.context.textAlign = options.textAlign;
    if (options.textBaseline) this.context.textBaseline = options.textBaseline;
    this.context.fillStyle = color.hex;
    if (options.maxWidth !== undefined) {
      this.context.fillText(text, position.x, position.y, options.maxWidth);
    } else {
      this.context.fillText(text, position.x, position.y);
    }
    this.context.restore();
  }

  /**
   * Strokes (outlines) text.
   *
   * @param text - The text string to render.
   * @param position - The anchor position.
   * @param color - The stroke color.
   * @param options - Text styling options.
   * @throws If `position` has non-finite coordinates.
   * @example
   * ```typescript
   * renderer.strokeText("OUTLINE", new Vector2(50, 50), Color.black(), {
   *     fontSize: 32,
   * });
   * ```
   */
  public strokeText(
    text: string,
    position: Vector2,
    color: Color,
    options: TextOptions = {},
  ): void {
    if (!Number.isFinite(position.x) || !Number.isFinite(position.y)) {
      throw new Error("Position must have finite coordinates.");
    }
    this.context.save();
    this.context.font = this.getFontString(options);
    if (options.textAlign) this.context.textAlign = options.textAlign;
    if (options.textBaseline) this.context.textBaseline = options.textBaseline;
    this.context.strokeStyle = color.hex;
    if (options.maxWidth !== undefined) {
      this.context.strokeText(text, position.x, position.y, options.maxWidth);
    } else {
      this.context.strokeText(text, position.x, position.y);
    }
    this.context.restore();
  }

  /**
   * Measures the dimensions of text with given options.
   *
   * @param text - The text string to measure.
   * @param options - Text styling options.
   * @returns The TextMetrics object describing the rendered size of `text`.
   * @example
   * ```typescript
   * const metrics = renderer.measureText("Hello", { fontSize: 20 });
   * console.log(metrics.width);
   * ```
   */
  public measureText(text: string, options: TextOptions = {}): TextMetrics {
    this.context.save();
    this.context.font = this.getFontString(options);
    const metrics = this.context.measureText(text);
    this.context.restore();
    return metrics;
  }

  // ============== Private helpers ==============

  /**
   * Adds a circle path to the context (does not fill or stroke).
   * @private
   */
  private createCircle(center: Vector2, radius: number): void {
    if (radius <= 0 || !Number.isFinite(radius)) {
      throw new Error("Radius must be a positive finite number.");
    }
    this.context.beginPath();
    this.context.arc(center.x, center.y, radius, 0, Math.PI * 2);
  }

  /**
   * Adds a polygon path to the context (does not fill or stroke).
   * @private
   */
  private createPolygon(points: Vector2[]): void {
    if (!points || points.length < 3) {
      throw new Error("Polygon must have at least 3 points.");
    }
    for (const p of points) {
      if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) {
        throw new Error("All polygon points must have finite coordinates.");
      }
    }
    this.context.beginPath();
    const first = points[0];
    if (first) this.context.moveTo(first.x, first.y);
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      if (p) this.context.lineTo(p.x, p.y);
    }
    this.context.closePath();
  }
}
