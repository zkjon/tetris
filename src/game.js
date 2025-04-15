import { getPiece } from "./state";
import { print } from "./render";

function checkCollision(piece, map) {
  return piece.shape.some((row, y) => {
    return row.some((cell, x) => {
      if (!cell) return false;
      const px = x + piece.position.x;
      const py = y + piece.position.y;
      return map[py]?.[px] !== 0;
    });
  });
}

function fixPiece(piece, map) {
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        map[y + piece.position.y][x + piece.position.x] = cell;
      }
    });
  });
}

function startGameLoop(map, updatePiece, clearLines, updateScore) {
  let countDown = 0;
  let previousTime = 0;
  const interval = 1000;

  function loop(time = 0) {
    const delta = time - previousTime;
    countDown += delta;

    const piece = getPiece();

    if (countDown > interval) {
      piece.position.y++;
      if (checkCollision(piece, map)) {
        piece.position.y--;
        fixPiece(piece, map);
        updatePiece();
        updateScore(clearLines(map));
      }
      countDown = 0;
    }

    previousTime = time;
    print(map, piece);
    requestAnimationFrame(loop);
  }

  loop();
}

export { startGameLoop, checkCollision, fixPiece };
