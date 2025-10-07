import { getNeighbors } from '../utils/gridHelpers';
import { positionKey, positionsEqual } from '../utils/pathHelpers';
import { CELL_EXPLORING, CELL_VISITED } from '../constants/cellTypes';

/**
 * Depth-First Search algorithm
 * @param {Object} startPos - Start position {row, col}
 * @param {Object} endPos - End position {row, col}
 * @param {number[][]} grid - The grid
 * @param {Function} onExplore - Callback when exploring a cell
 * @returns {Promise<{found: boolean, parent: Map, visitedOrder: Array}>}
 */
export const dfs = async (startPos, endPos, grid, onExplore) => {
  const stack = [startPos];
  const visited = new Set();
  const parent = new Map();
  const visitedOrder = [];

  while (stack.length > 0) {
    const current = stack.pop();
    const key = positionKey(current.row, current.col);

    if (visited.has(key)) continue;
    visited.add(key);

    // Visualize exploration
    if (
      !positionsEqual(current, startPos) &&
      !positionsEqual(current, endPos)
    ) {
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
      const neighborKey = positionKey(neighbor.row, neighbor.col);
      if (!visited.has(neighborKey)) {
        parent.set(neighborKey, current);
        stack.push(neighbor);
      }
    }
  }

  return {
    found: false,
    parent,
    visitedOrder,
  };
};