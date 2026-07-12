import {
	Color,
	InputManager,
	Rect,
	Transform,
	Vector2,
} from "https://cdn.jsdelivr.net/gh/reinhackVancheat/Vectra/lib/index.js";
/**
 * Wraps the HTML Canvas 2D context providing a higher-level API.
 * Handles shapes, transforms, text, and state management.
 */
export class CanvasRenderer {
	canvas;
	ctx;
	/**
	 * @param canvas - The HTML canvas element to render to.
	 * @throws Error if a 2D context is not available.
	 */
	constructor(canvas) {
		this.canvas = canvas;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas 2D context not available.");
		this.ctx = ctx;
	}
	/** The current canvas width in pixels. */
	get width() {
		return this.canvas.width;
	}
	/** The current canvas height in pixels. */
	get height() {
		return this.canvas.height;
	}
	/** The raw Canvas 2D rendering context. Use cautiously. */
	get context() {
		return this.ctx;
	}
	/**
	 * Resizes the canvas element.
	 * @param width - New width in pixels.
	 * @param height - New height in pixels.
	 */
	setSize(width, height) {
		this.canvas.width = width;
		this.canvas.height = height;
	}
	/**
	 * Clears the canvas, optionally within a region.
	 * @param rect - If provided, only clears that area.
	 */
	clear(rect) {
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
	fillRect(rect, color) {
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
	strokeRect(rect, color, lineWidth) {
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
	fillCircle(center, radius, color) {
		this.context.save();
		this.context.fillStyle = color.hex;
		this.createCircle(center, radius);
		this.context.fill();
		this.context.restore();
	}
	/** Draws the outline of a circle. */
	strokeCircle(center, radius, color, lineWidth) {
		this.context.save();
		this.context.lineWidth = lineWidth ?? 2;
		this.context.strokeStyle = color.hex;
		this.createCircle(center, radius);
		this.context.stroke();
		this.context.restore();
	}
	/** Fills a polygon defined by a list of vertices. */
	fillPolygon(points, color) {
		this.context.save();
		this.context.fillStyle = color.hex;
		this.createPolygon(points);
		this.context.fill();
		this.context.restore();
	}
	/** Draws the outline of a polygon. */
	strokePolygon(points, color, lineWidth) {
		this.context.save();
		this.context.strokeStyle = color.hex;
		this.context.lineWidth = lineWidth ?? 2;
		this.createPolygon(points);
		this.context.stroke();
		this.context.restore();
	}
	/** Draws a line segment between two points. */
	drawLine(from, to, color, lineWidth) {
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
	translate(dx, dy) {
		if (!Number.isFinite(dx)) {
			throw new Error(`Dx must have finite value: ${dx}`);
		}
		if (!Number.isFinite(dy)) {
			throw new Error(`Dy must have finite value: ${dy}`);
		}
		this.context.translate(dx, dy);
	}
	/** Rotates the canvas context. */
	rotate(angle) {
		if (!Number.isFinite(angle)) {
			throw new Error("Angle must have finite value");
		}
		this.context.rotate(angle);
	}
	/** Scales the canvas context. */
	scale(sx, sy) {
		if (!Number.isFinite(sx)) {
			throw new Error(`sx must have finite value: ${sx}`);
		}
		if (!Number.isFinite(sy)) {
			throw new Error(`sy must have finite value: ${sy}`);
		}
		this.context.scale(sx, sy);
	}
	/** Saves the current drawing state. */
	save() {
		this.context.save();
	}
	/** Restores the most recently saved drawing state. */
	restore() {
		this.context.restore();
	}
	/** Resets the transform to identity. */
	resetTransform() {
		this.context.setTransform(1, 0, 0, 1, 0, 0);
	}
	/** Multiplies the current transform by a Matrix3. */
	applyMatrix(matrix) {
		const [a, b, c, d, e, f] = matrix.toCanvasTransform();
		this.context.transform(a, b, c, d, e, f);
	}
	/** Multiplies the current transform by a Transform's world matrix. */
	applyTransform(transform) {
		const matrix = transform.getWorldMatrix();
		const [a, b, c, d, e, f] = matrix.toCanvasTransform();
		this.context.transform(a, b, c, d, e, f);
	}
	/** Sets the current transform to a Transform's world matrix. */
	setTransform(transform) {
		const matrix = transform.getWorldMatrix();
		const [a, b, c, d, e, f] = matrix.toCanvasTransform();
		this.context.setTransform(a, b, c, d, e, f);
	}
	// ============== Text ==============
	/** Builds the CSS font string from options. */
	getFontString(options) {
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
	fillText(text, position, color, options = {}) {
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
	strokeText(text, position, color, options = {}) {
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
	measureText(text, options = {}) {
		this.context.save();
		this.context.font = this.getFontString(options);
		const metrics = this.context.measureText(text);
		this.context.restore();
		return metrics;
	}
	// ============== Private helpers ==============
	/** Adds a circle path to the context (does not fill or stroke). */
	createCircle(center, radius) {
		if (radius <= 0 || !Number.isFinite(radius)) {
			throw new Error("Radius must be a positive finite number.");
		}
		this.context.beginPath();
		this.context.arc(center.x, center.y, radius, 0, Math.PI * 2);
	}
	/** Adds a polygon path to the context (does not fill or stroke). */
	createPolygon(points) {
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

const canvas = document.getElementById("canvas");
const renderer = new CanvasRenderer(canvas);
const inputManager = new InputManager(canvas);
const transform = new Transform(new Vector2(300, 200), 0, new Vector2(1, 1));
const rect = new Rect(-100, -100, 200, 200);
const rectColor = Color.red();
function update() {
	renderer.clear(Color.white());
	inputManager.update();
	const mousePos = inputManager.getMousePosition();
	const angle = Math.atan2(
		mousePos.y - transform.position.y,
		mousePos.x - transform.position.x,
	);
	transform.rotation = angle;
	console.log(Object.getPrototypeOf(renderer));
	console.log(renderer.setTransform);
	renderer.setTransform(transform);
	renderer.fillRect(rect, rectColor);
	renderer.resetTransform();
	requestAnimationFrame(update);
}
update();
