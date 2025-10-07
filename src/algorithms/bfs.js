import { getNeighbors } from '../utils/gridHelpers';
import { positionKey, positionsEqual } from '../utils/pathHelpers';
import { CELL_EXPLORING, CELL_VISITED } from '../constants/cellTypes';

/**
 * Breadth-First Search algorithm
 * @param {Object} startPos - Start position {row, col}
 * @param {Object} endPos - End position {row, col}
 * @param {number[][]} grid - The grid
 * @param {Function} onExplore - Callback when exploring a cell (row, col, cellType)
 * @returns {Promise<{found: boolean, path: Array, visitedOrder: Array}>}
 */
export const bfs = async (startPos, endPos, grid, onExplore) => {
  const queue = [startPos];
  const visited = new Set();
  const parent = new Map();
  const visitedOrder = [];

  visited.add(positionKey(startPos.row, startPos.col));

  while (queue.length > 0) {
    const current = queue.shift();

    // Skip visualization for start and end
    if (
      !positionsEqual(current, startPos) &&
      !positionsEqual(current, endPos)
    ) {
      // Visualize exploration
      await onExplore(current.row, current.col, CELL_EXPLORING);
      await onExplore(current.row, current.col, CELL_VISITED);
      visitedOrder.push(current);
    }

    // Check if we reached the end
    if (positionsEqual(current, endPos)) {
      return {
        found: true,
        parent,
        visitedOrder,
      };
    }

    // Explore neighbors
    const neighbors = getNeighbors(current.row, current.col, grid);
    for (const neighbor of neighbors) {
      const key = positionKey(neighbor.row, neighbor.col);
      if (!visited.has(key)) {
        visited.add(key);
        parent.set(key, current);
        queue.push(neighbor);
      }
    }
  }

  return {
    found: false,
    parent,
    visitedOrder,
  };
};