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
export declare class CanvasRenderer {
    canvas: HTMLCanvasElement;
    private readonly ctx;
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
    constructor(canvas: HTMLCanvasElement);
    /**
     * The current canvas width in pixels.
     *
     * @example
     * ```typescript
     * console.log(renderer.width); // e.g. 800
     * ```
     */
    get width(): number;
    /**
     * The current canvas height in pixels.
     *
     * @example
     * ```typescript
     * console.log(renderer.height); // e.g. 600
     * ```
     */
    get height(): number;
    /**
     * The bounding box of the canvas.
     *
     * @example
     * ```typescript
     * const bounds = renderer.boundingRect; // Rect(0, 0, width, height)
     * ```
     */
    get boundingRect(): Rect;
    /**
     * The raw Canvas 2D rendering context. Use cautiously.
     *
     * @example
     * ```typescript
     * // Drop down to the native API for something not wrapped by CanvasRenderer:
     * renderer.context.globalAlpha = 0.5;
     * ```
     */
    get context(): CanvasRenderingContext2D;
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
    setSize(width: number, height: number): void;
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
    clear(rect?: Rect): void;
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
    fillRect(rect: Rect, color: Color): void;
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
    strokeRect(rect: Rect, color: Color, lineWidth?: number): void;
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
    fillCircle(center: Vector2, radius: number, color: Color): void;
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
    strokeCircle(center: Vector2, radius: number, color: Color, lineWidth?: number): void;
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
    fillPolygon(points: Vector2[], color: Color): void;
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
    strokePolygon(points: Vector2[], color: Color, lineWidth?: number): void;
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
    drawLine(from: Vector2, to: Vector2, color: Color, lineWidth?: number): void;
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
    translate(dx: number, dy: number): void;
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
    rotate(angle: number): void;
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
    scale(sx: number, sy: number): void;
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
    save(): void;
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
    restore(): void;
    /**
     * Resets the transform to identity.
     *
     * @example
     * ```typescript
     * renderer.translate(100, 100);
     * renderer.resetTransform(); // back to (0, 0) origin
     * ```
     */
    resetTransform(): void;
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
    applyMatrix(matrix: Matrix3): void;
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
    applyTransform(transform: Transform): void;
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
    setTransform(transform: Transform): void;
    /**
     * Builds the CSS font string from options.
     * @private
     */
    private getFontString;
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
    fillText(text: string, position: Vector2, color: Color, options?: TextOptions): void;
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
    strokeText(text: string, position: Vector2, color: Color, options?: TextOptions): void;
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
    measureText(text: string, options?: TextOptions): TextMetrics;
    /**
     * Adds a circle path to the context (does not fill or stroke).
     * @private
     */
    private createCircle;
    /**
     * Adds a polygon path to the context (does not fill or stroke).
     * @private
     */
    private createPolygon;
}
export {};
//# sourceMappingURL=CanvasRenderer.d.ts.map