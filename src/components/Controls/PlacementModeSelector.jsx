import React from 'react';

/**
 * Placement mode selector component
 */
export const PlacementModeSelector = ({ placingMode, setPlacingMode, disabled }) => {
  const modes = [
    { value: 'start', label: 'Place Start', activeColor: 'bg-green-500' },
    { value: 'end', label: 'Place End', activeColor: 'bg-red-500' },
    { value: 'wall', label: 'Draw Walls', activeColor: 'bg-gray-800' },
  ];

  return (
    <div className="mb-4 flex gap-2">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => setPlacingMode(mode.value)}
          disabled={disabled}
          className={`px-4 py-2 rounded ${
            placingMode === mode.value
              ? `${mode.activeColor} text-white`
              : 'bg-white text-gray-700 border border-gray-300'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};