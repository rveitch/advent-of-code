/* eslint-disable no-plusplus, no-restricted-syntax, no-continue */

/**
 * Solves Part 1 of the problem by processing the input grid and counting specific elements
 * based on adjacency rules.
 *
 * @param {string} input - A string representation of a grid where each row is separated by a newline ('\n')
 * and each cell contains characters such as '@' to denote specific elements.
 * @return {number} The count of grid elements ('@') that satisfy the adjacency constraints.
 */
export function solvePart1(input) {
  const lines = input.trim().split('\n');
  const grid = [];

  for (let i = 0; i < lines.length; i++) {
    grid.push(lines[i].split(''));
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  // 8 directions: up, down, left, right, and 4 diagonals
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Only check paper rolls
      if (grid[row][col] !== '@') {
        continue;
      }

      // Count adjacent paper rolls
      let adjacentRolls = 0;
      for (let d = 0; d < directions.length; d++) {
        const newRow = row + directions[d][0];
        const newCol = col + directions[d][1];

        // Check bounds
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (grid[newRow][newCol] === '@') {
            adjacentRolls++;
          }
        }
      }

      // Accessible if fewer than 4 adjacent rolls
      if (adjacentRolls < 4) {
        count++;
      }
    }
  }

  return count;
}

/**
 * Processes a grid where each cell represents a roll, removing accessible rolls
 * iteratively until no accessible rolls remain and returns the total number of
 * rolls removed. A roll is considered accessible if it has fewer than 4 adjacent
 * rolls in all 8 possible directions (up, down, left, right, and diagonals).
 *
 * @param {string} input - A string representing a grid of characters where each
 *                         line is a row. '@' represents a roll, and '.' represents
 *                         an empty space.
 * @return {number} The total number of rolls removed from the grid.
 */
export function solvePart2(input) {
  let i;
  const lines = input.trim().split('\n');
  const grid = [];

  for (i = 0; i < lines.length; i++) {
    grid.push(lines[i].split(''));
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let totalRemoved = 0;

  // 8 directions: up, down, left, right, and 4 diagonals
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  function countAdjacentRolls(row, col) {
    let count = 0;
    for (let d = 0; d < directions.length; d++) {
      const newRow = row + directions[d][0];
      const newCol = col + directions[d][1];

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        if (grid[newRow][newCol] === '@') {
          count++;
        }
      }
    }
    return count;
  }

  function findAccessibleRolls() {
    const accessible = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col] === '@') {
          if (countAdjacentRolls(row, col) < 4) {
            accessible.push([row, col]);
          }
        }
      }
    }
    return accessible;
  }

  // Keep removing accessible rolls until none are left
  let accessible = findAccessibleRolls();
  while (accessible.length > 0) {
    // Remove all accessible rolls
    for (i = 0; i < accessible.length; i++) {
      const row = accessible[i][0];
      const col = accessible[i][1];
      grid[row][col] = '.';
    }
    totalRemoved += accessible.length;

    // Find new accessible rolls
    accessible = findAccessibleRolls();
  }

  return totalRemoved;
}
