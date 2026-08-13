import { Color, InputManager, Matrix3, Vector2 } from "/Vectra/lib/index.js";
import { drawGrid } from "../shared/backgrounds.js";
import { createRenderer, getResponsiveFontSize } from "../shared/renderer.js";

const canvas = document.getElementById("canvas");

const renderer = createRenderer(canvas);
const input = new InputManager(canvas);

const ORIGIN = new Vector2(renderer.width / 2, renderer.height / 2);
const PADDING = renderer.width * 0.03;
const GRID_SIZE = renderer.width * 0.05;
const BASIS_LENGTH = renderer.width * 0.08;
const DOT_RADIUS = Math.max(2, renderer.width * 0.0035);
const PIVOT_RADIUS = Math.max(3, renderer.width * 0.005);

const TRANSLATE_LIMIT_X = renderer.width * 0.16;
const TRANSLATE_LIMIT_Y = renderer.height * 0.24;
const ROTATION_LIMIT = Math.PI;
const SCALE_MIN = 0.25;
const SCALE_MAX = 3;

const BACKGROUND_COLOR = Color.fromHex("#0b0e2a");
const GHOST_COLOR = Color.white().withAlpha(0.35);
const SHAPE_COLOR = Color.fromHex("#6ee7ff");
const INVERSE_COLOR = Color.fromHex("#ffb86b");
const PIVOT_COLOR = Color.fromHex("#ffd54a");
const X_AXIS_COLOR = Color.red();
const Y_AXIS_COLOR = Color.green();
const VALUE_COLOR = Color.white().withAlpha(0.85);

const SHAPE = [
  new Vector2(55, 0),
  new Vector2(-35, -35),
  new Vector2(-15, 0),
  new Vector2(-35, 35),
];

const sliderConfigs = [
  { id: "tx", min: -TRANSLATE_LIMIT_X, max: TRANSLATE_LIMIT_X, initialValue: 0, step: 1, color: "#6ee7ff", formatValue: (v) => `${Math.round(v)} px` },
  { id: "ty", min: -TRANSLATE_LIMIT_Y, max: TRANSLATE_LIMIT_Y, initialValue: 0, step: 1, color: "#6ee7ff", formatValue: (v) => `${Math.round(v)} px` },
  { id: "angle", min: -ROTATION_LIMIT, max: ROTATION_LIMIT, initialValue: 0, step: 0.01, color: "#ff8a9a", formatValue: (v) => `${Math.round((v * 180) / Math.PI)}°` },
  { id: "sx", min: SCALE_MIN, max: SCALE_MAX, initialValue: 1, step: 0.01, color: "#7ddb9a", formatValue: (v) => v.toFixed(2) },
  { id: "sy", min: SCALE_MIN, max: SCALE_MAX, initialValue: 1, step: 0.01, color: "#7ddb9a", formatValue: (v) => v.toFixed(2) },
];

let showInverse = false;
const inverseButton = document.getElementById("inverse-toggle");
const resetButton = document.getElementById("reset-button");
function setupSliders() {
  for (const config of sliderConfigs) {
    const sliderInput = getSliderElement(config.id);
    sliderInput.min = config.min;
    sliderInput.max = config.max;
    sliderInput.step = config.step;
    sliderInput.value = config.initialValue;
    sliderInput.style.accentColor = config.color;
    sliderInput.addEventListener("input", () => updateSliderLabel(config));
    updateSliderLabel(config);
  }
}

function setupResetButton() {
  resetButton.addEventListener("click", resetTransforms)
}
function setupInverseToggle() {
  inverseButton.addEventListener("click", toggleInverse);
  updateInverseToggle();
}

function toggleInverse() {
  showInverse = !showInverse;
  updateInverseToggle();
}

function updateInverseToggle() {
  inverseButton.textContent = `Show inverse: ${showInverse ? "ON" : "OFF"}`;
  inverseButton.classList.toggle("active", showInverse);
  inverseButton.setAttribute("aria-pressed", String(showInverse));
}

function updateSliderLabel(config) {
  const value = getSliderValue(config.id);
  document.getElementById(`slider-${config.id}-value`).textContent = config.formatValue(value);
}

function getSliderElement(id) {
  return document.getElementById(`slider-${id}`);
}

function getSliderValue(id) {
  return Number(getSliderElement(id).value);
}

function buildMatrix() {
  const translationMatrix = Matrix3.translation(
    getSliderValue("tx"),
    getSliderValue("ty"),
  );
  const rotationMatrix = Matrix3.rotation(getSliderValue("angle"));
  const scalingMatrix = Matrix3.scaling(
    getSliderValue("sx"),
    getSliderValue("sy"),
  );
  return translationMatrix.multiply(rotationMatrix).multiply(scalingMatrix);
}

function handleInput() {
  if (input.isKeyPressed("R")) resetTransforms();
  if (input.isKeyPressed("I")) toggleInverse();
}

function resetTransforms() {
  for (const config of sliderConfigs) {
    getSliderElement(config.id).value = config.initialValue;
    updateSliderLabel(config);
  }
  showInverse = false;
  updateInverseToggle();
}

function updateMatrixDisplay(matrix) {
  const values = matrix.toArray();
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      const cell = document.getElementById(`matrix-m${row}${column}`);
      cell.textContent = values[row * 3 + column].toFixed(2);
    }
  }
}

function draw(matrix) {
  drawBackground();
  drawGhost();
  drawShape(matrix);
  drawTransformedVertices(matrix);
  drawBasisVectors(matrix);
  drawPivot(matrix);
  drawInverse(matrix);
  drawStatus(matrix);
  drawHint();
}

function drawBackground() {
  renderer.clear();
  renderer.fillRect(renderer.boundingRect, BACKGROUND_COLOR);
  renderer.strokeRect(renderer.boundingRect, Color.black());
  drawGrid(renderer, GRID_SIZE, Color.white().withAlpha(0.04), 0.5);
}

function drawGhost() {
  drawInLocalSpace(() => {
    renderer.strokePolygon(SHAPE, GHOST_COLOR, 1.5);
  });
}

function drawShape(matrix) {
  drawInLocalSpace(() => {
    renderer.applyMatrix(matrix);
    renderer.fillPolygon(SHAPE, SHAPE_COLOR.withAlpha(0.45));
    renderer.strokePolygon(SHAPE, SHAPE_COLOR, 2);
  });
}

function drawInverse(matrix) {
  if (!showInverse) return;
  const inverse = matrix.invert();
  drawInLocalSpace(() => {
    renderer.applyMatrix(inverse);
    renderer.strokePolygon(SHAPE, INVERSE_COLOR, 2);
  });
}

function drawInLocalSpace(draw) {
  renderer.save();
  renderer.translate(ORIGIN.x, ORIGIN.y);
  draw();
  renderer.restore();
}

function drawTransformedVertices(matrix) {
  for (const point of SHAPE) {
    const transformed = ORIGIN.add(matrix.applyToVector(point));
    renderer.fillCircle(transformed, DOT_RADIUS, Color.white());
  }
}

function drawBasisVectors(matrix) {
  const pivot = getPivotPosition(matrix);
  drawBasisAxis(matrix, pivot, Vector2.right, X_AXIS_COLOR);
  drawBasisAxis(matrix, pivot, Vector2.up, Y_AXIS_COLOR);
}

function drawBasisAxis(matrix, pivot, direction, color) {
  const basis = matrix.applyToDirection(direction).scale(BASIS_LENGTH);
  const tip = pivot.add(basis);
  renderer.drawLine(pivot, tip, color, 2);
  renderer.fillCircle(tip, DOT_RADIUS, color);
}

function getPivotPosition(matrix) {
  return ORIGIN.add(matrix.applyToVector(Vector2.zero));
}

function drawPivot(matrix) {
  const pivot = getPivotPosition(matrix);
  renderer.drawLine(ORIGIN, pivot, PIVOT_COLOR.withAlpha(0.5), 1.5);
  renderer.fillCircle(pivot, PIVOT_RADIUS, PIVOT_COLOR);
}

function drawStatus(matrix) {
  const fontSize = getResponsiveFontSize(renderer, 14);
  const x = renderer.width - PADDING;
  let y = renderer.height * 0.08;

  drawStatusRow(
    `equals(identity): ${yesNo(matrix.equals(Matrix3.identity()))}`,
    Color.white(),
    x,
    y,
    fontSize,
  );
  y += fontSize * 1.5;

  drawStatusRow(
    `round-trip: ${getRoundTripError(matrix).toFixed(6)} px`,
    VALUE_COLOR,
    x,
    y,
    fontSize,
  );
  y += fontSize * 1.5;

  drawStatusRow(
    `invert: ${showInverse ? "ON" : "OFF"}`,
    INVERSE_COLOR,
    x,
    y,
    fontSize,
  );
}

function drawStatusRow(text, color, x, y, fontSize) {
  renderer.fillText(text, new Vector2(x, y), color, {
    fontSize,
    textAlign: "end",
  });
}

function yesNo(value) {
  return value ? "YES" : "NO";
}

function getRoundTripError(matrix) {
  const inverse = matrix.invert();
  let maxError = 0;
  for (const point of SHAPE) {
    const roundTrip = inverse.applyToVector(matrix.applyToVector(point));
    maxError = Math.max(maxError, roundTrip.distanceTo(point));
  }
  return maxError;
}

function drawHint() {
  const fontSize = getResponsiveFontSize(renderer, 14);
  renderer.fillText(
    "R reset · I toggle inverse",
    new Vector2(PADDING, renderer.height - fontSize * 0.6),
    Color.white().withAlpha(0.6),
    { fontSize },
  );
}

function loop() {
  handleInput();
  const matrix = buildMatrix();
  updateMatrixDisplay(matrix);
  draw(matrix);
  input.update();
  requestAnimationFrame(loop);
}

setupSliders();
setupResetButton();
setupInverseToggle();
requestAnimationFrame(loop);
