import { Vector2 } from "./Vector2.js";
/**
 * Manages keyboard, mouse, and touch input.
 * Tracks key states (down/pressed), mouse position, and buttons.
 * Must call `update()` each frame to clear "pressed" states.
 *
 * @example
 * ```typescript
 * const canvas = document.getElementById("game") as HTMLCanvasElement;
 * const input = new InputManager(canvas);
 *
 * function gameLoop() {
 *     if (input.isKeyPressed(" ")) {
 *         console.log("Jump!");
 *     }
 *     input.update(); // clear one-shot "pressed" states
 *     requestAnimationFrame(gameLoop);
 * }
 * ```
 */
export class InputManager {
    target;
    mouseInfo;
    keysDown = new Map();
    keysPressed = new Map();
    /**
     * Creates a new InputManager and attaches its event listeners.
     *
     * @param target - The element to listen for mouse/touch events. Keyboard events are always attached to `window`.
     * @example
     * ```typescript
     * // Listening on a specific canvas element:
     * const input = new InputManager(canvas);
     *
     * // Listening on the whole window:
     * const globalInput = new InputManager(window);
     * ```
     */
    constructor(target) {
        this.target = target;
        this.mouseInfo = {
            Position: new Vector2(0, 0),
            Buttons: new Map(),
            MouseOver: false,
        };
        // Keyboard
        const handleKey = (e, value) => {
            const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
            if (value && !this.keysDown.get(key)) {
                this.keysPressed.set(key, true);
            }
            this.keysDown.set(key, value);
        };
        window.addEventListener("keydown", (e) => handleKey(e, true));
        window.addEventListener("keyup", (e) => handleKey(e, false));
        // Mouse
        if (this.target instanceof HTMLElement) {
            this.target.addEventListener("mouseenter", () => {
                this.mouseInfo.MouseOver = true;
            });
            this.target.addEventListener("mousemove", (e) => {
                const rect = this.target.getBoundingClientRect();
                this.mouseInfo.Position = new Vector2(e.clientX - rect.left, e.clientY - rect.top);
            });
            this.target.addEventListener("mousedown", (e) => {
                this.mouseInfo.Buttons.set(e.button, true);
                e.preventDefault();
            });
            this.target.addEventListener("mouseup", (e) => {
                this.mouseInfo.Buttons.set(e.button, false);
                e.preventDefault();
            });
            this.target.addEventListener("mouseleave", () => {
                this.mouseInfo.Buttons.clear();
                this.mouseInfo.MouseOver = false;
            });
            // Dentro do construtor, após a configuração do mouse:
            this.target.addEventListener("touchstart", (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                if (touch) {
                    const rect = this.target.getBoundingClientRect();
                    this.mouseInfo.Position = new Vector2(touch.clientX - rect.left, touch.clientY - rect.top);
                    this.mouseInfo.Buttons.set(0, true); // simula clique esquerdo
                }
            }, { passive: false });
            this.target.addEventListener("touchmove", (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                if (touch) {
                    const rect = this.target.getBoundingClientRect();
                    this.mouseInfo.Position = new Vector2(touch.clientX - rect.left, touch.clientY - rect.top);
                }
            }, { passive: false });
            this.target.addEventListener("touchend", () => {
                this.mouseInfo.Buttons.set(0, false);
            });
        }
    }
    /**
     * Checks if a key is currently held down.
     *
     * @param key - The key to check (single characters are uppercase, e.g. `"A"`; special keys use their `KeyboardEvent.key` value, e.g. `"ArrowUp"`, `" "`).
     * @returns `true` while the key remains held.
     * @example
     * ```typescript
     * if (input.isKeyDown("ArrowRight")) {
     *     player.x += speed;
     * }
     * ```
     */
    isKeyDown(key) {
        return this.keysDown.get(key) ?? false;
    }
    /**
     * Checks if a key was just pressed in this frame (one-shot event).
     * Resets after the next call to `update()`.
     *
     * @param key - The key to check.
     * @returns `true` only on the frame the key transitioned from up to down.
     * @example
     * ```typescript
     * if (input.isKeyPressed("Enter")) {
     *     confirmSelection();
     * }
     * ```
     */
    isKeyPressed(key) {
        return this.keysPressed.get(key) ?? false;
    }
    /**
     * Checks if a mouse button is held down (0 = left, 1 = middle, 2 = right).
     *
     * @param button - The mouse button index (default: `0`, left button).
     * @returns `true` while the button remains held.
     * @example
     * ```typescript
     * if (input.isMouseDown(0)) {
     *     console.log("Left mouse button is held");
     * }
     * ```
     */
    isMouseDown(button = 0) {
        return this.mouseInfo.Buttons.get(button) ?? false;
    }
    /**
     * Returns the current mouse position relative to the target element.
     *
     * @returns A Vector2 with the mouse coordinates relative to the target's bounding box.
     * @example
     * ```typescript
     * const pos = input.getMousePosition();
     * console.log(`Mouse at ${pos.x}, ${pos.y}`);
     * ```
     */
    getMousePosition() {
        return this.mouseInfo.Position;
    }
    /**
     * Checks if the mouse is currently over the target element.
     *
     * @returns `true` if the cursor is within the target element's bounds.
     * @example
     * ```typescript
     * if (input.isMouseOver()) {
     *     canvas.style.cursor = "pointer";
     * }
     * ```
     */
    isMouseOver() {
        return this.mouseInfo.MouseOver;
    }
    /**
     * Resets "pressed" states. Must be called once per frame before checking inputs.
     *
     * @example
     * ```typescript
     * function gameLoop() {
     *     // ...check input state...
     *     input.update();
     *     requestAnimationFrame(gameLoop);
     * }
     * ```
     */
    update() {
        this.keysPressed.clear();
    }
}
//# sourceMappingURL=InputManager.js.map