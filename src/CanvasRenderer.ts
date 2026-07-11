import type { Color } from "./Color.js";
import type { Rect } from "./Rect.js";
import type { Vector2 } from "./Vector2.js";
export class CanvasRenderer {
	constructor(public canvas: HTMLCanvasElement) {}

	get context(): CanvasRenderingContext2D {
		return this.canvas.getContext("2d") as CanvasRenderingContext2D;
	}
	get width(): number {
		return this.canvas.width;
	}
	get height(): number {
		return this.canvas.height;
	}
	public setSize(width: number, height: number): void {
		this.canvas.width = width;
		this.canvas.height = height;
	}
	public clear(color?: Color, rect?: Rect): void {
		if (rect) {
			if (color) {
				this.fillRect(rect, color);
			} else {
				this.context.clearRect(
					rect.left,
					rect.top,
					rect.getWidth(),
					rect.getHeight(),
				);
			}
			return;
		}
		if (color) {
			this.context.fillStyle = color.hex;
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		} else {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}

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
	public strokeRect(rect: Rect, color: Color, lineWidth?: number): void {
		this.context.save();
		this.context.strokeStyle = color.hex;
		this.context.lineWidth = lineWidth ? lineWidth : 2;
		this.context.strokeRect(
			rect.left,
			rect.top,
			rect.getWidth(),
			rect.getHeight(),
		);
		this.context.restore();
	}
	private createCircle(center: Vector2, radius: number): void {
		this.context.beginPath();
		this.context.arc(center.x, center.y, radius, 0, Math.PI * 2);
	}
	public fillCircle(center: Vector2, radius: number, color: Color): void {
		this.context.save();
		this.context.fillStyle = color.hex;
		this.createCircle(center, radius);
		this.context.fill();
		this.context.restore();
	}
	public strokeCircle(
		center: Vector2,
		radius: number,
		color: Color,
		lineWidth?: number,
	): void {
		this.context.save();
		this.context.lineWidth = lineWidth ? lineWidth : 2;
		this.context.strokeStyle = color.hex;
		this.createCircle(center, radius);
		this.context.stroke();
		this.context.restore();
	}
	public fillPolygon(points: Vector2[], color: Color): void {
		this.context.save();
		this.context.fillStyle = color.hex;
		this.createPolygon(points);
		this.context.fill();
		this.context.restore();
	}
	private createPolygon(points: Vector2[]) {
		if (!points || points.length < 3) {
			throw new Error("Polygon must have at least 3 points.");
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
	public drawLine(
		from: Vector2,
		to: Vector2,
		color: Color,
		lineWidth?: number,
	): void {
		this.context.save();
		this.context.strokeStyle = color.hex;
		this.context.lineWidth = lineWidth ? lineWidth : 2;
		this.context.beginPath();
		this.context.moveTo(from.x, from.y);
		this.context.lineTo(to.x, to.y);
		this.context.stroke();
		this.context.restore();
	}
}
