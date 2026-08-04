import { Matrix3 } from "./Matrix3.js";
import { Vector2 } from "./Vector2.js";
/**
 * Represents a 2D transform with position, rotation, and scale.
 * Mutability: methods modify the instance and return `this` for chaining.
 * Supports hierarchical transformations through `parent` references.
 */
export declare class Transform {
    /** Position in world space (default: (0,0)). */
    position: Vector2;
    /** Rotation in radians (default: 0). */
    rotation: number;
    /** Scale factors (default: (1,1)). */
    scale: Vector2;
    constructor(
    /** Position in world space (default: (0,0)). */
    position?: Vector2, 
    /** Rotation in radians (default: 0). */
    rotation?: number, 
    /** Scale factors (default: (1,1)). */
    scale?: Vector2);
    /** Sets the position and returns `this` for chaining. */
    setPosition(v: Vector2): this;
    /** Sets the rotation and returns `this` for chaining. */
    setRotation(angle: number): this;
    /** Sets the scale and returns `this` for chaining. */
    setScale(v: Vector2): this;
    /**
     * Translates the transform's position.
     * @param dx - X offset.
     * @param dy - Y offset.
     * @returns `this` for chaining.
     */
    translate(dx: number, dy: number): this;
    /**
     * Rotates the transform (adds to the current rotation).
     * @param angle - Additional rotation in radians.
     * @returns `this` for chaining.
     */
    rotate(angle: number): this;
    /**
     * Scales the transform (multiplies current scale).
     * @param sx - X scale factor.
     * @param sy - Y scale factor.
     * @returns `this` for chaining.
     */
    scaleBy(sx: number, sy: number): this;
    /** Rotates the transform to face a target point. */
    lookAt(target: Vector2): this;
    /**
     * Generates the local transformation matrix.
     * Composition order: scale → rotation → translation.
     * @returns A Matrix3 representing the local transform.
     */
    getMatrix(): Matrix3;
    private _parent;
    /** Returns the parent transform, if any. */
    get parent(): Transform | null;
    /** Sets the parent transform. */
    setParent(parent: Transform | null): void;
    /**
     * Generates the world transformation matrix (combines with parent).
     * @returns A Matrix3 representing the world transform.
     */
    getWorldMatrix(): Matrix3;
}
//# sourceMappingURL=Transform.d.ts.map