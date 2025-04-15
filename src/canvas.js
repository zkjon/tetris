let canvas, context;
let BLOCK_SIZE;
const MAP_WIDTH = 10;
const MAP_HEIGHT = 20;

function initCanvas() {
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");

  updateCanvasSize();
  window.addEventListener("resize", updateCanvasSize);
}

function updateCanvasSize() {
  BLOCK_SIZE = window.innerWidth < 600 ? 18 : 35;
  canvas.width = BLOCK_SIZE * MAP_WIDTH;
  canvas.height = BLOCK_SIZE * MAP_HEIGHT;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.scale(BLOCK_SIZE, BLOCK_SIZE);
}

function getContext() {
  return context;
}

function getBlockSize() {
  return BLOCK_SIZE;
}

export {
  initCanvas,
  getContext,
  getBlockSize,
  MAP_WIDTH,
  MAP_HEIGHT
};