export class CanvasRenderer {
    canvas;
    constructor(canvas) {
        this.canvas = canvas;
    }
    get context() {
        return this.canvas.getContext("2d");
    }
    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    clear(color, rect) {
        if (rect) {
            if (color) {
                this.fillRect(rect, color);
            }
            else {
                this.context.clearRect(rect.left, rect.top, rect.getWidth(), rect.getHeight());
            }
            return;
        }
        if (color) {
            this.context.fillStyle = color.hex;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        else {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    fillRect(rect, color) {
        this.context.save();
        this.context.fillStyle = color.hex;
        this.context.fillRect(rect.left, rect.top, rect.getWidth(), rect.getHeight());
        this.context.restore();
    }
    strokeRect(rect, color, lineWidth) {
        this.context.save();
        this.context.strokeStyle = color.hex;
        this.context.lineWidth = lineWidth ? lineWidth : 2;
        this.context.strokeRect(rect.left, rect.top, rect.getWidth(), rect.getHeight());
        this.context.restore();
    }
    createCircle(center, radius) {
        this.context.beginPath();
        this.context.arc(center.x, center.y, radius, 0, Math.PI * 2);
    }
    fillCircle(center, radius, color) {
        this.context.save();
        this.context.fillStyle = color.hex;
        this.createCircle(center, radius);
        this.context.fill();
        this.context.restore();
    }
    strokeCircle(center, radius, color, lineWidth) {
        this.context.save();
        this.context.lineWidth = lineWidth ? lineWidth : 2;
        this.context.strokeStyle = color.hex;
        this.createCircle(center, radius);
        this.context.stroke();
        this.context.restore();
    }
    fillPolygon(points, color) {
        this.context.save();
        this.context.fillStyle = color.hex;
        this.createPolygon(points);
        this.context.fill();
        this.context.restore();
    }
    createPolygon(points) {
        if (!points || points.length < 3) {
            throw new Error("Polygon must have at least 3 points.");
        }
        this.context.beginPath();
        const first = points[0];
        if (first)
            this.context.moveTo(first.x, first.y);
        for (let i = 1; i < points.length; i++) {
            const p = points[i];
            if (p)
                this.context.lineTo(p.x, p.y);
        }
        this.context.closePath();
    }
    strokePolygon(points, color, lineWidth) {
        this.context.save();
        this.context.strokeStyle = color.hex;
        this.context.lineWidth = lineWidth ?? 2;
        this.createPolygon(points);
        this.context.stroke();
        this.context.restore();
    }
    drawLine(from, to, color, lineWidth) {
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
