import {
	CanvasRenderer,
	Color,
	InputManager,
	Rect,
	Transform,
	Vector2,
} from "https://cdn.jsdelivr.net/gh/reinhackVancheat/Vectra@26aed1a0b05e1f3f0d8cfa7bbaef90deb3ae53b3/lib/index.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
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

	renderer.setTransform(transform);
	renderer.fillRect(rect, rectColor);
	renderer.resetTransform();

	requestAnimationFrame(update);
}

update();
