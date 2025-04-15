import { PIECES, PIECE_COLORS } from "./consts/pieces";
import { MAP_WIDTH } from "./canvas";

function createPiece() {
  const index = Math.floor(Math.random() * PIECES.length);
  return {
    shape: PIECES[index],
    colorIndex: index,
    color: PIECE_COLORS[index],
    position: {
      x: Math.floor(Math.random() * (MAP_WIDTH - 4)),
      y: 0,
    },
  };
}

function rotatePiece(shape) {
  return shape[0].map((_, i) => shape.map(row => row[i]).reverse());
}

export { createPiece, rotatePiece };
