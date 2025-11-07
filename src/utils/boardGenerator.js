export const generateSolvableGrid = (rows, numberSet) => {
  const pairs = [];
  const nums = [...new Set(numberSet)];

  // Generate all valid pairs (a, b) where a == b or a + b == 10
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      const a = nums[i];
      const b = nums[j];
      if (a === b || a + b === 10) {
        pairs.push(a, b);
      }
    }
  }

  const totalCells = rows * 9;
  let pool = [];
  while (pool.length < totalCells) {
    pool = [...pool, ...pairs];
  }
  pool = pool.slice(0, totalCells);

  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Build grid
  const grid = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < 9; c++) {
      row.push({
        value: pool[idx++],
        matched: false,
        id: `${r}-${c}`,
      });
    }
    grid.push(row);
  }
  return grid;
};