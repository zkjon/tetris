import { getContext } from "./canvas";

function drawCell(x, y, color) {
  const context = getContext();
  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
  context.strokeStyle = "#000";
  context.lineWidth = 0.1;
  context.strokeRect(x, y, 1, 1);
}

function print(map, piece) {
  const context = getContext();
  context.fillStyle = "#e0e0e0";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) drawCell(x, y, "#a4a4a4");
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) drawCell(x + piece.position.x, y + piece.position.y, piece.color);
    });
  });
}

export { print };
