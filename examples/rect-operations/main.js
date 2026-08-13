import {
  Color,
  InputManager,
  Rect,
  Vector2,
} from "/Vectra/lib/index.js";
import { drawGrid } from "../shared/backgrounds.js";
import { createRenderer, getResponsiveFontSize } from "../shared/renderer.js";

const canvas = document.getElementById("canvas");

const renderer = createRenderer(canvas);
const input = new InputManager(canvas);

const PADDING = renderer.width * 0.045;
const GRID_SIZE = renderer.width * 0.05;
const CENTER_DOT_RADIUS = getResponsiveFontSize(renderer, 4);
const LABEL_MARGIN_BOTTOM = getResponsiveFontSize(renderer, 24);

const BACKGROUND_COLOR = Color.fromHex("#0b0e2a");
const RECT_A_COLOR = Color.red();
const RECT_B_COLOR = Color.green();
const INTERSECTION_COLOR = Color.fromHex("#ffd54a");
const UNION_COLOR = Color.blue().lighten(0.25);

const boundary = renderer.boundingRect.inflate(-PADDING, -PADDING);

const rectSize = new Vector2(renderer.width * 0.19, renderer.width * 0.125);
const rectA = createRectAtTopLeft(boundary, rectSize);
const rectB = createRectAtTopRight(boundary, rectSize);

const velocityA = new Vector2(130, 95);
const velocityB = new Vector2(-120, 105);

function createRectAtTopLeft(boundary, size) {
  return new Rect(boundary.left, boundary.top, size.x, size.y);
}

function createRectAtTopRight(boundary, size) {
  return new Rect(boundary.right - size.x, boundary.top, size.x, size.y);
}

function bounce(rect, velocity, dt) {
  rect.translate(velocity.x * dt, velocity.y * dt);
  bounceOffHorizontalWalls(rect, velocity);
  bounceOffVerticalWalls(rect, velocity);
}

function bounceOffHorizontalWalls(rect, velocity) {
  if (rect.left <= boundary.left) {
    rect.moveTo(boundary.left, rect.position.y);
    velocity.x = Math.abs(velocity.x);
  } else if (rect.right >= boundary.right) {
    rect.moveTo(boundary.right - rect.getWidth(), rect.position.y);
    velocity.x = -Math.abs(velocity.x);
  }
}

function bounceOffVerticalWalls(rect, velocity) {
  if (rect.top <= boundary.top) {
    rect.moveTo(rect.position.x, boundary.top);
    velocity.y = Math.abs(velocity.y);
  } else if (rect.bottom >= boundary.bottom) {
    rect.moveTo(rect.position.x, boundary.bottom - rect.getHeight());
    velocity.y = -Math.abs(velocity.y);
  }
}

function draw() {
  const intersection = rectA.intersection(rectB);
  const union = rectA.union(rectB);

  drawBackground();
  drawIntersection(intersection);
  drawRects();
  drawUnion(union);
  drawStats(intersection, union);
  drawMouseHitTest();
}

function drawBackground() {
  renderer.clear();
  renderer.fillRect(renderer.boundingRect, BACKGROUND_COLOR);
  renderer.strokeRect(renderer.boundingRect, Color.black());
  drawGrid(renderer, GRID_SIZE, Color.white().withAlpha(0.04), 0.5);
  renderer.strokeRect(boundary, Color.white().withAlpha(0.25), 1);
}

function drawIntersection(intersection) {
  if (!intersection) return;
  renderer.fillRect(intersection, INTERSECTION_COLOR.withAlpha(0.85));
  renderer.strokeRect(intersection, INTERSECTION_COLOR, 2);
}

function drawRects() {
  drawRect(rectA, RECT_A_COLOR);
  drawRect(rectB, RECT_B_COLOR);
}

function drawRect(rect, color) {
  renderer.fillRect(rect, color.withAlpha(0.25));
  renderer.strokeRect(rect, color, 2);
  renderer.fillCircle(rect.center, CENTER_DOT_RADIUS, color);
}

function drawUnion(union) {
  renderer.strokeRect(union, UNION_COLOR, 1);
}

function drawStats(intersection, union) {
  const stats = buildStats(intersection, union);
  const marginX = renderer.width * 0.03;
  const marginY = renderer.height * 0.06;

  let y = marginY;
  for (const stat of stats) {
    renderer.fillText(stat.text, new Vector2(marginX, y), stat.color, {
      fontSize: stat.fontSize,
      fontWeight: stat.fontWeight,
    });
    y += stat.fontSize * 1.3;
  }
}

function buildStats(intersection, union) {
  const fontSize = getResponsiveFontSize(renderer, 16);
  return [
    {
      text: "Rect Operations",
      color: Color.white(),
      fontSize: fontSize * 1.5,
      fontWeight: "bold",
    },
    {
      text: `Intersection: ${intersection ? "YES" : "NO"}`,
      color: INTERSECTION_COLOR,
      fontSize,
    },
    {
      text: `Overlap area: ${getOverlapArea(intersection)} px²`,
      color: Color.white().withAlpha(0.85),
      fontSize,
    },
    {
      text: `Union area: ${Math.round(union.area)} px²`,
      color: UNION_COLOR,
      fontSize,
    },
  ];
}

function getOverlapArea(intersection) {
  return intersection ? Math.round(intersection.area) : 0;
}

function drawMouseHitTest() {
  if (!input.isMouseOver()) return;

  const mouse = input.getMousePosition();
  const state = getContainmentState(mouse);
  const color = getContainmentColor(state);

  drawMouseMarker(mouse, color);
  drawContainmentLabel(mouse, getContainmentLabel(state), color);
}

function getContainmentState(mouse) {
  return {
    inRectA: rectA.contains(mouse),
    inRectB: rectB.contains(mouse),
  };
}

function getContainmentColor(state) {
  if (state.inRectA && state.inRectB) return INTERSECTION_COLOR;
  if (state.inRectA) return RECT_A_COLOR;
  if (state.inRectB) return RECT_B_COLOR;
  return Color.white();
}

function getContainmentLabel(state) {
  if (state.inRectA && state.inRectB) return "both";
  if (state.inRectA) return "red";
  if (state.inRectB) return "green";
  return "neither";
}

function drawMouseMarker(mouse, color) {
  renderer.fillCircle(mouse, 5, color);
  renderer.strokeCircle(mouse, 9, color, 1);
}

function drawContainmentLabel(mouse, label, color) {
  const fontSize = getResponsiveFontSize(renderer, 16);
  const text = `Mouse inside: ${label}`;
  const metrics = renderer.measureText(text, { fontSize });
  const position = new Vector2(
    renderer.width / 2 - metrics.width / 2,
    renderer.height - LABEL_MARGIN_BOTTOM,
  );
  renderer.fillText(text, position, color, { fontSize });
}

let lastTime = 0;
function loop(time) {
  const dt = getDeltaTime(time);

  bounce(rectA, velocityA, dt);
  bounce(rectB, velocityB, dt);

  draw();
  input.update();
  requestAnimationFrame(loop);
}

function getDeltaTime(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;
  return Math.min(dt || 0, 0.05);
}

requestAnimationFrame(loop);
