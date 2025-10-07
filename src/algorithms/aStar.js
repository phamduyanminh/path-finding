import { GRID_SIZE } from '../constants/gridConstants';
import { getNeighbors } from '../utils/gridHelpers';
import { positionKey, positionsEqual } from '../utils/pathHelpers';
import { CELL_EXPLORING, CELL_VISITED } from '../constants/cellTypes';

/**
 * Manhattan distance heuristic
 * @param {Object} pos - Current position {row, col}
 * @param {Object} endPos - End position {row, col}
 * @returns {number} Manhattan distance
 */
const heuristic = (pos, endPos) => {
  return Math.abs(pos.row - endPos.row) + Math.abs(pos.col - endPos.col);
};

/**
 * A* Algorithm
 * @param {Object} startPos - Start position {row, col}
 * @param {Object} endPos - End position {row, col}
 * @param {number[][]} grid - The grid
 * @param {Function} onExplore - Callback when exploring a cell
 * @returns {Promise<{found: boolean, parent: Map, visitedOrder: Array}>}
 */
export const aStar = async (startPos, endPos, grid, onExplore) => {
  const openSet = [startPos];
  const closedSet = new Set();
  const gScore = {};
  const fScore = {};
  const parent = new Map();
  const visitedOrder = [];

  // Initialize scores
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const key = positionKey(i, j);
      gScore[key] = Infinity;
      fScore[key] = Infinity;
    }
  }

  const startKey = positionKey(startPos.row, startPos.col);
  gScore[startKey] = 0;
  fScore[startKey] = heuristic(startPos, endPos);

  while (openSet.length > 0) {
    // Find node with lowest fScore
    let current = null;
    let lowestFScore = Infinity;
    let currentIndex = -1;

    for (let i = 0; i < openSet.length; i++) {
      const node = openSet[i];
      const key = positionKey(node.row, node.col);
      if (fScore[key] < lowestFScore) {
        lowestFScore = fScore[key];
        current = node;
        currentIndex = i;
      }
    }

    if (current === null) break;

    // Check if we reached the end
    if (positionsEqual(current, endPos)) {
      return {
        found: true,
        parent,
        visitedOrder,
      };
    }

    openSet.splice(currentIndex, 1);
    closedSet.add(positionKey(current.row, current.col));

    // Visualize exploration
    if (!positionsEqual(current, startPos)) {
      await onExplore(current.row, current.col, CELL_EXPLORING);
      await onExplore(current.row, current.col, CELL_VISITED);
      visitedOrder.push(current);
    }

    // Check neighbors
    const neighbors = getNeighbors(current.row, current.col, grid);
    for (const neighbor of neighbors) {
      const neighborKey = positionKey(neighbor.row, neighbor.col);

      if (closedSet.has(neighborKey)) continue;

      const currentKey = positionKey(current.row, current.col);
      const tentativeGScore = gScore[currentKey] + 1;

      const inOpenSet = openSet.some((n) => positionsEqual(n, neighbor));

      if (!inOpenSet) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= gScore[neighborKey]) {
        continue;
      }

      parent.set(neighborKey, current);
      gScore[neighborKey] = tentativeGScore;
      fScore[neighborKey] = gScore[neighborKey] + heuristic(neighbor, endPos);
    }
  }

  return {
    found: false,
    parent,
    visitedOrder,
  };
};