/**
 * Counts the occurrences of a given word in a grid of letters. The word can be
 * placed in any of the eight possible directions: horizontally, vertically, or
 * diagonally.
 *
 * @param {string[]} grid - A two-dimensional array of characters representing the grid.
 * @param {string} word - The word to search for within the grid.
 * @return {number} The number of times the given word appears in the grid in any direction.
 */
export function countWordOccurrences(grid, word = 'XMAS') {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const wordLength = word.length;
  let count = 0;

  // Directions: right, down, down-right, down-left, left, up, up-right, up-left
  const directions = [
    [0, 1], // right
    [1, 0], // down
    [1, 1], // down-right
    [1, -1], // down-left
    [0, -1], // left
    [-1, 0], // up
    [-1, 1], // up-right
    [-1, -1], // up-left
  ];

  function isValidPosition(x, y) {
    return x >= 0 && x < numRows && y >= 0 && y < numCols;
  }

  function searchFromPosition(x, y) {
    for (const [dx, dy] of directions) { // eslint-disable-line no-restricted-syntax
      let found = true;
      for (let k = 0; k < wordLength; k += 1) {
        const newX = x + k * dx;
        const newY = y + k * dy;
        if (!isValidPosition(newX, newY) || grid[newX][newY] !== word[k]) {
          found = false;
          break;
        }
      }
      if (found) count += 1;
    }
  }

  for (let i = 0; i < numRows; i += 1) {
    for (let j = 0; j < numCols; j += 1) {
      if (grid[i][j] === word[0]) {
        searchFromPosition(i, j);
      }
    }
  }

  return count;
}

/**
 * Counts the occurrences of diagonal sequences "MAS" or "SAM" in a given 2D grid.
 *
 * The function scans through each non-border cell in the grid and checks both diagonal directions:
 * from top-left to bottom-right and from top-right to bottom-left. If the 3-character sequence
 * formed along either diagonal is "MAS" or "SAM", it is counted as a valid occurrence.
 *
 * @param {string[]} grid - A 2D array representing the grid where each cell contains a single character string.
 * @return {number} The total number of times the sequences "MAS" or "SAM" appear along the diagonals in the grid.
 */
export function countXmasOccurrences(grid) {
  const directions = [
    [-1, -1], [1, 1], // Top-Left to Bottom-Right diagonal
    [-1, 1], [1, -1], // Top-Right to Bottom-Left diagonal
  ];

  const isMAS = (chars) => chars.join('') === 'MAS' || chars.join('') === 'SAM';

  let count = 0;

  // Loop through each cell, skipping the borders
  for (let row = 1; row < grid.length - 1; row += 1) {
    for (let column = 1; column < grid[row].length - 1; column += 1) {
      let found = true; // Assume the current position is valid...(until it's not?)

      // Check both diagonal directions
      for (let directionIndex = 0; directionIndex < directions.length; directionIndex += 1) {
        const seq = []; // The current diagonal sequence

        // Collect characters in a 3-step sequence along the diagonal
        for (let step = -1; step <= 1; step += 1) {
          const x = row + step * directions[directionIndex][0]; // Calculate row index
          const y = column + step * directions[directionIndex][1]; // Calculate column index
          seq.push(grid[x][y]); // Add character to sequence
        }

        // If the sequence is not "MAS" or "SAM", mark it as not found
        if (!isMAS(seq)) {
          found = false;
          break; // Exit from the current diagonal checks
        }
      }

      // If valid patterns are found in both diagonals, increment the count
      if (found) count += 1;
    }
  }

  return count;
}

export default {
  countWordOccurrences,
  countXmasOccurrences,
};
