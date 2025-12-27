import React from 'react';

function Button({ label, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-4 text-3xl font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200 ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
