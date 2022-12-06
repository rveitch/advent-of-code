const _ = require('lodash');
const inputDataset = require('./input/day-5-input');

const test = false;
const debug = false;
if (test) console.log('---TESTING---');
const input = test ? inputDataset.test : inputDataset.data;

const EMPTY = ' ';

function printGrid(grid, consoleText, emptyCellValue = EMPTY) {
  const table = [];
  for (let row = 0; row < grid.length; row++) {
    const currentRow = [];
    for (let col = 0; col < grid[row].length; col++) {
      let cellValue = grid[row][col];
      if (cellValue === EMPTY) cellValue = emptyCellValue;
      currentRow.push(cellValue);
    }
    table.push(currentRow);
  }
  if (consoleText) console.log('\n', consoleText);
  console.table(table);
}

function isEmpty(cellValue) {
  return cellValue === undefined || cellValue === EMPTY;
}

function parseSteps(steps) {
  return steps.map((step) => {
    const stepParts = step.split(' ');
    return {
      text: step,
      quantity: +stepParts[1],
      fromStack: +stepParts[3],
      toStack: +stepParts[5],
    };
  });
}

/**
 * Find the first non-empty row for the "from" stack with the crate to move (starting from top)
 * @param grid
 * @param fromCol
 * @returns {number}
 */
function findFromRow(grid, fromCol) {
  let fromRow;
  for (let y = 0; y < grid.length; y++) {
    const targetCell = grid[y][fromCol];
    if (!isEmpty(targetCell)) {
      fromRow = y;
      break;
    }
  }
  return fromRow;
}

/**
 * Find the first empty row in the "to" stack for the crate destination (starting from bottom)
 * @param grid
 * @param toCol
 * @returns {number}
 */
function findToRow(grid, toCol) {
  let toRow;
  for (let y = (grid.length -1); y > -1; y--) {
    const targetCell = grid[y][toCol];
    if (isEmpty(targetCell)) {
      toRow = y;
      break;
    }
  }
  return toRow;
}

function solvePartOne() {
  const steps = parseSteps(input.steps);
  if (debug) {
    console.log('--- Starting Grid ---');
    printGrid(input.grid);
  }

  let finalGrid = steps.reduce((grid, step, stepIndex) => {
    const { quantity, fromStack, toStack } = step;
    const fromCol = fromStack - 1;
    const toCol = toStack - 1;

    _.times(quantity, (time) => {
      const crates = [];
      let fromRow = findFromRow(grid, fromCol);
      let toRow = findToRow(grid, toCol);

      // Add a new row to the top of the grid if no empty spots in the destination row were found
      if (isEmpty(toRow)) {
        const newEmptyRow = _.times(grid[0].length, () => EMPTY);
        grid.unshift(newEmptyRow);
        toRow = 0;
        fromRow = fromRow + 1;
      }

      grid[toRow][toCol] = grid[fromRow][fromCol]; // Move Crate
      grid[fromRow][fromCol] = EMPTY; // Empty previous location;
    });

    if (debug) printGrid(grid, `move ${quantity} from ${fromStack - 1} to ${toStack - 1}`);
    return grid;
  }, _.cloneDeep(input.grid));

  // Remove Empty Rows
  finalGrid = finalGrid.reduce((currentGrid, currentRow, currentRowIndex) => {
    if (_.every(currentRow, (val) => isEmpty(val))) {
      currentGrid.splice(currentRowIndex, 1);
    }
    return currentGrid;
  }, finalGrid);

  return finalGrid;
}

function solvePartTwo() {
  const steps = parseSteps(input.steps);
  if (debug) {
    console.log('--- Starting Grid ---');
    printGrid(input.grid);
  }

  let finalGrid = steps.reduce((grid, step, stepIndex) => {
    const { quantity, fromStack, toStack } = step;
    const fromCol = fromStack - 1;
    const toCol = toStack - 1;

    const craneActions = _.times(quantity).map(() => {
      let fromRow = findFromRow(grid, fromCol);
      const action = {
        value: grid[fromRow][fromCol],
        toCol,
      };
      grid[fromRow][fromCol] = EMPTY; // Empty previous location;
      return action;
    });

    craneActions.reverse().forEach((action) => {
      const { value, toCol } = action;
      let toRow = findToRow(grid, toCol);

      // Add a new row to the top of the grid if no empty spots in the destination row were found
      if (isEmpty(toRow)) {
        const newEmptyRow = _.times(grid[0].length, () => EMPTY);
        grid.unshift(newEmptyRow);
        toRow = 0;
      }

      grid[toRow][toCol] = value; // Move Crate
    });


    if (debug) printGrid(grid, `move ${quantity} from ${fromStack - 1} to ${toStack - 1}`);
    return grid;
  }, _.cloneDeep(input.grid));

  // Remove Empty Rows
  finalGrid = finalGrid.reduce((currentGrid, currentRow, currentRowIndex) => {
    if (_.every(currentRow, (val) => isEmpty(val))) {
      currentGrid.splice(currentRowIndex, 1);
    }
    return currentGrid;
  }, finalGrid);

  return finalGrid;
}

console.time('Execution Time');
// console.log('Day 5 Answer Pt. 1:');
// printGrid(solvePartOne()); // MQTPGLLDN

console.log('Day 5 Answer Pt. 2:');
printGrid(solvePartTwo()); // LVZPSTTCZ
console.timeEnd('Execution Time');
