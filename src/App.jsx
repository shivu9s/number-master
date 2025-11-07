import React, { useState, useEffect } from 'react';
import GameGrid from './components/GameGrid';
import Timer from './components/Timer';
import { LEVELS } from './levels/levelData';
import './index.css';

export default function App() {
  const [levelIndex, setLevelIndex] = useState(() => {
    return Math.min(LEVELS.length - 1, Math.max(0, parseInt(localStorage.getItem('nm_level') || '0')));
  });
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  const level = LEVELS[levelIndex];

  // Reset level on change
  useEffect(() => {
    setTimeLeft(120);
    setGameStatus('playing');
  }, [levelIndex]);

  // Timer
  useEffect(() => {
    if (gameStatus !== 'playing') return;
    const id = setInterval(() => {
      setTimeLeft(t => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [gameStatus]);

  // Time up
  useEffect(() => {
    if (timeLeft === 0 && gameStatus === 'playing') {
      setGameStatus('lost');
    }
  }, [timeLeft, gameStatus]);

  const handleLevelComplete = () => {
    if (levelIndex < LEVELS.length - 1) {
      localStorage.setItem('nm_level', levelIndex + 1);
      setLevelIndex(levelIndex + 1);
    } else {
      setGameStatus('won');
    }
  };

  const handleRetry = () => {
    setTimeLeft(120);
    setGameStatus('playing');
  };

  if (gameStatus === 'won') {
    return (
      <div style={screenStyle}>
        <h2>🎉 You Won!</h2>
        <p>You've mastered all levels!</p>
      </div>
    );
  }

  if (gameStatus === 'lost') {
    return (
      <div style={screenStyle}>
        <h2>⏰ Time's Up!</h2>
        <button style={btnStyle} onClick={handleRetry}>
          Retry Level
        </button>
      </div>
    );
  }

  return (
    <div style={appStyle}>
      <h1 style={titleStyle}>Level {levelIndex + 1}</h1>
      <Timer timeLeft={timeLeft} />
      <GameGrid level={level} onLevelComplete={handleLevelComplete} />
    </div>
  );
}

// Styles
const appStyle = {
  maxWidth: '500px',
  margin: '0 auto',
  padding: '12px',
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
};
const titleStyle = { fontSize: '1.6em', margin: '10px 0' };
const screenStyle = {
  ...appStyle,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  fontSize: '1.4em',
};
const btnStyle = {
  marginTop: '20px',
  padding: '10px 24px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};