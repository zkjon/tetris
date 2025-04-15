import "./global.css";
import { PIECES } from "./consts/pieces";

// 1. canva init
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const BLOCK_SIZE = 20;
const MAP_WIDTH = 10;
const MAP_HEIGHT = 20;

canvas.width = BLOCK_SIZE * MAP_WIDTH;
canvas.height = BLOCK_SIZE * MAP_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

// 3. create map, will compose of 20 rows and 10 columns using 0 and 1
const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 1, 1, 1],
];
// for (let i = 0; i < MAP_HEIGHT; i++) {
//     map[i] = []
//     for (let j = 0; j < MAP_WIDTH; j++) {
//         map[i][j] = 0
//     }
// }

// 2. game update
function loop() {
  print();
  window.requestAnimationFrame(loop);
}
// 2.1. print map
function print() {
  context.fillStyle = "#e0e0e0";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // 2.2. draw a cells
  map.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 1) {
        context.fillStyle = "#fff";
        context.fillRect(j, i, 1, 1);

        // border of the cell
        context.strokeStyle = "#000";
        context.lineWidth = 0.1;
        context.strokeRect(j, i, 1, 1);
      }
    });
  });

  // 2.3. draw a pieces
  const piece= {
    position: {
      x: 5,
      y: 5,
    },
    shape: PIECES[0],
  }

  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        context.fillStyle = "#f00";
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
        // border of the cell
        context.strokeStyle = "#000";
        context.lineWidth = 0.1;
        context.strokeRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });
}

loop();
