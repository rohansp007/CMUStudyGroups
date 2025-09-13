import React from 'react';

const ResultsCount = ({ count }) => (
  <div className="mb-6">
    <p className="text-gray-400">
      Showing {count} study group{count !== 1 ? 's' : ''}
    </p>
  </div>
);

export default ResultsCount;
