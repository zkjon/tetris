import "./global.css";
import { initCanvas } from "./canvas";
import { createMap, clearLines } from "./map";
import { createPiece } from "./piece";
import { startGameLoop } from "./game";
import { setupControls } from "./controls";
import { getPiece, setPiece } from "./state";

initCanvas();

const map = createMap();
setPiece(createPiece());

const scoreElement = document.querySelector("#score");
let score = 0;

function updatePiece() {
  setPiece(createPiece());
}

function updateScore(linesCleared) {
  score += linesCleared ** 2;
  scoreElement.innerHTML = score;
}

setupControls(map, updatePiece, clearLines, updateScore);
startGameLoop(map, updatePiece, clearLines, updateScore);
