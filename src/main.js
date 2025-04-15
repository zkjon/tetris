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

];
for (let i = 0; i < MAP_HEIGHT; i++) {
    map[i] = []
    for (let j = 0; j < MAP_WIDTH; j++) {
        map[i][j] = 0
    }
}

// 4. create piece && random initial piece on randon x position
const piece = {
  shape: PIECES[Math.floor(Math.random() * PIECES.length)], // random initial piece
  position: {
    x: Math.floor(Math.random() * (MAP_WIDTH - 4)), // random x position
    y: 0,
  },
};

// 9. score
let score = 0;
const scoreElement = document.querySelector("#score");
scoreElement.innerHTML = score;

// 2. game update
let countDown = 0;
let previousTime = 0;
let interval = 1000; // 1 second
function loop(time = 0) {
  let thisTime = time - previousTime; // time since last frame

  countDown += thisTime; // add time since last frame to countdown

  if (countDown > interval) {
    piece.position.y++; // move piece down
    if (checkCollision()) {
      piece.position.y--; // if there is a collision, move piece back up
      fixPiece(); // fix piece to map
      clearLines(); // clear lines if is full
    }
    countDown = 0; // reset countdown
  }

  previousTime = time; // update previous time
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
        context.fillStyle = "#fff"; // white color
        context.fillRect(j, i, 1, 1); // draw a cell

        // border of the cell
        context.strokeStyle = "#000"; // black color
        context.lineWidth = 0.1; // border width
        context.strokeRect(j, i, 1, 1); // draw a border
      }
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        context.fillStyle = "#f00"; // red color
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1); // draw a cell
        // border of the cell
        context.strokeStyle = "#000";
        context.lineWidth = 0.1;
        context.strokeRect(x + piece.position.x, y + piece.position.y, 1, 1); // draw a border
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
  piece.position.x = Math.floor(Math.random() * (MAP_WIDTH - 4)); // random x position

  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]; // random piece
}

// 8. clear lines
function clearLines() {
  let linesToClear = 0;
  map.forEach((row, y) => {
    if (row.every((cell) => cell !== 0)) {
      map.splice(y, 1); // remove the row
      map.unshift(Array(MAP_WIDTH).fill(0)); // add a new row at the top
      linesToClear++; // increment lines to clear
    }
  });
  score += linesToClear ** 2; // increment score this algorithm is 1, 4, 9 or 16
  scoreElement.innerHTML = score; // update score
}

// 5. keydown event
document.addEventListener("keydown", (event) => {
  // move left
  if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
    piece.position.x--;
    if (checkCollision()) {
      piece.position.x++;
    }
  }

  // move right
  if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
    piece.position.x++;
    if (checkCollision()) {
      piece.position.x--;
    }
  }

  // move down
  if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      fixPiece();
      clearLines();
    }
  }

  // rotate piece clockwise
  if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
    const rotatedShape = piece.shape[0].map((_, index) =>
      piece.shape.map((row) => row[index]).reverse()
    ); // rotate piece 90 degrees clockwise
    const originalShape = piece.shape; // store original shape for collision check
    piece.shape = rotatedShape; // rotate piece

    if (checkCollision()) {
      piece.shape = originalShape; // revert to original shape
    }
  }
});

loop();
