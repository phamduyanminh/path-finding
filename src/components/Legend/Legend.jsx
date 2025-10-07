import React from 'react';

/**
 * Legend component showing cell types
 */
export const Legend = () => {
  const legendItems = [
    { color: 'bg-green-500', label: 'Start' },
    { color: 'bg-red-500', label: 'End' },
    { color: 'bg-gray-800', label: 'Wall' },
    { color: 'bg-blue-200', label: 'Visited' },
    { color: 'bg-yellow-400', label: 'Path' },
  ];

  return (
    <div className="mb-4 flex gap-4 text-sm">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`w-4 h-4 ${item.color} border border-gray-300`}></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};