import { Matrix3 } from "./Matrix3.js";
import { Vector2 } from "./Vector2.js";
/**
 * Represents a 2D transform with position, rotation, and scale.
 * Mutability: methods modify the instance and return `this` for chaining.
 * Supports hierarchical transformations through `parent` references.
 *
 * @example
 * ```typescript
 * const transform = new Transform(new Vector2(100, 100));
 * transform.rotate(Math.PI / 4).scaleBy(2, 2);
 * const matrix = transform.getWorldMatrix();
 * ```
 */
export declare class Transform {
    position: Vector2;
    rotation: number;
    scale: Vector2;
    /**
     * Creates a new Transform.
     *
     * @param position - Position in world space (default: `(0,0)`).
     * @param rotation - Rotation in radians (default: `0`).
     * @param scale - Scale factors (default: `(1,1)`).
     * @throws If `rotation` is not finite.
     * @example
     * ```typescript
     * const transform = new Transform(new Vector2(50, 50), Math.PI / 2, new Vector2(2, 2));
     * ```
     */
    constructor(position?: Vector2, rotation?: number, scale?: Vector2);
    /**
     * Sets the position and returns `this` for chaining.
     *
     * @param v - The new position.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const transform = new Transform();
     * transform.setPosition(new Vector2(10, 20));
     * ```
     */
    setPosition(v: Vector2): this;
    /**
     * Sets the rotation and returns `this` for chaining.
     *
     * @param angle - The new rotation, in radians.
     * @returns `this` for chaining.
     * @throws If `angle` is not finite.
     * @example
     * ```typescript
     * const transform = new Transform();
     * transform.setRotation(Math.PI); // 180 degrees
     * ```
     */
    setRotation(angle: number): this;
    /**
     * Sets the scale and returns `this` for chaining.
     *
     * @param v - The new scale factors.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const transform = new Transform();
     * transform.setScale(new Vector2(2, 0.5));
     * ```
     */
    setScale(v: Vector2): this;
    /**
     * Translates the transform's position.
     *
     * @param dx - X offset.
     * @param dy - Y offset.
     * @returns `this` for chaining.
     * @throws If `dx` or `dy` is not finite.
     * @example
     * ```typescript
     * const transform = new Transform();
     * transform.translate(5, -5);
     * ```
     */
    translate(dx: number, dy: number): this;
    /**
     * Rotates the transform (adds to the current rotation).
     *
     * @param angle - Additional rotation in radians.
     * @returns `this` for chaining.
     * @throws If `angle` is not finite.
     * @example
     * ```typescript
     * const transform = new Transform();
     * transform.rotate(Math.PI / 8); // adds 22.5 degrees each call
     * ```
     */
    rotate(angle: number): this;
    /**
     * Scales the transform (multiplies current scale).
     *
     * @param sx - X scale factor.
     * @param sy - Y scale factor.
     * @returns `this` for chaining.
     * @throws If `sx` or `sy` is not finite.
     * @example
     * ```typescript
     * const transform = new Transform();
     * transform.scaleBy(1.5, 1.5); // grows by 50%
     * ```
     */
    scaleBy(sx: number, sy: number): this;
    /**
     * Rotates the transform to face a target point.
     *
     * @param target - The point to face.
     * @returns `this` for chaining.
     * @example
     * ```typescript
     * const transform = new Transform(new Vector2(0, 0));
     * transform.lookAt(new Vector2(10, 10)); // faces the (10, 10) direction
     * ```
     */
    lookAt(target: Vector2): this;
    /**
     * Generates the local transformation matrix.
     * Composition order: scale → rotation → translation.
     *
     * @returns A Matrix3 representing the local transform.
     * @example
     * ```typescript
     * const transform = new Transform(new Vector2(10, 10), 0, new Vector2(2, 2));
     * const matrix = transform.getMatrix();
     * ```
     */
    getMatrix(): Matrix3;
    private _parent;
    /**
     * Returns the parent transform, if any.
     *
     * @example
     * ```typescript
     * const child = new Transform();
     * console.log(child.parent); // null
     * ```
     */
    get parent(): Transform | null;
    /**
     * Sets the parent transform.
     *
     * @param parent - The parent transform, or `null` to detach.
     * @example
     * ```typescript
     * const parent = new Transform(new Vector2(100, 100));
     * const child = new Transform(new Vector2(10, 10));
     * child.setParent(parent);
     * ```
     */
    setParent(parent: Transform | null): void;
    /**
     * Generates the world transformation matrix (combines with parent).
     *
     * @returns A Matrix3 representing the world transform, composed recursively through all ancestors.
     * @example
     * ```typescript
     * const parent = new Transform(new Vector2(100, 0));
     * const child = new Transform(new Vector2(10, 0));
     * child.setParent(parent);
     *
     * const worldMatrix = child.getWorldMatrix();
     * const worldPos = worldMatrix.applyToVector(new Vector2(0, 0)); // Vector2(110, 0)
     * ```
     */
    getWorldMatrix(): Matrix3;
}
//# sourceMappingURL=Transform.d.ts.map