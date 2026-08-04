import { Vector2 } from "./Vector2.js";
export class InputManager {
    target;
    mouseInfo;
    keysDown = new Map();
    keysPressed = new Map();
    /**
     * @param target - The element to listen for mouse/touch events. Keyboard events are always attached to `window`.
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
    /** Checks if a key is currently held down. */
    isKeyDown(key) {
        return this.keysDown.get(key) ?? false;
    }
    /** Checks if a key was just pressed in this frame (one-shot event). */
    isKeyPressed(key) {
        return this.keysPressed.get(key) ?? false;
    }
    /** Checks if a mouse button is held down (0 = left, 1 = middle, 2 = right). */
    isMouseDown(button = 0) {
        return this.mouseInfo.Buttons.get(button) ?? false;
    }
    /** Returns the current mouse position relative to the target element. */
    getMousePosition() {
        return this.mouseInfo.Position;
    }
    /** Checks if the mouse is currently over the target element. */
    isMouseOver() {
        return this.mouseInfo.MouseOver;
    }
    /** Resets "pressed" states. Must be called once per frame before checking inputs. */
    update() {
        this.keysPressed.clear();
    }
}
//# sourceMappingURL=InputManager.js.map