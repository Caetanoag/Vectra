import { Vector2 } from "./Vector2.js";

interface Mouse {
	Position: Vector2;
	Buttons: Map<number, boolean>;
	MouseOver: boolean;
}
export class InputManager {
	private mouseInfo: Mouse;
	private keysDown: Map<string, boolean> = new Map();
	private readonly keysPressed: Map<string, boolean> = new Map();
	constructor(private target: HTMLElement | Window) {
		this.mouseInfo = {
			Position: new Vector2(0, 0),
			Buttons: new Map(),
			MouseOver: false,
		};
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
	public isKeyDown(key: string): boolean {
		return this.keysDown.get(key) ?? false;
	}

	public isKeyPressed(key: string): boolean {
		return this.keysPressed.get(key) ?? false;
	}

	public isMouseDown(button: number = 0): boolean {
		return this.mouseInfo.Buttons.get(button) ?? false;
	}

	public getMousePosition(): Vector2 {
		return this.mouseInfo.Position;
	}
	public isMouseOver(): boolean {
		return this.mouseInfo.MouseOver;
	}
	public update(): void {
		this.keysPressed.clear();
	}
}
