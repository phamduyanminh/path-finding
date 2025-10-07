import { useState, useCallback } from 'react';

/**
 * Custom hook for mouse interaction
 */
export const useMouse = (isRunning, placingMode, setStart, setEnd, toggleWall) => {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = useCallback(
    (row, col) => {
      if (isRunning) return;

      if (placingMode === 'start') {
        setStart(row, col);
      } else if (placingMode === 'end') {
        setEnd(row, col);
      } else if (placingMode === 'wall') {
        setMouseIsPressed(true);
        toggleWall(row, col);
      }
    },
    [isRunning, placingMode, setStart, setEnd, toggleWall]
  );

  const handleMouseEnter = useCallback(
    (row, col) => {
      if (!mouseIsPressed || placingMode !== 'wall' || isRunning) return;
      toggleWall(row, col);
    },
    [mouseIsPressed, placingMode, isRunning, toggleWall]
  );

  const handleMouseUp = useCallback(() => {
    setMouseIsPressed(false);
  }, []);

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};