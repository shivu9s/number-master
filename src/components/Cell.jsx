import React from 'react';

const Cell = ({ cell, isSelected, onClick }) => {
  const style = {
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'min(22px, 4vw)',
    fontWeight: 'bold',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: cell.matched
      ? '#e0e0e0'
      : isSelected
      ? '#a0cfff'
      : '#f5f5f5',
    color: cell.matched ? '#999' : '#000',
    cursor: cell.matched ? 'default' : 'pointer',
    userSelect: 'none',
  };

  return (
    <div
      id={cell.id}
      style={style}
      onClick={onClick}
    >
      {cell.value}
    </div>
  );
};

export default Cell;