import React from 'react';

/**
 * Action buttons component
 */
export const ActionButtons = ({
  isRunning,
  onStart,
  onStop,
  onClear,
  onReset,
}) => {
  return (
    <>
      <button
        onClick={onStart}
        disabled={isRunning}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Start
      </button>

      <button
        onClick={onStop}
        disabled={!isRunning}
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Stop
      </button>

      <button
        onClick={onClear}
        disabled={isRunning}
        className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Clear
      </button>

      <button
        onClick={onReset}
        disabled={isRunning}
        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Reset
      </button>
    </>
  );
};