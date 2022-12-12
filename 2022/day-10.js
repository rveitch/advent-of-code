const _ = require('lodash');
const inputDataset = require('./input/day-10-input');

const test = false;
const DEBUG = false;
if (test) console.log('---TESTING---');
const input = test ? inputDataset.test : inputDataset.data;

const LIT = '█';
const DARK = ' ';

/* **** HELPER FUNCTIONS **** */

function parseInput(inputArray) {
  return inputArray.map((line) => {
    const [instruction, strVal] = line.split(' ');
    const cyclesPerSignal = (instruction === 'noop') ? 1 : 2;
    return {
      instruction,
      value: strVal ? +strVal : undefined,
      currentCycle: 1,
      cyclesPerSignal,
    };
  });
}

function processCrt(crtGrid, cycle, register) {
  if (cycle > 240) return crtGrid;``
  const row = Math.ceil((cycle / 40))
  const rowIndex = row - 1;
  const pixel = (cycle > 40) ? cycle - (40 * rowIndex) - 1 : cycle - 1;
  if (DEBUG) console.log(`cycle: ${cycle}, pixel: ${pixel}, rowIndex: ${rowIndex}, register: ${register}`);
  const spriteOverlapsPixel = _.inRange(pixel, register - 1, register + 2);
  crtGrid[rowIndex][pixel] = spriteOverlapsPixel ? LIT : DARK;
  return crtGrid;
}

function executeCycle(cyclesHistory, signal, lastCycle) {
  const { instruction, value: signalValue } = signal;
  // Complete execution of previous cycle before "new" cycle begins
  cyclesHistory.X = cyclesHistory.X + cyclesHistory.executionValue;


  // Begin new cycle;
  cyclesHistory.cycle += 1;
  cyclesHistory.executionValue = 0;

  // CRT
  cyclesHistory.crtGrid = (cyclesHistory.crtGrid)
    ? processCrt(cyclesHistory.crtGrid, cyclesHistory.cycle, cyclesHistory.X)
    : cyclesHistory.crtGrid;

  const cycleIterationValues = {
    cycle: cyclesHistory.cycle,
    signalStrength: cyclesHistory.cycle * cyclesHistory.X,
    X: cyclesHistory.X,
    signalInstruction: signal.instruction,
    signalValue: signal.value,
    signalCurrentCycle: signal.currentCycle,
  };
  cyclesHistory.history.push(cycleIterationValues);
  if (DEBUG) console.log(cycleIterationValues);

  if (instruction === 'addx') {
    if (signal.currentCycle === 1) {
      signal.currentCycle +=1;
      cyclesHistory = executeCycle(cyclesHistory, signal);
    }
    if (signal.currentCycle === 2) {
      cyclesHistory.executionValue = signalValue; // Execute addition on next cycle
    }
  }

  if (lastCycle) {
    cyclesHistory = executeCycle(cyclesHistory, signal);
  }

  return cyclesHistory;
}

function runCycles(signals, crtGrid) {
  return signals.reduce((cyclesHistory, signal, signalIndex) => {
    const lastCycle = signalIndex === signals.length - 1;
    cyclesHistory = executeCycle(cyclesHistory, signal, lastCycle);
    return cyclesHistory;
  }, {
    cycle: 0,
    X: 1,
    executionValue: 0,
    crtGrid,
    history: [],
  });
}

function createCrtGrid() {
  const width = 40;
  const height = 6;
  return _.times(height).reduce((grid) => {
    const newRow = _.times(width, () => ' ');
    grid.push(newRow);
    return grid;
  }, []);
}

/* **** SOLUTIONS **** */

/**
 * Part 1 Solution
 * @returns {*|number}
 */
function solvePartOne() {
  const signals = parseInput(input.signals);
  const completedCycles = runCycles(signals);
  const { history: cycleHistory } = completedCycles;
  const targetCycleValues = input.targetCycles.map((t) => cycleHistory[t - 1].signalStrength);
  return targetCycleValues.reduce((a, b) => a + b);
}

/**
 * Part 2 Solution
 * @returns {*|number}
 */
function solvePartTwo() {
  const crtGrid = createCrtGrid();
  const signals = parseInput(input.signals);
  const completedCycles = runCycles(signals, crtGrid);
  console.log('\nDay 10 Answer Pt. 2:\n');
  completedCycles.crtGrid.map((row) => {
    const joinedRow = row.join('');
    console.log(joinedRow);
    return joinedRow;
  });
  console.log();
}

console.time('Execution Time');
console.log('Day 10 Answer Pt. 1:', solvePartOne()); // 14240
solvePartTwo(); // PLULKBZH
console.timeEnd('Execution Time');
