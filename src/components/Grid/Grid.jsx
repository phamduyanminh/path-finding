import React from 'react';
import { Cell } from './Cell';
import { GRID_SIZE, CELL_SIZE } from '../../constants/gridConstants';

/**
 * Grid component that renders all cells
 */
export const Grid = ({ grid, onMouseDown, onMouseEnter, onMouseUp }) => {
  return (
    <div
      className="grid gap-0 border-2 border-gray-400 mb-6"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
      }}
      onMouseLeave={onMouseUp}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cellType={cell}
            row={rowIndex}
            col={colIndex}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
          />
        ))
      )}
    </div>
  );
};