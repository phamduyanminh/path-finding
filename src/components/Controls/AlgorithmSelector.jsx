import React from 'react';
import { ALGORITHM_NAMES } from '../../constants/algorithmConfig';

/**
 * Algorithm selector dropdown
 */
export const AlgorithmSelector = ({ algorithm, setAlgorithm, disabled }) => {
  return (
    <select
      value={algorithm}
      onChange={(e) => setAlgorithm(e.target.value)}
      disabled={disabled}
      className="px-4 py-2 rounded border border-gray-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {Object.entries(ALGORITHM_NAMES).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};