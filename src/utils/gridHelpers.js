import { GRID_SIZE } from '../constants/gridConstants.js';
import { CELL_EMPTY, CELL_WALL, CELL_VISITED, CELL_PATH, CELL_EXPLORING } from '../constants/cellTypes.js';

/**
 * Creates an empty grid
 * @returns {number[][]} 2D array representing the grid
 */
export const createEmptyGrid = () => {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => CELL_EMPTY)
  );
};

/**
 * Gets valid neighbors of a cell (up, down, left, right)
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number[][]} grid - The grid
 * @returns {Array<{row: number, col: number}>} Array of neighbor positions
 */
export const getNeighbors = (row, col, grid) => {
  const neighbors = [];
  const directions = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1],  // Right
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (
      newRow >= 0 &&
      newRow < GRID_SIZE &&
      newCol >= 0 &&
      newCol < GRID_SIZE &&
      grid[newRow][newCol] !== CELL_WALL
    ) {
      neighbors.push({ row: newRow, col: newCol });
    }
  }

  return neighbors;
};

/**
 * Clears path-related cells from the grid (keeps walls and start/end)
 * @param {number[][]} grid - The grid to clear
 * @returns {number[][]} New grid with paths cleared
 */
export const clearPath = (grid) => {
  return grid.map((row) =>
    row.map((cell) => {
      if (
        cell === CELL_VISITED ||
        cell === CELL_PATH ||
        cell === CELL_EXPLORING
      ) {
        return CELL_EMPTY;
      }
      return cell;
    })
  );
};