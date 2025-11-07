import React from 'react';

const AddRowButton = ({ onClick, disabled, current, max }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        marginTop: '12px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: disabled ? '#cccccc' : '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        maxWidth: '220px',
        width: '80%',
      }}
    >
      ➕ Add Row ({current}/{max})
    </button>
  );
};

export default AddRowButton;