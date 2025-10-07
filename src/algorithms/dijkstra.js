import { GRID_SIZE } from '../constants/gridConstants';
import { getNeighbors } from '../utils/gridHelpers';
import { positionKey, positionsEqual } from '../utils/pathHelpers';
import { CELL_EXPLORING, CELL_VISITED } from '../constants/cellTypes';

/**
 * Dijkstra's Algorithm
 * @param {Object} startPos - Start position {row, col}
 * @param {Object} endPos - End position {row, col}
 * @param {number[][]} grid - The grid
 * @param {Function} onExplore - Callback when exploring a cell
 * @returns {Promise<{found: boolean, parent: Map, visitedOrder: Array}>}
 */
export const dijkstra = async (startPos, endPos, grid, onExplore) => {
  const distances = {};
  const parent = new Map();
  const unvisited = new Set();
  const visitedOrder = [];

  // Initialize distances
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const key = positionKey(i, j);
      distances[key] = Infinity;
      unvisited.add(key);
    }
  }
  distances[positionKey(startPos.row, startPos.col)] = 0;

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let minNode = null;
    let minDistance = Infinity;

    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        minNode = node;
      }
    }

    if (minNode === null || minDistance === Infinity) break;

    unvisited.delete(minNode);
    const [row, col] = minNode.split(',').map(Number);

    // Visualize exploration
    if (
      !(row === startPos.row && col === startPos.col) &&
      !(row === endPos.row && col === endPos.col)
    ) {
      await onExplore(row, col, CELL_EXPLORING);
      await onExplore(row, col, CELL_VISITED);
      visitedOrder.push({ row, col });
    }

    // Check if we reached the end
    if (row === endPos.row && col === endPos.col) {
      return {
        found: true,
        parent,
        visitedOrder,
      };
    }

    // Update distances to neighbors
    const neighbors = getNeighbors(row, col, grid);
    for (const neighbor of neighbors) {
      const neighborKey = positionKey(neighbor.row, neighbor.col);
      const altDistance = distances[minNode] + 1;

      if (altDistance < distances[neighborKey]) {
        distances[neighborKey] = altDistance;
        parent.set(neighborKey, { row, col });
      }
    }
  }

  return {
    found: false,
    parent,
    visitedOrder,
  };
};