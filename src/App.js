import React, { useState } from 'react';
import { Grid } from './components/Grid/Grid';
import { Instructions } from './components/Instructions/Instructions';
import { PlacementModeSelector } from './components/Controls/PlacementModeSelector';
import { Legend } from './components/Legend/Legend';
import { Controls } from './components/Controls/Controls';
import { useGrid } from './hooks/useGrid';
import { usePathfinding } from './hooks/usePathfinding';
import { useMouse } from './hooks/useMouse';
import './App.css';

/**
 * Main App component - orchestrates all functionality
 */
function App() {
  const [placingMode, setPlacingMode] = useState('wall');

  // Grid management
  const {
    grid,
    startPos,
    endPos,
    updateCell,
    setStart,
    setEnd,
    toggleWall,
    resetPath,
    resetAll,
  } = useGrid();

  // Pathfinding logic
  const {
    isRunning,
    algorithm,
    setAlgorithm,
    runAlgorithm,
    stopAlgorithm,
  } = usePathfinding(grid, startPos, endPos, updateCell, resetPath);

  // Mouse interaction
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useMouse(
    isRunning,
    placingMode,
    setStart,
    setEnd,
    toggleWall
  );

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Path-Finding Visualizer
      </h1>

      <Instructions />

      <PlacementModeSelector
        placingMode={placingMode}
        setPlacingMode={setPlacingMode}
        disabled={isRunning}
      />

      <Grid
        grid={grid}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleMouseUp}
      />

      <Legend />

      <Controls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        isRunning={isRunning}
        onStart={runAlgorithm}
        onStop={stopAlgorithm}
        onClear={resetPath}
        onReset={resetAll}
      />
    </div>
  );
}

export default App;