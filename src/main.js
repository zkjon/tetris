import "./global.css";
import { PIECES, PIECE_COLORS } from "./consts/pieces";

// 1. canva init
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let BLOCK_SIZE = window.innerWidth < 600 ? 18 : 35; // block size
const MAP_WIDTH = 10;
const MAP_HEIGHT = 20;

canvas.width = BLOCK_SIZE * MAP_WIDTH;
canvas.height = BLOCK_SIZE * MAP_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

window.addEventListener("resize", () => {
  BLOCK_SIZE = window.innerWidth < 600 ? 18 : 35; // block size
  canvas.width = BLOCK_SIZE * MAP_WIDTH;
  canvas.height = BLOCK_SIZE * MAP_HEIGHT;
  context.scale(BLOCK_SIZE, BLOCK_SIZE);
});

// 3. create map, will compose of 20 rows and 10 columns using 0 and 1
function createMap(width, height) {
  return Array.from({ length: height }, () => Array(width).fill(0));
}

const map = createMap(MAP_WIDTH, MAP_HEIGHT);

// 4. create initial piece
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

let piece = createPiece();

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

  if (countDown > interval && interval > 0) {
    piece.position.y++; // move piece down
    if (checkCollision()) {
      piece.position.y--; // if there is a collision, move piece back up
      fixPiece(); // fix piece to map
      clearLines(); // clear lines if is full
    }
    countDown = 0; // reset countdown
  } else if (countDown > interval && interval === 0) {
    // if game is paused, do nothing
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

function drawCell(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
  context.strokeStyle = "#000";
  context.lineWidth = 0.1;
  context.strokeRect(x, y, 1, 1);
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

  // check if game over
    if (piece.position.y === 0) {
      alert("Game Over");
      score = 0;
      scoreElement.innerHTML = score;
      map.forEach((row) => row.fill(0)); // reset map
    }
  });

  // create new piece
  piece = createPiece();
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

// 10. rotate piece
function rotatePiece(shape) {
  return shape[0].map((_, index) => shape.map((row) => row[index]).reverse());
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

  // move down fast
  if (event.key === " ") {
    while (!checkCollision()) {
      piece.position.y++;
    }
    piece.position.y--;
    fixPiece();
    clearLines();
  }

  // rotate piece clockwise
  if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
    const rotated = rotatePiece(piece.shape);
    const original = piece.shape;
    piece.shape = rotated;
    if (checkCollision()) {
      piece.shape = original;
    }
  }

  // pause game
  if (event.key === "p" || event.key === "P") {
    if (interval) {
      interval = 0;
    } else {
      interval = 1000;
    }
  }
});

loop();