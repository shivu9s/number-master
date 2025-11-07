import React from 'react';

const Timer = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      style={{
        fontSize: '1.3em',
        fontWeight: 'bold',
        color: timeLeft < 30 ? 'red' : '#333',
        margin: '10px 0',
      }}
    >
      {minutes}:{seconds < 10 ? '0' : ''}{seconds}
    </div>
  );
};

export default Timer;