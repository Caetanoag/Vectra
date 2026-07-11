import { CanvasRenderer } from "../dist/CanvasRenderer.js";
import { Color } from "../dist/Color.js";
import { Rect } from "../dist/Rect.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const renderer = new CanvasRenderer(canvas);
renderer.setSize(window.innerWidth, window.innerHeight);

const size = Math.min(canvas.width, canvas.height) * 0.1;
const rect = new Rect(
	(canvas.width - size) / 2,
	(canvas.height - size) / 2,
	size,
	size,
);

let speed = 2;
function loop() {
	renderer.clear(Color.fromHex("#222"));

	rect.translate(speed, speed);
	if (rect.right > canvas.width || rect.left < 0) {
		speed = -speed;
		rect.translate(speed, 0);
	}
	if (rect.bottom > canvas.height || rect.top < 0) {
		speed = -speed;
		rect.translate(0, speed);
	}
	renderer.fillRect(rect, Color.fromHex("#ff00ff"));

	requestAnimationFrame(loop);
}
loop();
