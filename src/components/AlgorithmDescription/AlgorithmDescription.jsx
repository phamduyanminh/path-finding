import React from 'react';
import { ALGORITHM_DESCRIPTIONS } from '../../constants/algorithmDescriptions';

/**
 * Algorithm description panel component
 */
export const AlgorithmDescription = ({ algorithm }) => {
  const info = ALGORITHM_DESCRIPTIONS[algorithm];

  if (!info) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        {info.name}
      </h2>
      
      <p className="text-gray-700 mb-4 leading-relaxed">
        {info.description}
      </p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          How It Works:
        </h3>
        <ul className="space-y-2">
          {info.howItWorks.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              <span className="text-gray-700 text-sm">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-700">Time Complexity:</span>
          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">
            {info.timeComplexity}
          </code>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-700">Space Complexity:</span>
          <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">
            {info.spaceComplexity}
          </code>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-700">Shortest Path:</span>
          <span className={`px-2 py-1 rounded font-medium ${
            info.guaranteesShortestPath 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {info.guaranteesShortestPath ? 'Guaranteed ✓' : 'Not Guaranteed'}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-700">Weighted:</span>
          <span className={`px-2 py-1 rounded font-medium ${
            info.weighted 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {info.weighted ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  );
};

