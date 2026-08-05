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
export declare class InputManager {
    private target;
    private mouseInfo;
    private keysDown;
    private readonly keysPressed;
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
    constructor(target: HTMLElement | Window);
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
    isKeyDown(key: string): boolean;
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
    isKeyPressed(key: string): boolean;
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
    isMouseDown(button?: number): boolean;
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
    getMousePosition(): Vector2;
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
    isMouseOver(): boolean;
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
    update(): void;
}
//# sourceMappingURL=InputManager.d.ts.map