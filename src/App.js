import React, { useState, useEffect, useCallback } from 'react';


import './App.css';

const GRID_SIZE = 20;
const CELL_SIZE = 25;

// Cell states
const CELL_EMPTY = 0;
const CELL_START = 1;
const CELL_END = 2;
const CELL_WALL = 3;
const CELL_VISITED = 4;
const CELL_PATH = 5;
const CELL_EXPLORING = 6;

function App() {
  const [grid, setGrid] = useState([]);
    const [startPos, setStartPos] = useState(null);
    const [endPos, setEndPos] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [algorithm, setAlgorithm] = useState('bfs');
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [placingMode, setPlacingMode] = useState('wall'); // 'start', 'end', 'wall'
  
    // Initialize grid
    useEffect(() => {
      const newGrid = [];
      for (let i = 0; i < GRID_SIZE; i++) {
        const row = [];
        for (let j = 0; j < GRID_SIZE; j++) {
          row.push(CELL_EMPTY);
        }
        newGrid.push(row);
      }
      setGrid(newGrid);
    }, []);
  
    // Reset grid (keep walls)
    const resetPath = () => {
      setIsRunning(false);
      const newGrid = grid.map(row => 
        row.map(cell => {
          if (cell === CELL_VISITED || cell === CELL_PATH || cell === CELL_EXPLORING) {
            return CELL_EMPTY;
          }
          return cell;
        })
      );
      setGrid(newGrid);
    };
  
    // Complete reset
    const resetAll = () => {
      setIsRunning(false);
      setStartPos(null);
      setEndPos(null);
      const newGrid = [];
      for (let i = 0; i < GRID_SIZE; i++) {
        const row = [];
        for (let j = 0; j < GRID_SIZE; j++) {
          row.push(CELL_EMPTY);
        }
        newGrid.push(row);
      }
      setGrid(newGrid);
    };
  
    // Handle cell click
    const handleCellClick = (row, col) => {
      if (isRunning) return;
  
      const newGrid = [...grid];
      
      if (placingMode === 'start') {
        // Clear previous start
        if (startPos) {
          newGrid[startPos.row][startPos.col] = CELL_EMPTY;
        }
        newGrid[row][col] = CELL_START;
        setStartPos({ row, col });
        setGrid(newGrid);
      } else if (placingMode === 'end') {
        // Clear previous end
        if (endPos) {
          newGrid[endPos.row][endPos.col] = CELL_EMPTY;
        }
        newGrid[row][col] = CELL_END;
        setEndPos({ row, col });
        setGrid(newGrid);
      } else {
        // Toggle wall
        if (newGrid[row][col] === CELL_WALL) {
          newGrid[row][col] = CELL_EMPTY;
        } else if (newGrid[row][col] === CELL_EMPTY) {
          newGrid[row][col] = CELL_WALL;
        }
        setGrid(newGrid);
      }
    };
  
    const handleMouseDown = (row, col) => {
      if (placingMode === 'wall') {
        setMouseIsPressed(true);
        handleCellClick(row, col);
      } else {
        handleCellClick(row, col);
      }
    };
  
    const handleMouseEnter = (row, col) => {
      if (!mouseIsPressed || placingMode !== 'wall') return;
      const newGrid = [...grid];
      if (newGrid[row][col] === CELL_EMPTY) {
        newGrid[row][col] = CELL_WALL;
        setGrid(newGrid);
      }
    };
  
    const handleMouseUp = () => {
      setMouseIsPressed(false);
    };
  
    // Get neighbors of a cell
    const getNeighbors = (row, col) => {
      const neighbors = [];
      const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1] // Up, Down, Left, Right
      ];
      
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        if (newRow >= 0 && newRow < GRID_SIZE && 
            newCol >= 0 && newCol < GRID_SIZE &&
            grid[newRow][newCol] !== CELL_WALL) {
          neighbors.push({ row: newRow, col: newCol });
        }
      }
      
      return neighbors;
    };
  
    // BFS Algorithm
    const bfs = async () => {
      if (!startPos || !endPos) return;
      
      const queue = [startPos];
      const visited = new Set();
      const parent = new Map();
      visited.add(`${startPos.row},${startPos.col}`);
      
      while (queue.length > 0) {
        const current = queue.shift();
        
        // Visualize exploration
        if (!(current.row === startPos.row && current.col === startPos.col) &&
            !(current.row === endPos.row && current.col === endPos.col)) {
          const newGrid = [...grid];
          newGrid[current.row][current.col] = CELL_EXPLORING;
          setGrid(newGrid);
          await new Promise(resolve => setTimeout(resolve, 20));
          newGrid[current.row][current.col] = CELL_VISITED;
          setGrid(newGrid);
        }
        
        // Check if we reached the end
        if (current.row === endPos.row && current.col === endPos.col) {
          // Reconstruct path
          let pathNode = current;
          const path = [];
          
          while (pathNode && !(pathNode.row === startPos.row && pathNode.col === startPos.col)) {
            path.push(pathNode);
            pathNode = parent.get(`${pathNode.row},${pathNode.col}`);
          }
          
          // Visualize path
          for (let i = path.length - 1; i >= 0; i--) {
            if (!(path[i].row === endPos.row && path[i].col === endPos.col)) {
              const newGrid = [...grid];
              newGrid[path[i].row][path[i].col] = CELL_PATH;
              setGrid(newGrid);
              await new Promise(resolve => setTimeout(resolve, 30));
            }
          }
          
          return true;
        }
        
        // Explore neighbors
        const neighbors = getNeighbors(current.row, current.col);
        for (const neighbor of neighbors) {
          const key = `${neighbor.row},${neighbor.col}`;
          if (!visited.has(key)) {
            visited.add(key);
            parent.set(key, current);
            queue.push(neighbor);
          }
        }
      }
      
      return false;
    };
  
    // DFS Algorithm
    const dfs = async () => {
      if (!startPos || !endPos) return;
      
      const stack = [startPos];
      const visited = new Set();
      const parent = new Map();
      
      while (stack.length > 0) {
        const current = stack.pop();
        const key = `${current.row},${current.col}`;
        
        if (visited.has(key)) continue;
        visited.add(key);
        
        // Visualize exploration
        if (!(current.row === startPos.row && current.col === startPos.col) &&
            !(current.row === endPos.row && current.col === endPos.col)) {
          const newGrid = [...grid];
          newGrid[current.row][current.col] = CELL_EXPLORING;
          setGrid(newGrid);
          await new Promise(resolve => setTimeout(resolve, 20));
          newGrid[current.row][current.col] = CELL_VISITED;
          setGrid(newGrid);
        }
        
        // Check if we reached the end
        if (current.row === endPos.row && current.col === endPos.col) {
          // Reconstruct path
          let pathNode = current;
          const path = [];
          
          while (pathNode && !(pathNode.row === startPos.row && pathNode.col === startPos.col)) {
            path.push(pathNode);
            pathNode = parent.get(`${pathNode.row},${pathNode.col}`);
          }
          
          // Visualize path
          for (let i = path.length - 1; i >= 0; i--) {
            if (!(path[i].row === endPos.row && path[i].col === endPos.col)) {
              const newGrid = [...grid];
              newGrid[path[i].row][path[i].col] = CELL_PATH;
              setGrid(newGrid);
              await new Promise(resolve => setTimeout(resolve, 30));
            }
          }
          
          return true;
        }
        
        // Explore neighbors
        const neighbors = getNeighbors(current.row, current.col);
        for (const neighbor of neighbors) {
          const neighborKey = `${neighbor.row},${neighbor.col}`;
          if (!visited.has(neighborKey)) {
            parent.set(neighborKey, current);
            stack.push(neighbor);
          }
        }
      }
      
      return false;
    };
  
    // Dijkstra's Algorithm
    const dijkstra = async () => {
      if (!startPos || !endPos) return;
      
      const distances = {};
      const parent = new Map();
      const unvisited = new Set();
      
      // Initialize distances
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const key = `${i},${j}`;
          distances[key] = Infinity;
          unvisited.add(key);
        }
      }
      distances[`${startPos.row},${startPos.col}`] = 0;
      
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
        if (!(row === startPos.row && col === startPos.col) &&
            !(row === endPos.row && col === endPos.col)) {
          const newGrid = [...grid];
          newGrid[row][col] = CELL_EXPLORING;
          setGrid(newGrid);
          await new Promise(resolve => setTimeout(resolve, 20));
          newGrid[row][col] = CELL_VISITED;
          setGrid(newGrid);
        }
        
        // Check if we reached the end
        if (row === endPos.row && col === endPos.col) {
          // Reconstruct path
          let pathNode = { row, col };
          const path = [];
          
          while (pathNode && !(pathNode.row === startPos.row && pathNode.col === startPos.col)) {
            path.push(pathNode);
            pathNode = parent.get(`${pathNode.row},${pathNode.col}`);
          }
          
          // Visualize path
          for (let i = path.length - 1; i >= 0; i--) {
            if (!(path[i].row === endPos.row && path[i].col === endPos.col)) {
              const newGrid = [...grid];
              newGrid[path[i].row][path[i].col] = CELL_PATH;
              setGrid(newGrid);
              await new Promise(resolve => setTimeout(resolve, 30));
            }
          }
          
          return true;
        }
        
        // Update distances to neighbors
        const neighbors = getNeighbors(row, col);
        for (const neighbor of neighbors) {
          const neighborKey = `${neighbor.row},${neighbor.col}`;
          const altDistance = distances[minNode] + 1;
          
          if (altDistance < distances[neighborKey]) {
            distances[neighborKey] = altDistance;
            parent.set(neighborKey, { row, col });
          }
        }
      }
      
      return false;
    };
  
    // A* Algorithm
    const aStar = async () => {
      if (!startPos || !endPos) return;
      
      const heuristic = (pos) => {
        return Math.abs(pos.row - endPos.row) + Math.abs(pos.col - endPos.col);
      };
      
      const openSet = [startPos];
      const closedSet = new Set();
      const gScore = {};
      const fScore = {};
      const parent = new Map();
      
      // Initialize scores
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const key = `${i},${j}`;
          gScore[key] = Infinity;
          fScore[key] = Infinity;
        }
      }
      
      gScore[`${startPos.row},${startPos.col}`] = 0;
      fScore[`${startPos.row},${startPos.col}`] = heuristic(startPos);
      
      while (openSet.length > 0) {
        // Find node with lowest fScore
        let current = null;
        let lowestFScore = Infinity;
        let currentIndex = -1;
        
        for (let i = 0; i < openSet.length; i++) {
          const node = openSet[i];
          const key = `${node.row},${node.col}`;
          if (fScore[key] < lowestFScore) {
            lowestFScore = fScore[key];
            current = node;
            currentIndex = i;
          }
        }
        
        if (current === null) break;
        
        // Check if we reached the end
        if (current.row === endPos.row && current.col === endPos.col) {
          // Reconstruct path
          let pathNode = current;
          const path = [];
          
          while (pathNode && !(pathNode.row === startPos.row && pathNode.col === startPos.col)) {
            path.push(pathNode);
            pathNode = parent.get(`${pathNode.row},${pathNode.col}`);
          }
          
          // Visualize path
          for (let i = path.length - 1; i >= 0; i--) {
            if (!(path[i].row === endPos.row && path[i].col === endPos.col)) {
              const newGrid = [...grid];
              newGrid[path[i].row][path[i].col] = CELL_PATH;
              setGrid(newGrid);
              await new Promise(resolve => setTimeout(resolve, 30));
            }
          }
          
          return true;
        }
        
        openSet.splice(currentIndex, 1);
        closedSet.add(`${current.row},${current.col}`);
        
        // Visualize exploration
        if (!(current.row === startPos.row && current.col === startPos.col)) {
          const newGrid = [...grid];
          newGrid[current.row][current.col] = CELL_EXPLORING;
          setGrid(newGrid);
          await new Promise(resolve => setTimeout(resolve, 20));
          newGrid[current.row][current.col] = CELL_VISITED;
          setGrid(newGrid);
        }
        
        // Check neighbors
        const neighbors = getNeighbors(current.row, current.col);
        for (const neighbor of neighbors) {
          const neighborKey = `${neighbor.row},${neighbor.col}`;
          
          if (closedSet.has(neighborKey)) continue;
          
          const tentativeGScore = gScore[`${current.row},${current.col}`] + 1;
          
          const inOpenSet = openSet.some(n => n.row === neighbor.row && n.col === neighbor.col);
          
          if (!inOpenSet) {
            openSet.push(neighbor);
          } else if (tentativeGScore >= gScore[neighborKey]) {
            continue;
          }
          
          parent.set(neighborKey, current);
          gScore[neighborKey] = tentativeGScore;
          fScore[neighborKey] = gScore[neighborKey] + heuristic(neighbor);
        }
      }
      
      return false;
    };
  
    // Start visualization
    const startVisualization = async () => {
      if (!startPos || !endPos) {
        alert('Please set both start and end points!');
        return;
      }
      
      resetPath();
      setIsRunning(true);
      
      let result = false;
      
      switch(algorithm) {
        case 'bfs':
          result = await bfs();
          break;
        case 'dfs':
          result = await dfs();
          break;
        case 'dijkstra':
          result = await dijkstra();
          break;
        case 'astar':
          result = await aStar();
          break;
        default:
          break;
      }
      
      setIsRunning(false);
      
      if (!result) {
        alert('No path found!');
      }
    };
  
    // Get cell color
    const getCellColor = (cellType) => {
      switch(cellType) {
        case CELL_START:
          return 'bg-green-500';
        case CELL_END:
          return 'bg-red-500';
        case CELL_WALL:
          return 'bg-gray-800';
        case CELL_VISITED:
          return 'bg-blue-200';
        case CELL_PATH:
          return 'bg-yellow-400';
        case CELL_EXPLORING:
          return 'bg-blue-400';
        default:
          return 'bg-white';
      }
    };
  
    return (
      <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Pathfinding Algorithm Visualizer</h1>
        
        {/* Instructions */}
        <div className="mb-4 text-sm text-gray-600 text-center max-w-2xl">
          <p className="mb-2">Select a placement mode below, then click on the grid to place items.</p>
          <p>For walls, you can click and drag to draw multiple walls.</p>
        </div>
        
        {/* Placement Mode Selection */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setPlacingMode('start')}
            className={`px-4 py-2 rounded ${
              placingMode === 'start' 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Place Start
          </button>
          <button
            onClick={() => setPlacingMode('end')}
            className={`px-4 py-2 rounded ${
              placingMode === 'end' 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Place End
          </button>
          <button
            onClick={() => setPlacingMode('wall')}
            className={`px-4 py-2 rounded ${
              placingMode === 'wall' 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Draw Walls
          </button>
        </div>
        
        {/* Grid */}
        <div 
          className="grid gap-0 border-2 border-gray-400 mb-6"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`
          }}
          onMouseLeave={handleMouseUp}
        >
          {grid.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`border border-gray-300 cursor-pointer transition-colors duration-200 ${getCellColor(cell)}`}
                style={{
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`
                }}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
              />
            ))
          )}
        </div>
        
        {/* Legend */}
        <div className="mb-4 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 border border-gray-300"></div>
            <span>Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 border border-gray-300"></div>
            <span>End</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-800 border border-gray-300"></div>
            <span>Wall</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 border border-gray-300"></div>
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 border border-gray-300"></div>
            <span>Path</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex gap-4 items-center">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
            className="px-4 py-2 rounded border border-gray-300 bg-white"
          >
            <option value="bfs">Breadth-First Search (BFS)</option>
            <option value="dfs">Depth-First Search (DFS)</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="astar">A* Algorithm</option>
          </select>
          
          <button
            onClick={startVisualization}
            disabled={isRunning}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Start
          </button>
          
          <button
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Stop
          </button>
          
          <button
            onClick={resetPath}
            disabled={isRunning}
            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Clear
          </button>
          
          <button
            onClick={resetAll}
            disabled={isRunning}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </div>
    );
}

export default App;
