import React from 'react';

function Display({ value }) {
  return (
    <div className="bg-gray-800 text-white text-right p-4 rounded-t-lg mb-2 text-5xl font-light overflow-hidden whitespace-nowrap">
      {value}
    </div>
  );
}

export default Display;
