import type { Color } from "./Color.js";
import type { Matrix3 } from "./Matrix3.js";
import type { Rect } from "./Rect.js";
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
export class CanvasRenderer {
	private readonly ctx: CanvasRenderingContext2D;

	/**
	 * @param canvas - The HTML canvas element to render to.
	 * @throws Error if a 2D context is not available.
	 */
	constructor(public canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas 2D context not available.");
		this.ctx = ctx;
	}

	/** The current canvas width in pixels. */
	get width(): number {
		return this.canvas.width;
	}

	/** The current canvas height in pixels. */
	get height(): number {
		return this.canvas.height;
	}

	/** The raw Canvas 2D rendering context. Use cautiously. */
	get context(): CanvasRenderingContext2D {
		return this.ctx;
	}

	/**
	 * Resizes the canvas element.
	 * @param width - New width in pixels.
	 * @param height - New height in pixels.
	 */
	public setSize(width: number, height: number): void {
		this.canvas.width = width;
		this.canvas.height = height;
	}

	/**
	 * Clears the canvas, optionally within a region.
	 * @param rect - If provided, only clears that area.
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

	/** Fills a rectangle with a solid color. */
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

	/** Draws the border of a rectangle. */
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

	/** Fills a circle with a solid color. */
	public fillCircle(center: Vector2, radius: number, color: Color): void {
		this.context.save();
		this.context.fillStyle = color.hex;
		this.createCircle(center, radius);
		this.context.fill();
		this.context.restore();
	}

	/** Draws the outline of a circle. */
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

	/** Fills a polygon defined by a list of vertices. */
	public fillPolygon(points: Vector2[], color: Color): void {
		this.context.save();
		this.context.fillStyle = color.hex;
		this.createPolygon(points);
		this.context.fill();
		this.context.restore();
	}

	/** Draws the outline of a polygon. */
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

	/** Draws a line segment between two points. */
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

	/** Translates the canvas context. */
	public translate(dx: number, dy: number): void {
		if (!Number.isFinite(dx)) {
			throw new Error(`Dx must have finite value: ${dx}`);
		}
		if (!Number.isFinite(dy)) {
			throw new Error(`Dy must have finite value: ${dy}`);
		}
		this.context.translate(dx, dy);
	}

	/** Rotates the canvas context. */
	public rotate(angle: number): void {
		if (!Number.isFinite(angle)) {
			throw new Error("Angle must have finite value");
		}
		this.context.rotate(angle);
	}

	/** Scales the canvas context. */
	public scale(sx: number, sy: number): void {
		if (!Number.isFinite(sx)) {
			throw new Error(`sx must have finite value: ${sx}`);
		}
		if (!Number.isFinite(sy)) {
			throw new Error(`sy must have finite value: ${sy}`);
		}
		this.context.scale(sx, sy);
	}

	/** Saves the current drawing state. */
	public save(): void {
		this.context.save();
	}

	/** Restores the most recently saved drawing state. */
	public restore(): void {
		this.context.restore();
	}

	/** Resets the transform to identity. */
	public resetTransform(): void {
		this.context.setTransform(1, 0, 0, 1, 0, 0);
	}

	/** Multiplies the current transform by a Matrix3. */
	public applyMatrix(matrix: Matrix3): void {
		const [a, b, c, d, e, f] = matrix.toCanvasTransform();
		this.context.transform(a, b, c, d, e, f);
	}

	/** Multiplies the current transform by a Transform's world matrix. */
	public applyTransform(transform: Transform): void {
		const matrix = transform.getWorldMatrix();
		const [a, b, c, d, e, f] = matrix.toCanvasTransform();
		this.context.transform(a, b, c, d, e, f);
	}

	/** Sets the current transform to a Transform's world matrix. */
	public setTransform(transform: Transform): void {
		const matrix = transform.getWorldMatrix();
		const [a, b, c, d, e, f] = matrix.toCanvasTransform();
		this.context.setTransform(a, b, c, d, e, f);
	}

	// ============== Text ==============

	/** Builds the CSS font string from options. */
	private getFontString(options: TextOptions): string {
		const style = options.fontStyle ?? "normal";
		const weight = options.fontWeight ?? "normal";
		const size = options.fontSize ?? 16;
		const family = options.fontFamily ?? "sans-serif";
		return `${style} ${weight} ${size}px ${family}`;
	}

	/**
	 * Fills text with a solid color.
	 * @param text - The text string to render.
	 * @param position - The anchor position.
	 * @param color - The fill color.
	 * @param options - Text styling options.
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
	 * @param text - The text string to render.
	 * @param position - The anchor position.
	 * @param color - The stroke color.
	 * @param options - Text styling options.
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
	 * @param text - The text string to measure.
	 * @param options - Text styling options.
	 * @returns The TextMetrics object.
	 */
	public measureText(text: string, options: TextOptions = {}): TextMetrics {
		this.context.save();
		this.context.font = this.getFontString(options);
		const metrics = this.context.measureText(text);
		this.context.restore();
		return metrics;
	}

	// ============== Private helpers ==============

	/** Adds a circle path to the context (does not fill or stroke). */
	private createCircle(center: Vector2, radius: number): void {
		if (radius <= 0 || !Number.isFinite(radius)) {
			throw new Error("Radius must be a positive finite number.");
		}
		this.context.beginPath();
		this.context.arc(center.x, center.y, radius, 0, Math.PI * 2);
	}

	/** Adds a polygon path to the context (does not fill or stroke). */
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
