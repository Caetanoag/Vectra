import { Vector2 } from "./Vector2.js";

/**
 * Manages keyboard, mouse, and touch input.
 * Tracks key states (down/pressed), mouse position, and buttons.
 * Must call `update()` each frame to clear "pressed" states.
 */
interface Mouse {
	Position: Vector2;
	Buttons: Map<number, boolean>;
	MouseOver: boolean;
}
export class InputManager {
	private mouseInfo: Mouse;
	private keysDown: Map<string, boolean> = new Map();
	private readonly keysPressed: Map<string, boolean> = new Map();

	/**
	 * @param target - The element to listen for mouse/touch events. Keyboard events are always attached to `window`.
	 */
	constructor(private target: HTMLElement | Window) {
		this.mouseInfo = {
			Position: new Vector2(0, 0),
			Buttons: new Map(),
			MouseOver: false,
		};

		// Keyboard
		const handleKey = (e: KeyboardEvent, value: boolean) => {
			const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
			if (value && !this.keysDown.get(key)) {
				this.keysPressed.set(key, true);
			}
			this.keysDown.set(key, value);
		};
		window.addEventListener("keydown", (e: KeyboardEvent) =>
      handleKey(e, true),
    );
    window.addEventListener("keyup", (e: KeyboardEvent) => handleKey(e, false));

		// Mouse
		if (this.target instanceof HTMLElement) {
			this.target.addEventListener("mouseenter", () => {
				this.mouseInfo.MouseOver = true;
			});
			this.target.addEventListener("mousemove", (e: MouseEvent) => {
				const rect = (this.target as HTMLElement).getBoundingClientRect();
				this.mouseInfo.Position = new Vector2(
					e.clientX - rect.left,
					e.clientY - rect.top,
				);
			});
			this.target.addEventListener("mousedown", (e: MouseEvent) => {
				this.mouseInfo.Buttons.set(e.button, true);
				e.preventDefault();
			});
			this.target.addEventListener("mouseup", (e: MouseEvent) => {
				this.mouseInfo.Buttons.set(e.button, false);
				e.preventDefault();
			});
			this.target.addEventListener("mouseleave", () => {
				this.mouseInfo.Buttons.clear();
				this.mouseInfo.MouseOver = false;
			});
		}
	}

	/** Checks if a key is currently held down. */
	public isKeyDown(key: string): boolean {
		return this.keysDown.get(key) ?? false;
	}

	/** Checks if a key was just pressed in this frame (one-shot event). */
	public isKeyPressed(key: string): boolean {
		return this.keysPressed.get(key) ?? false;
	}

	/** Checks if a mouse button is held down (0 = left, 1 = middle, 2 = right). */
	public isMouseDown(button: number = 0): boolean {
		return this.mouseInfo.Buttons.get(button) ?? false;
	}

	/** Returns the current mouse position relative to the target element. */
	public getMousePosition(): Vector2 {
		return this.mouseInfo.Position;
	}

	/** Checks if the mouse is currently over the target element. */
	public isMouseOver(): boolean {
		return this.mouseInfo.MouseOver;
	}

	/** Resets "pressed" states. Must be called once per frame before checking inputs. */
	public update(): void {
		this.keysPressed.clear();
	}
}
