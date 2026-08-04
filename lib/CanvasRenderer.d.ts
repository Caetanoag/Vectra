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
 */
export declare class CanvasRenderer {
    canvas: HTMLCanvasElement;
    private readonly ctx;
    /**
     * @param canvas - The HTML canvas element to render to.
     * @throws Error if a 2D context is not available.
     */
    constructor(canvas: HTMLCanvasElement);
    /** The current canvas width in pixels. */
    get width(): number;
    /** The current canvas height in pixels. */
    get height(): number;
    /**The bounding box of the canvas */
    get boundingRect(): Rect;
    /** The raw Canvas 2D rendering context. Use cautiously. */
    get context(): CanvasRenderingContext2D;
    /**
     * Resizes the canvas element.
     * @param width - New width in pixels.
     * @param height - New height in pixels.
     */
    setSize(width: number, height: number): void;
    /**
     * Clears the canvas, optionally within a region.
     * @param rect - If provided, only clears that area.
     */
    clear(rect?: Rect): void;
    /** Fills a rectangle with a solid color. */
    fillRect(rect: Rect, color: Color): void;
    /** Draws the border of a rectangle. */
    strokeRect(rect: Rect, color: Color, lineWidth?: number): void;
    /** Fills a circle with a solid color. */
    fillCircle(center: Vector2, radius: number, color: Color): void;
    /** Draws the outline of a circle. */
    strokeCircle(center: Vector2, radius: number, color: Color, lineWidth?: number): void;
    /** Fills a polygon defined by a list of vertices. */
    fillPolygon(points: Vector2[], color: Color): void;
    /** Draws the outline of a polygon. */
    strokePolygon(points: Vector2[], color: Color, lineWidth?: number): void;
    /** Draws a line segment between two points. */
    drawLine(from: Vector2, to: Vector2, color: Color, lineWidth?: number): void;
    /** Translates the canvas context. */
    translate(dx: number, dy: number): void;
    /** Rotates the canvas context. */
    rotate(angle: number): void;
    /** Scales the canvas context. */
    scale(sx: number, sy: number): void;
    /** Saves the current drawing state. */
    save(): void;
    /** Restores the most recently saved drawing state. */
    restore(): void;
    /** Resets the transform to identity. */
    resetTransform(): void;
    /** Multiplies the current transform by a Matrix3. */
    applyMatrix(matrix: Matrix3): void;
    /** Multiplies the current transform by a Transform's world matrix. */
    applyTransform(transform: Transform): void;
    /** Sets the current transform to a Transform's world matrix. */
    setTransform(transform: Transform): void;
    /** Builds the CSS font string from options. */
    private getFontString;
    /**
     * Fills text with a solid color.
     * @param text - The text string to render.
     * @param position - The anchor position.
     * @param color - The fill color.
     * @param options - Text styling options.
     */
    fillText(text: string, position: Vector2, color: Color, options?: TextOptions): void;
    /**
     * Strokes (outlines) text.
     * @param text - The text string to render.
     * @param position - The anchor position.
     * @param color - The stroke color.
     * @param options - Text styling options.
     */
    strokeText(text: string, position: Vector2, color: Color, options?: TextOptions): void;
    /**
     * Measures the dimensions of text with given options.
     * @param text - The text string to measure.
     * @param options - Text styling options.
     * @returns The TextMetrics object.
     */
    measureText(text: string, options?: TextOptions): TextMetrics;
    /** Adds a circle path to the context (does not fill or stroke). */
    private createCircle;
    /** Adds a polygon path to the context (does not fill or stroke). */
    private createPolygon;
}
export {};
//# sourceMappingURL=CanvasRenderer.d.ts.map