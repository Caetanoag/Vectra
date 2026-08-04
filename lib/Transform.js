import { Matrix3 } from "./Matrix3.js";
import { Vector2 } from "./Vector2.js";
/**
 * Represents a 2D transform with position, rotation, and scale.
 * Mutability: methods modify the instance and return `this` for chaining.
 * Supports hierarchical transformations through `parent` references.
 */
export class Transform {
    position;
    rotation;
    scale;
    constructor(
    /** Position in world space (default: (0,0)). */
    position = new Vector2(0, 0), 
    /** Rotation in radians (default: 0). */
    rotation = 0, 
    /** Scale factors (default: (1,1)). */
    scale = new Vector2(1, 1)) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        if (!Number.isFinite(rotation)) {
            throw new Error("Rotation must be finite");
        }
    }
    /** Sets the position and returns `this` for chaining. */
    setPosition(v) {
        this.position = v;
        return this;
    }
    /** Sets the rotation and returns `this` for chaining. */
    setRotation(angle) {
        if (!Number.isFinite(angle)) {
            throw new Error("Angle must be finite");
        }
        this.rotation = angle;
        return this;
    }
    /** Sets the scale and returns `this` for chaining. */
    setScale(v) {
        this.scale = v;
        return this;
    }
    /**
     * Translates the transform's position.
     * @param dx - X offset.
     * @param dy - Y offset.
     * @returns `this` for chaining.
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
     * @param angle - Additional rotation in radians.
     * @returns `this` for chaining.
     */
    rotate(angle) {
        if (!Number.isFinite(angle))
            throw new Error("angle must be finite");
        this.rotation += angle;
        return this;
    }
    /**
     * Scales the transform (multiplies current scale).
     * @param sx - X scale factor.
     * @param sy - Y scale factor.
     * @returns `this` for chaining.
     */
    scaleBy(sx, sy) {
        if (!Number.isFinite(sx) || !Number.isFinite(sy)) {
            throw new Error("sx and sy must be finite");
        }
        this.scale.x *= sx;
        this.scale.y *= sy;
        return this;
    }
    /** Rotates the transform to face a target point. */
    lookAt(target) {
        const dir = target.subtract(this.position);
        this.rotation = Math.atan2(dir.y, dir.x);
        return this;
    }
    /**
     * Generates the local transformation matrix.
     * Composition order: scale → rotation → translation.
     * @returns A Matrix3 representing the local transform.
     */
    getMatrix() {
        return Matrix3.translation(this.position.x, this.position.y)
            .multiply(Matrix3.rotation(this.rotation))
            .multiply(Matrix3.scaling(this.scale.x, this.scale.y));
    }
    _parent = null;
    /** Returns the parent transform, if any. */
    get parent() {
        return this._parent;
    }
    /** Sets the parent transform. */
    setParent(parent) {
        this._parent = parent;
    }
    /**
     * Generates the world transformation matrix (combines with parent).
     * @returns A Matrix3 representing the world transform.
     */
    getWorldMatrix() {
        const local = this.getMatrix();
        if (!this._parent)
            return local;
        return this._parent.getWorldMatrix().multiply(local);
    }
}
//# sourceMappingURL=Transform.js.map