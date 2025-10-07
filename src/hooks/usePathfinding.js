import { useState, useCallback } from 'react';
import { bfs, dfs, dijkstra, aStar } from '../algorithms';
import { reconstructPath } from '../utils/pathHelpers';
import { explorationDelay, pathDelay } from '../utils/visualizationHelper';
import { CELL_PATH } from '../constants/cellTypes';
import { ALGORITHMS } from '../constants/algorithmConfig';

/**
 * Custom hook for pathfinding logic
 */
export const usePathfinding = (grid, startPos, endPos, updateCell, resetPath) => {
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState(ALGORITHMS.BFS);

  /**
   * Callback for algorithm to visualize exploration
   */
  const onExplore = useCallback(
    async (row, col, cellType) => {
      updateCell(row, col, cellType);
      await explorationDelay();
    },
    [updateCell]
  );

  /**
   * Visualizes the final path
   */
  const visualizePath = useCallback(
    async (path, endPos) => {
      for (const pos of path) {
        if (!(pos.row === endPos.row && pos.col === endPos.col)) {
          updateCell(pos.row, pos.col, CELL_PATH);
          await pathDelay();
        }
      }
    },
    [updateCell]
  );

  /**
   * Runs the selected algorithm
   */
  const runAlgorithm = useCallback(async () => {
    if (!startPos || !endPos) {
      alert('Please set both start and end points!');
      return;
    }

    resetPath();
    setIsRunning(true);

    let result;

    // Select and run algorithm
    switch (algorithm) {
      case ALGORITHMS.BFS:
        result = await bfs(startPos, endPos, grid, onExplore);
        break;
      case ALGORITHMS.DFS:
        result = await dfs(startPos, endPos, grid, onExplore);
        break;
      case ALGORITHMS.DIJKSTRA:
        result = await dijkstra(startPos, endPos, grid, onExplore);
        break;
      case ALGORITHMS.ASTAR:
        result = await aStar(startPos, endPos, grid, onExplore);
        break;
      default:
        break;
    }

    // Visualize path if found
    if (result && result.found) {
      const path = reconstructPath(endPos, startPos, result.parent);
      await visualizePath(path, endPos);
    } else {
      alert('No path found!');
    }

    setIsRunning(false);
  }, [algorithm, startPos, endPos, grid, onExplore, visualizePath, resetPath]);

  /**
   * Stops the algorithm
   */
  const stopAlgorithm = useCallback(() => {
    setIsRunning(false);
  }, []);

  return {
    isRunning,
    algorithm,
    setAlgorithm,
    runAlgorithm,
    stopAlgorithm,
  };
};