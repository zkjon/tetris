import { rotatePiece } from "./piece";
import { checkCollision, fixPiece } from "./game";
import { print } from "./render";
import { getPiece } from "./state";

function setupControls(map, updatePiece, clearLines, updateScore) {
  document.addEventListener("keydown", (event) => {
    const piece = getPiece();
    const originalShape = piece.shape;

    if (["ArrowLeft", "a", "A"].includes(event.key)) {
      piece.position.x--;
      if (checkCollision(piece, map)) piece.position.x++;
    }

    if (["ArrowRight", "d", "D"].includes(event.key)) {
      piece.position.x++;
      if (checkCollision(piece, map)) piece.position.x--;
    }

    if (["ArrowDown", "s", "S"].includes(event.key)) {
      piece.position.y++;
      if (checkCollision(piece, map)) {
        piece.position.y--;
        fixPiece(piece, map);
        updatePiece();
        updateScore(clearLines(map));
      }
    }

    if (["ArrowUp", "w", "W"].includes(event.key)) {
      const rotated = rotatePiece(piece.shape);
      piece.shape = rotated;
      if (checkCollision(piece, map)) {
        piece.shape = originalShape;
      }
    }

    print(map, piece);
  });
}

export { setupControls };
