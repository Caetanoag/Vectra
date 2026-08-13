import { CanvasRenderer } from "/Vectra/lib/index.js";

export function createRenderer(canvas) {
  const wrapper = canvas.parentElement;
  const bounds = wrapper.getBoundingClientRect();
  const width = bounds.width || 800;
  const height = width * (9 / 16);
  const renderer = new CanvasRenderer(canvas);
  renderer.setSize(width, height);
  return renderer;
}

export function getResponsiveFontSize(renderer, baseSize) {
  const scale = Math.min(1, renderer.width / 800);
  return Math.max(baseSize * scale, 14);
}
