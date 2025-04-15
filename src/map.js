import { MAP_WIDTH, MAP_HEIGHT } from "./canvas";

function createMap() {
  return Array.from({ length: MAP_HEIGHT }, () => Array(MAP_WIDTH).fill(0));
}

function clearLines(map) {
  let linesToClear = 0;

  for (let y = map.length - 1; y >= 0; y--) {
    if (map[y].every(cell => cell !== 0)) {
      map.splice(y, 1);
      map.unshift(Array(MAP_WIDTH).fill(0));
      linesToClear++;
    }
  }

  return linesToClear;
}

export { createMap, clearLines };
