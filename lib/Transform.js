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
export class Transform {
    position;
    rotation;
    scale;
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
    constructor(position = new Vector2(0, 0), rotation = 0, scale = new Vector2(1, 1)) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        if (!Number.isFinite(rotation)) {
            throw new Error("Rotation must be finite");
        }
    }
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
    setPosition(v) {
        this.position = v;
        return this;
    }
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
    setRotation(angle) {
        if (!Number.isFinite(angle)) {
            throw new Error("Angle must be finite");
        }
        this.rotation = angle;
        return this;
    }
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
    setScale(v) {
        this.scale = v;
        return this;
    }
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
    translate(dx, dy) {
        if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
            throw new Error("dx and dy must be finite");
        }
        this.position.x += dx;
        this.position.y += dy;
        return this;
    }
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
    rotate(angle) {
        if (!Number.isFinite(angle))
            throw new Error("angle must be finite");
        this.rotation += angle;
        return this;
    }
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
    scaleBy(sx, sy) {
        if (!Number.isFinite(sx) || !Number.isFinite(sy)) {
            throw new Error("sx and sy must be finite");
        }
        this.scale.x *= sx;
        this.scale.y *= sy;
        return this;
    }
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
    lookAt(target) {
        const dir = target.subtract(this.position);
        this.rotation = Math.atan2(dir.y, dir.x);
        return this;
    }
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
    getMatrix() {
        return Matrix3.translation(this.position.x, this.position.y)
            .multiply(Matrix3.rotation(this.rotation))
            .multiply(Matrix3.scaling(this.scale.x, this.scale.y));
    }
    _parent = null;
    /**
     * Returns the parent transform, if any.
     *
     * @example
     * ```typescript
     * const child = new Transform();
     * console.log(child.parent); // null
     * ```
     */
    get parent() {
        return this._parent;
    }
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
    setParent(parent) {
        this._parent = parent;
    }
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
    getWorldMatrix() {
        const local = this.getMatrix();
        if (!this._parent)
            return local;
        return this._parent.getWorldMatrix().multiply(local);
    }
}
//# sourceMappingURL=Transform.js.map