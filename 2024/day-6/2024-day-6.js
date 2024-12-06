/**
 * Part 1:
 * Simulates a guard patrol on a given map, where the guard moves according to specific rules
 * and returns the number of unique positions visited during the patrol.
 *
 * @param {string} mapData - A string representing the map grid. The guard's initial position is indicated by one of the characters '^', '>', 'v', '<' denoting the direction the guard is facing. Walls are denoted by '#', and open spaces by any other character.
 * @return {number} The number of unique positions visited by the guard during the patrol.
 */
export function simulateGuardPatrol(mapData) {
  const directionVectors = {
    '^': { move: [-1, 0], right: '>' },
    '>': { move: [0, 1], right: 'v' },
    v: { move: [1, 0], right: '<' },
    '<': { move: [0, -1], right: '^' },
  };

  const map = mapData.split('\n').map((line) => line.split(''));

  let guardRow; let guardCol; let
    guardDir;

  // Find the initial position and direction of the guard
  for (let r = 0; r < map.length; r += 1) {
    for (let c = 0; c < map[r].length; c += 1) {
      if ('^>v<'.includes(map[r][c])) {
        guardRow = r;
        guardCol = c;
        guardDir = map[r][c];
        break;
      }
    }
  }

  const visited = new Set();
  visited.add(`${guardRow},${guardCol}`);

  const rows = map.length;
  const cols = map[0].length;

  // eslint-disable-next-line no-constant-condition
  while (true) { // Hackiness, I know.
    const direction = directionVectors[guardDir];
    const [dr, dc] = direction.move;
    const newRow = guardRow + dr;
    const newCol = guardCol + dc;

    // Check if the next step is within bounds
    if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
      break;
    }

    if (map[newRow][newCol] === '#') {
      // Turn right
      guardDir = direction.right;
    } else {
      // Move forward
      guardRow = newRow;
      guardCol = newCol;
      visited.add(`${guardRow},${guardCol}`);
    }
  }

  return visited.size;
}

/**
 * Part Two: (a variation on Part One, hence the duplicate code in parts, but I wanted to retain part one as-is)
 * Analyzes a directional map to determine specific positions where placing an obstruction
 * would induce a loop in the guard's patrol path. The map indicates open paths and current
 * guard direction using specific characters.
 *
 * @param {string} mapData - A string representation of the map, where each character
 * represents a part of the grid. Directions for the guard are denoted by `^`, `>`, `v`, `<`
 * for north, east, south, and west, respectively. The map is expected to include line breaks
 * to separate rows.
 * @return {number} The total number of positions where placing an obstruction would cause
 * the guard to loop indefinitely on its patrol path.
 */
export function findLoopInducingPositions(mapData) {
  const directionVectors = {
    '^': { move: [-1, 0], right: '>' },
    '>': { move: [0, 1], right: 'v' },
    'v': { move: [1, 0], right: '<' }, // eslint-disable-line quote-props
    '<': { move: [0, -1], right: '^' },
  };

  const map = mapData.split('\n').map((line) => line.split(''));

  let guardRow;
  let guardCol;
  let guardDir;

  // Find the initial position and direction of the guard
  for (let r = 0; r < map.length; r += 1) {
    for (let c = 0; c < map[r].length; c += 1) {
      if ('^>v<'.includes(map[r][c])) {
        guardRow = r;
        guardCol = c;
        guardDir = map[r][c];
        break;
      }
    }
  }

  const isValidPosition = (r, c) => r >= 0 && r < map.length && c >= 0 && c < map[0].length;

  const simulateWithObstruction = (obstructionRow, obstructionCol) => {
    if (map[obstructionRow][obstructionCol] !== '.' || (obstructionRow === guardRow && obstructionCol === guardCol)) {
      return false;
    }

    map[obstructionRow][obstructionCol] = '#'; // Place the obstruction

    let row = guardRow; let col = guardCol; let
      dir = guardDir;
    const visited = new Set([`${row},${col}[${dir}]`]);

    // eslint-disable-next-line no-constant-condition
    while (true) { // Hackiness, I know.
      const { move, right } = directionVectors[dir];
      const [dr, dc] = move;
      const newRow = row + dr;
      const newCol = col + dc;

      if (!isValidPosition(newRow, newCol)) {
        break;
      }

      if (map[newRow][newCol] === '#') {
        dir = right; // Turn right
      } else {
        row = newRow;
        col = newCol;
      }

      const state = `${row},${col}[${dir}]`;
      if (visited.has(state)) {
        map[obstructionRow][obstructionCol] = '.'; // Restore the position
        return true; // Found a loop
      }
      visited.add(state);
    }

    map[obstructionRow][obstructionCol] = '.'; // Restore the position
    return false;
  };

  const candidatePositions = [];

  for (let r = 0; r < map.length; r += 1) {
    for (let c = 0; c < map[r].length; c += 1) {
      if (simulateWithObstruction(r, c)) {
        candidatePositions.push([r, c]);
      }
    }
  }

  return candidatePositions.length;
}

export default {
  simulateGuardPatrol,
  findLoopInducingPositions,
};
