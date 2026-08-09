# Vectra – The HtmlCanvas Framework

Vectra is a lightweight 2D rendering and linear algebra library for the browser, built on top of the HTML Canvas API. It provides geometric primitives (`Vector2`, `Rect`), affine transformations (`Matrix3`, `Transform`), color manipulation (`Color`), user input handling (`InputManager`), and a renderer (`CanvasRenderer`) that abstracts the native Canvas context, allowing you to draw shapes, apply transformations, and manage scenes in a structured way.

---

## Import

### Via CDN (jsDelivr)

```javascript
import {
  Vector2,
  Rect,
  Color,
  Matrix3,
  Transform,
  InputManager,
  CanvasRenderer,
} from "https://cdn.jsdelivr.net/gh/caetanoag/Vectra/lib/index.js";
```

### From local installation

If you clone the repository, you can import from the `lib/` folder — you only need that directory:

```javascript
import {
  Vector2,
  Rect,
  Color,
  Matrix3,
  Transform,
  InputManager,
  CanvasRenderer,
} from "./lib/index.js";
```

---

## Installation

Vectra ships as a plain ES module — there are no runtime dependencies and no build step required.

### From the repository

```bash
git clone https://github.com/caetanoag/Vectra.git
cd Vectra
```

That clones the whole repository, but you only need the `lib/` directory. You can delete everything else. From the parent folder, first verify what will be removed:

```bash
cd ..
# Prints everything that will be deleted; make sure it looks correct
find ./Vectra/ -mindepth 1 -path "./Vectra/lib" -prune -o -print
```

Then delete every file except `lib/`:

```bash
# Deletes everything in Vectra/, except the lib directory
find ./Vectra/ -mindepth 1 -path "./Vectra/lib" -prune -o -exec rm -rf {} +
```

Now import from `./Vectra/lib/index.js` (or copy the `lib/` folder into your project).

> **Developers:** if you want to build from `src/`, run `yarn install && yarn build` — that generates the `lib/` and `dist/` folders with JavaScript files and TypeScript declarations.

---

## Minimal Example

```javascript
import {
  CanvasRenderer,
  Color,
  Rect,
  Vector2,
} from "https://cdn.jsdelivr.net/gh/caetanoag/Vectra/lib/index.js";

const canvas = document.getElementById("canvas");
const renderer = new CanvasRenderer(canvas);
renderer.setSize(800, 600);

// Background
renderer.clear();
renderer.fillRect(new Rect(0, 0, 800, 600), Color.fromHex("#2c3e50"));

// Rectangle
const rect = new Rect(50, 50, 200, 100);
renderer.fillRect(rect, Color.fromRgb(52, 152, 219));
renderer.strokeRect(rect, Color.white(), 2);

// Circle
const center = new Vector2(400, 200);
renderer.fillCircle(center, 80, Color.fromRgb(231, 76, 60));
```

---

## API Overview

### Vector2

Immutable 2D vector — all operations return new instances.

- `new Vector2(x, y)` — `x` and `y` must be finite
- `add(v): Vector2`
- `subtract(v): Vector2`
- `(factor): Vector2`
- `negate(): Vector2`
- `hadamar(v): Vector2` – component-wise (Hadamard) product
- `dot(v): number`
- `distanceTo(v): number`
- `length: number` (getter)
- `lengthSq: number` (getter) – faster than `length` for comparisons
- `normalized(): Vector2`
- `getAngle(v): number` – angle in radians to another vector
- `toString(): string`
- `static fromAngle(radians): Vector2`

### Rect

Axis-aligned rectangle (AABB). Most methods mutate the instance and return `this` for chaining.

- `new Rect(x, y, width, height)` — validates and normalizes (negative width/height are corrected automatically)
- `setWidth(w): this`
- `setHeight(h): this`
- `moveTo(x, y): this`
- `setPosition(v): this`
- `setSize(v): this`
- `translate(dx, dy): this`
- `resize(dx, dy): this` – adds to width/height
- `inflate(dx, dy): this` – expands in all directions while keeping the center fixed
- `contains(point: Vector2): boolean`
- `intersects(other: Rect): boolean`
- `union(other: Rect): Rect`
- `intersection(other: Rect): Rect | undefined`
- `clone(): Rect`
- `isEmpty(): boolean`
- `equals(other: Rect): boolean`
- `getWidth(): number` / `getHeight(): number`
- `left, right, top, bottom` – getters (numbers)
- `position, center` – getters (`Vector2`)
- `area` – getter (number)

### Color

Immutable color with channels normalized to `[0, 1]`.

- `new Color(r, g, b, a?)`
- `static fromHex(hex: string): Color` – supports `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`
- `static fromRgb(r, g, b, a?): Color` – channels in `0-255`
- `hex: string` – `#RRGGBB` or `#RRGGBBAA`
- `rgb: string` – CSS `rgb(...)`
- `rgba: string` – CSS `rgba(...)`
- `toArray: [number, number, number, number | undefined]`
- `brightness: number` – approximate luminance
- `lerp(other, t): Color`
- `clone(): Color`
- `equals(other, epsilon?): boolean`
- `static white() / black() / red() / green() / blue() / transparent(): Color`

### Matrix3

3x3 matrix for 2D affine transformations. Immutable — all operations return new instances. Row-major storage.

- `new Matrix3(m00, m01, m02, m10, m11, m12, m20, m21, m22)`
- `static identity(): Matrix3`
- `static translation(tx, ty): Matrix3`
- `static rotation(angle, center?): Matrix3` – optional `center`, defaults to the origin
- `static scaling(sx, sy?): Matrix3` – optional `sy` (uniform scaling if omitted)
- `multiply(other): Matrix3`
- `translate(dx, dy): Matrix3` / `rotate(angle): Matrix3` / `scale(sx, sy?): Matrix3`
- `applyToVector(v): Vector2`
- `applyToDirection(v): Vector2` – ignores translation
- `toCanvasTransform(): [a, b, c, d, e, f]` – format used by `CanvasRenderingContext2D.setTransform`
- `invert(): Matrix3 | null`
- `equals(other, epsilon?): boolean`
- `clone(): Matrix3`
- `toArray(): number[]`
- `toString(): string`

### Transform

Represents 2D position, rotation, and scale, with support for hierarchies via `parent`. Mutable — methods mutate the instance and return `this`.

- `new Transform(position?, rotation?, scale?)` – defaults: `(0,0)`, `0`, `(1,1)`
- `setPosition(v): this` / `setRotation(angle): this` / `setScale(v): this`
- `translate(dx, dy): this`
- `rotate(angle): this` – adds to the current rotation
- `scaleBy(sx, sy): this` – multiplies the current scale
- `getMatrix(): Matrix3` – local matrix (order: scale → rotation → translation)
- `parent: Transform | null` (getter) / `setParent(parent): void`
- `getWorldMatrix(): Matrix3` – combines with the parent chain

### InputManager

Manages keyboard, mouse, and touch input. `update()` must be called once per frame to clear "pressed" states.

- `new InputManager(target: HTMLElement | Window)` – `target` receives mouse/touch events; keyboard events are always attached to `window`
- `isKeyDown(key): boolean`
- `isKeyPressed(key): boolean` – one-shot event, true only on the frame the key was pressed
- `isMouseDown(button?): boolean` – `0` left, `1` middle, `2` right
- `getMousePosition(): Vector2` – relative to the target element
- `isMouseOver(): boolean`
- `update(): void` – must be called once per frame, before checking inputs

### CanvasRenderer

Wraps the HTML Canvas 2D context, providing a higher-level API for shapes, transforms, text, and state management.

- `new CanvasRenderer(canvas: HTMLCanvasElement)`
- `width, height` – getters
- `context: CanvasRenderingContext2D` – getter for the raw context (use cautiously)
- `setSize(width, height): void`
- `clear(rect?): void` – clears the whole canvas, or only the given region

**Shapes**

- `fillRect(rect, color): void`
- `strokeRect(rect, color, lineWidth?): void`
- `fillCircle(center, radius, color): void`
- `strokeCircle(center, radius, color, lineWidth?): void`
- `fillPolygon(points, color): void`
- `strokePolygon(points, color, lineWidth?): void`
- `drawLine(from, to, color, lineWidth?): void`

**Transforms**

- `translate(dx, dy): void` / `rotate(angle): void` / `scale(sx, sy): void` – apply directly to the canvas context
- `save(): void` / `restore(): void`
- `resetTransform(): void` – resets to identity
- `applyMatrix(matrix: Matrix3): void` – multiplies the current transform by a `Matrix3`
- `applyTransform(transform: Transform): void` – multiplies by a `Transform`'s world matrix
- `setTransform(transform: Transform): void` – sets the current transform from a `Transform`'s world matrix

**Text**

- `fillText(text, position, color, options?): void`
- `strokeText(text, position, color, options?): void`
- `measureText(text, options?): TextMetrics`

Text options (`TextOptions`):

| Field          | Default        | Description                                   |
| -------------- | -------------- | ---------------------------------------------- |
| `fontFamily`   | `'sans-serif'` | Font family                                     |
| `fontSize`     | `16`           | Size in pixels                                  |
| `fontStyle`    | `'normal'`     | `'normal'`, `'italic'`, or `'oblique'`          |
| `fontWeight`   | `'normal'`     | Font weight                                     |
| `textAlign`    | `'start'`      | Text alignment (`CanvasTextAlign`)              |
| `textBaseline` | `'alphabetic'` | Text baseline (`CanvasTextBaseline`)            |
| `maxWidth`     | —              | Maximum rendering width                         |

---

## Running Examples

The examples live in `docs/examples/` and need no build step — each page loads its own `main.js` directly. To browse them, serve the repository root with a local server:

```bash
yarn dev
```

which serves the current directory with python3 (if installed). Then open [http://localhost:3000/docs/examples/](http://localhost:3000/docs/examples/) in a browser. The examples hub is also linked from the navigation sidebar of the documentation.

---
