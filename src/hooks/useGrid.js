import { useState, useEffect, useCallback } from 'react';
import { createEmptyGrid, clearPath } from '../utils/gridHelpers';
import { CELL_EMPTY, CELL_START, CELL_END, CELL_WALL } from '../constants/cellTypes';

/**
 * Custom hook for managing grid state
 */
export const useGrid = () => {
  const [grid, setGrid] = useState([]);
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);

  // Initialize grid on mount
  useEffect(() => {
    setGrid(createEmptyGrid());
  }, []);

  /**
   * Updates a specific cell in the grid
   */
  const updateCell = useCallback((row, col, cellType) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      newGrid[row][col] = cellType;
      return newGrid;
    });
  }, []);

  /**
   * Sets the start position
   */
  const setStart = useCallback((row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      
      // Clear previous start
      if (startPos) {
        newGrid[startPos.row][startPos.col] = CELL_EMPTY;
      }
      
      newGrid[row][col] = CELL_START;
      return newGrid;
    });
    setStartPos({ row, col });
  }, [startPos]);

  /**
   * Sets the end position
   */
  const setEnd = useCallback((row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      
      // Clear previous end
      if (endPos) {
        newGrid[endPos.row][endPos.col] = CELL_EMPTY;
      }
      
      newGrid[row][col] = CELL_END;
      return newGrid;
    });
    setEndPos({ row, col });
  }, [endPos]);

  /**
   * Toggles a wall at the specified position
   */
  const toggleWall = useCallback((row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      const currentCell = newGrid[row][col];
      
      if (currentCell === CELL_WALL) {
        newGrid[row][col] = CELL_EMPTY;
      } else if (currentCell === CELL_EMPTY) {
        newGrid[row][col] = CELL_WALL;
      }
      
      return newGrid;
    });
  }, []);

  /**
   * Clears the path (keeps walls and start/end)
   */
  const resetPath = useCallback(() => {
    setGrid((prevGrid) => clearPath(prevGrid));
  }, []);

  /**
   * Resets the entire grid
   */
  const resetAll = useCallback(() => {
    setGrid(createEmptyGrid());
    setStartPos(null);
    setEndPos(null);
  }, []);

  return {
    grid,
    startPos,
    endPos,
    updateCell,
    setStart,
    setEnd,
    toggleWall,
    resetPath,
    resetAll,
  };
};