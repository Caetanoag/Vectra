import { CanvasRenderer, Color, Vector2 } from "/Vectra/lib/index.js";
import { drawGrid } from "../shared/backgrounds.js";

const canvas = document.getElementById("canvas");

const wrapper = canvas.parentElement;
const rect = wrapper.getBoundingClientRect();
const width = rect.width || 800;
const height = width * (9 / 16);

const renderer = new CanvasRenderer(canvas);
renderer.setSize(width, height);

const PIXEL_SIZE = 2;
const PIXEL_PER_METER = renderer.height * 0.03;
function getResponsiveFontSize(baseSize) {
  const scale = Math.min(1, renderer.width / 800);
  return Math.max(baseSize * scale, 12);
}

const origin = new Vector2(renderer.width / 2, renderer.height / 2);
const secondVector = new Vector2(10, 10).withLength(9);
let firstVector = new Vector2(-10, 0).withLength(9);
function drawVector(v, drawInfo, color) {
  const tip = new Vector2(
    drawInfo.x + v.x * PIXEL_PER_METER,
    drawInfo.y + v.y * PIXEL_PER_METER,
  );
  renderer.drawLine(drawInfo, tip, color, PIXEL_SIZE);
  renderer.fillCircle(drawInfo, PIXEL_SIZE, color);

  if (v.length === 0) return;

  const direction = v.normalized();
  const perpendicular = new Vector2(-direction.y, direction.x);
  const arrowSize = Math.max(PIXEL_SIZE * 3, 10);
  const back = tip.add(direction.scale(-arrowSize));
  const left = back.add(perpendicular.scale(arrowSize / 2));
  const right = back.add(perpendicular.scale(-arrowSize / 2));
  renderer.fillPolygon([tip, left, right], color);
}

function loop() {
  renderer.clear();
  renderer.fillRect(renderer.boundingRect, Color.fromHex("#000f2e"));
  renderer.strokeRect(renderer.boundingRect, Color.black());

  drawGrid(renderer, PIXEL_PER_METER * 5, Color.white().withAlpha(0.3), 0.5);

  const resultVector = firstVector.add(secondVector);
  const tipOfFirstVector = origin.add(firstVector.scale(PIXEL_PER_METER));

  drawVector(firstVector, origin, Color.red());
  drawVector(secondVector, tipOfFirstVector, Color.green());
  drawVector(resultVector, origin, Color.blue().lighten(0.9));

  firstVector = firstVector.rotate(Math.PI / 120);

  const marginX = renderer.width * 0.03;
  const marginY = renderer.height * 0.05;

  const fontSizeInfo = getResponsiveFontSize(30);
  const fontSizeResult = getResponsiveFontSize(25);

  const angleText = `Angle: ${Math.round((firstVector.angle * 180) / Math.PI)}`;
  renderer.fillText(
    angleText,
    new Vector2(marginX, marginY + fontSizeInfo * 0.8),
    Color.white(),
    { fontSize: fontSizeInfo },
  );

  const redLenText = `Red Length: ${Math.round(firstVector.length)}`;
  renderer.fillText(
    redLenText,
    new Vector2(marginX, marginY + fontSizeInfo * 0.8 + fontSizeInfo * 1.2),
    Color.red(),
    { fontSize: fontSizeInfo },
  );

  const greenLenText = `Green Length: ${Math.round(secondVector.length)}`;
  renderer.fillText(
    greenLenText,
    new Vector2(marginX, marginY + fontSizeInfo * 0.8 + fontSizeInfo * 2.4),
    Color.green(),
    { fontSize: fontSizeInfo },
  );

  const resultText = `Result: ${Math.round(resultVector.length)}`;
  const resultWidth = renderer.measureText(resultText, {
    fontSize: fontSizeResult,
  }).width;
  renderer.fillText(
    resultText,
    new Vector2(
      renderer.width / 2 - resultWidth / 2,
      marginY + fontSizeResult * 0.8,
    ),
    Color.white(),
    { fontSize: fontSizeResult },
  );

  const vecStr = resultVector.toString();
  const vecStrWidth = renderer.measureText(vecStr, {
    fontSize: fontSizeResult * 0.9,
    fontStyle: "italic",
  }).width;
  renderer.fillText(
    vecStr,
    new Vector2(
      renderer.width / 2 - vecStrWidth / 2,
      marginY + fontSizeResult * 0.8 + fontSizeResult * 1.2,
    ),
    Color.white(),
    { fontSize: fontSizeResult * 0.9, fontStyle: "italic" },
  );

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
