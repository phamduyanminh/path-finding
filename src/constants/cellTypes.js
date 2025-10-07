// Cell state constants
export const CELL_EMPTY = 0;
export const CELL_START = 1;
export const CELL_END = 2;
export const CELL_WALL = 3;
export const CELL_VISITED = 4;
export const CELL_PATH = 5;
export const CELL_EXPLORING = 6;

// Cell color mapping for Tailwind classes
export const CELL_COLORS = {
  [CELL_START]: 'bg-green-500',
  [CELL_END]: 'bg-red-500',
  [CELL_WALL]: 'bg-gray-800',
  [CELL_VISITED]: 'bg-blue-200',
  [CELL_PATH]: 'bg-yellow-400',
  [CELL_EXPLORING]: 'bg-blue-400',
  [CELL_EMPTY]: 'bg-white',
};