// CardGrid.js
import React from 'react';

const CardGrid = ({ children }) => {
  return <div className="grid grid-cols-2 gap-4 mt-4">{children}</div>;
};

export default CardGrid;
