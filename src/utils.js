import { produce } from "immer";

export const generate2DArray = (numRow, numCol, isEmpty) => {
  const arr = [];
  let row = [];
  for (let i = 0; i < numRow; i++) {
    row = [];
    for (let j = 0; j < numCol; j++) {
      row.push(Math.round(isEmpty ? 0 : Math.random(2)));
    }
    arr.push(row);
  }
  return arr;
};

export const processNextGeneration = (grid) => {
  const OPERATIONS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const numRow = grid.length;
  const numCol = grid[0].length;
  const newGrid = produce(grid, (draft) => {
    grid.forEach((row, i) => {
      row.forEach((col, j) => {
        let neighbours = 0;
        OPERATIONS.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;
          if (newI >= 0 && newI < numRow && newJ >= 0 && newJ < numCol) {
            neighbours += grid[newI][newJ];
          }
        });
        if (col) {
          draft[i][j] = neighbours === 2 || neighbours === 3 ? 1 : 0;
        } else {
          draft[i][j] = neighbours === 3 ? 1 : 0;
        }
      });
    });
  });
  return newGrid;
};
