/**
 * Reconstructs the path from end to start using parent map
 * @param {Object} endPos - End position {row, col}
 * @param {Object} startPos - Start position {row, col}
 * @param {Map} parentMap - Map of position keys to parent positions
 * @returns {Array<{row: number, col: number}>} Path from start to end
 */
export const reconstructPath = (endPos, startPos, parentMap) => {
    const path = [];
    let current = endPos;
  
    while (
      current &&
      !(current.row === startPos.row && current.col === startPos.col)
    ) {
      path.push(current);
      current = parentMap.get(`${current.row},${current.col}`);
    }
  
    return path.reverse();
  };
  
  /**
   * Creates a position key for maps/sets
   * @param {number} row
   * @param {number} col
   * @returns {string} Position key
   */
  export const positionKey = (row, col) => `${row},${col}`;
  
  /**
   * Checks if two positions are equal
   * @param {Object} pos1 - Position {row, col}
   * @param {Object} pos2 - Position {row, col}
   * @returns {boolean}
   */
  export const positionsEqual = (pos1, pos2) => {
    return pos1.row === pos2.row && pos1.col === pos2.col;
  };