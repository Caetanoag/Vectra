import {
	CanvasRenderer,
	Color,
	InputManager,
	Rect,
	Transform,
	Vector2,
} from "https://cdn.jsdelivr.net/gh/reinhackVancheat/Vectra/lib/index.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const renderer = new CanvasRenderer(canvas);
renderer.setSize(window.innerWidth, window.innerHeight);
const inputManager = new InputManager(canvas);

const transform = new Transform(new Vector2(300, 200), 0, new Vector2(1, 1));
const rect = new Rect(-100, -100, 200, 200);
const rectColor = Color.red();

function update() {
	renderer.clear();
	inputManager.update();

	const mousePos = inputManager.getMousePosition();
	const angle = rect.position.getAngle(mousePos);
	transform.rotation = angle;

	renderer.setTransform(transform);
	renderer.fillRect(rect, rectColor);
	renderer.resetTransform();

	requestAnimationFrame(update);
}

update();
