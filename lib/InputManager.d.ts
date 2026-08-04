import { Vector2 } from "./Vector2.js";
export declare class InputManager {
    private target;
    private mouseInfo;
    private keysDown;
    private readonly keysPressed;
    /**
     * @param target - The element to listen for mouse/touch events. Keyboard events are always attached to `window`.
     */
    constructor(target: HTMLElement | Window);
    /** Checks if a key is currently held down. */
    isKeyDown(key: string): boolean;
    /** Checks if a key was just pressed in this frame (one-shot event). */
    isKeyPressed(key: string): boolean;
    /** Checks if a mouse button is held down (0 = left, 1 = middle, 2 = right). */
    isMouseDown(button?: number): boolean;
    /** Returns the current mouse position relative to the target element. */
    getMousePosition(): Vector2;
    /** Checks if the mouse is currently over the target element. */
    isMouseOver(): boolean;
    /** Resets "pressed" states. Must be called once per frame before checking inputs. */
    update(): void;
}
//# sourceMappingURL=InputManager.d.ts.map