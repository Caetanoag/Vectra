import { Color, Vector2 } from "/Vectra/lib/index.js";

export function drawGrid(
  renderer,
  cellSize,
  color = Color.black().lighten(0.6),
  lineWidth = 1,
) {
  const { width, height } = renderer;
  for (let x = 0; x <= width; x += cellSize) {
    renderer.drawLine(
      new Vector2(x, 0),
      new Vector2(x, height),
      color,
      lineWidth,
    );
  }
  for (let y = 0; y <= height; y += cellSize) {
    renderer.drawLine(
      new Vector2(0, y),
      new Vector2(width, y),
      color,
      lineWidth,
    );
  }
}
