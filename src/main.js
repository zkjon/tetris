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
  [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
];
// for (let i = 0; i < MAP_HEIGHT; i++) {
//     map[i] = []
//     for (let j = 0; j < MAP_WIDTH; j++) {
//         map[i][j] = 0
//     }
// }

// 2. game update
let countDown = 0;
let previousTime = 0;
let interval = 1000; // 1 second
function loop(time = 0) {
  let thisTime = time - previousTime;

  countDown += thisTime;

  if (countDown > interval) {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      fixPiece();
      clearLines();
    }
  }

  countDown = 0

  print();
  window.requestAnimationFrame(loop);
}

// 4. create piece
const piece = {
  position: { x: 5, y: 5 },
  shape: PIECES[0],
};

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

// 6. check collision
function checkCollision() {
  return piece.shape.find((row, y) => {
    return row.find((cell, x) => {
      return (
        cell !== 0 && // if the cell is not empty
        map[y + piece.position.y]?.[x + piece.position.x] !== 0
      ); // if the cell is not out of bounds
    });
  });
}

// 7. fix piece
function fixPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== 0) {
        map[y + piece.position.y][x + piece.position.x] = cell;
      }
    });
  });

  piece.position.y = 0;
  piece.position.x = 0;
}

// 8. clear lines
function clearLines() {
  map.forEach((row, y) => {
    if (row.every((cell) => cell !== 0)) {
      map.splice(y, 1); // remove the row
      map.unshift(Array(MAP_WIDTH).fill(0)); // add a new row at the top
    }
  });
}

// 5. keydown event
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    piece.position.x--;
    if (checkCollision()) {
      piece.position.x++;
    }
  }
  if (event.key === "ArrowRight") {
    piece.position.x++;
    if (checkCollision()) {
      piece.position.x--;
    }
  }

  if (event.key === "ArrowDown") {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      fixPiece();
      clearLines();
    }
  }
});

loop();
