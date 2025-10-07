import React from 'react';
import { AlgorithmSelector } from './AlgorithmSelector';
import { ActionButtons } from './ActionButtons';

/**
 * Main controls component
 */
export const Controls = ({
  algorithm,
  setAlgorithm,
  isRunning,
  onStart,
  onStop,
  onClear,
  onReset,
}) => {
  return (
    <div className="flex gap-4 items-center">
      <AlgorithmSelector
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        disabled={isRunning}
      />
      <ActionButtons
        isRunning={isRunning}
        onStart={onStart}
        onStop={onStop}
        onClear={onClear}
        onReset={onReset}
      />
    </div>
  );
};