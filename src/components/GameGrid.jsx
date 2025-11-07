import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import AddRowButton from './AddRowButton';
import { generateSolvableGrid } from '../utils/boardGenerator';
import { isValidMatch } from '../utils/matchLogic';
import { playSound } from '../utils/sound';

const GameGrid = ({ level, onLevelComplete }) => {
  const [grid, setGrid] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [rows, setRows] = useState(level.initialRows);

  // Regenerate grid when rows or level changes
  useEffect(() => {
    setGrid(generateSolvableGrid(rows, level.numbers));
    setSelectedCell(null);
  }, [rows, level]);

  const handleCellClick = (r, c) => {
    const cell = grid[r][c];
    if (cell.matched) return;

    if (!selectedCell) {
      setSelectedCell({ r, c });
      return;
    }

    const first = grid[selectedCell.r][selectedCell.c];
    const second = cell;

    if (first.id === second.id) {
      setSelectedCell(null);
      return;
    }

    if (isValidMatch(first.value, second.value)) {
      playSound('match');
      const newGrid = [...grid];
      newGrid[selectedCell.r][selectedCell.c] = { ...first, matched: true };
      newGrid[r][c] = { ...second, matched: true };
      setGrid(newGrid);
    } else {
      playSound('invalid');
      const el = document.getElementById(second.id);
      if (el) {
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 400);
      }
    }
    setSelectedCell(null);
  };

  // Win check
  useEffect(() => {
    const total = grid.length * 9;
    const matched = grid.flat().filter(c => c.matched).length;
    if (total > 0 && matched === total) {
      playSound('level_complete');
      setTimeout(onLevelComplete, 300);
    }
  }, [grid, onLevelComplete]);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gap: '2px',
          maxWidth: '100%',
          padding: '0 8px',
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <Cell
              key={cell.id}
              cell={cell}
              isSelected={selectedCell?.r === r && selectedCell?.c === c}
              onClick={() => handleCellClick(r, c)}
            />
          ))
        )}
      </div>
      <AddRowButton
        onClick={() => setRows(prev => prev + 1)}
        disabled={rows >= level.maxRows}
        current={rows}
        max={level.maxRows}
      />
    </>
  );
};

export default GameGrid;