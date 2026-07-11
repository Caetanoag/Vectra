
# Vectra – The HtmlCanvas Framework

Vectra is a lightweight 2D rendering and linear algebra library for the browser, built on top of the HTML Canvas API. It provides geometric primitives (`Vector2`, `Rect`), color manipulation (`Color`), and a renderer (`CanvasRenderer`) that abstracts the native Canvas context, allowing you to draw shapes, apply transformations, and manage scenes in a structured way.

---

## Import

### Via CDN (jsDelivr)

```javascript
import { Vector2, Rect, Color, CanvasRenderer } from "https://cdn.jsdelivr.net/gh/reinhackVancheat/Vectra/lib/index.js";
```

### From local installation

If you clone the repository and install dependencies, you can import from the `lib/` folder:

```javascript
import { Vector2, Rect, Color, CanvasRenderer } from "./lib/index.js";
```

---

## Installation

```bash
git clone git@github.com:reinhackVancheat/Vectra.git
cd Vectra
yarn install
```

The source code lives in `src/`. Building generates the `dist/` folder with JavaScript files and TypeScript declarations.

---

## Minimal Example

```javascript
import { CanvasRenderer, Color, Rect, Vector2 } from "https://cdn.jsdelivr.net/gh/reinhackVancheat/Vectra/lib/index.js";

const canvas = document.getElementById("canvas");
const renderer = new CanvasRenderer(canvas);
renderer.setSize(800, 600);

// Background
renderer.clear(Color.fromHex("#2c3e50"));

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
- `new Vector2(x, y)`
- `add(v): Vector2` – immutable addition
- `subtract(v): Vector2`
- `scale(s): Vector2`
- `dot(v): number`
- `length: number` (getter)
- `normalized(): Vector2`
- `static fromAngle(radians): Vector2`

### Rect
- `new Rect(x, y, width, height)`
- `translate(dx, dy): this` – moves the box
- `contains(point: Vector2): boolean`
- `intersects(other: Rect): boolean`
- `union(other: Rect): Rect`
- `intersection(other: Rect): Rect | undefined`
- `left, right, top, bottom` – getters (numbers)
- `center: Vector2` (getter)
- `clone(): Rect`

### Color
- `new Color(r, g, b, a?)` – channels normalized to `[0,1]`
- `static fromHex(hex: string): Color`
- `static fromRgb(r, g, b, a?): Color`
- `hex: string` – `#RRGGBB` or `#RRGGBBAA`
- `rgb: string` – CSS `rgb(...)`
- `rgba: string` – CSS `rgba(...)`
- `lerp(other, t): Color`
- `brightness: number` – approximate luminance

### CanvasRenderer
- `new CanvasRenderer(canvas: HTMLCanvasElement)`
- `setSize(width, height): void`
- `clear(color?, rect?): void`
- `fillRect(rect, color): void`
- `strokeRect(rect, color, lineWidth?): void`
- `fillCircle(center, radius, color): void`
- `strokeCircle(center, radius, color, lineWidth?): void`
- `fillPolygon(points, color): void`
- `strokePolygon(points, color, lineWidth?): void`
- `drawLine(from, to, color, lineWidth?): void`


---

## Running Examples

The examples are in the `examples/` folder. To compile and run:

```bash
cd examples
tsc          # generates main.js
```

Then open `examples/index.html` in a browser (use a local server like `serve` or `live-server`). From the project root you can also run:

```bash
yarn dev
```

which serves the current directory with `serve` (if installed).

---

## Repository Structure

```
Vectra/
├── dist/               # Transpilled output (JavaScript + .d.ts)
├── src/               # Source code (TypeScript)
│   ├── Vector2.ts
│   ├── Rect.ts
│   ├── Color.ts
│   ├── CanvasRenderer.ts
│   └── index.ts
├── examples/          # Example usage
│   ├── index.html
│   ├── main.ts
│   └── tsconfig.json
├── lib/ # .js files transpilled from src/
├── package.json
├── tsconfig.json
├── yarn.lock
└── README.md
```

