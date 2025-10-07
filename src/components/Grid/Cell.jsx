import React from 'react';
import { CELL_COLORS } from '../../constants/cellTypes';
import { CELL_SIZE } from '../../constants/gridConstants';

/**
 * Individual cell component
 */
export const Cell = ({ cellType, row, col, onMouseDown, onMouseEnter, onMouseUp }) => {
  return (
    <div
      className={`border border-gray-300 cursor-pointer transition-colors duration-200 ${CELL_COLORS[cellType]}`}
      style={{
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
      }}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
    />
  );
};