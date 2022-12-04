const _ = require('lodash');
const inputDataset = require('./input/day-4-input');

const test = false;
if (test) console.log('---TESTING---');
const input = test ? inputDataset.test : inputDataset.data;

/* **** HELPER FUNCTIONS **** */

function toRange(str) {
  const parts = str.split('-');
  const start = +parts[0];
  const end = +parts[1];
  return _.range(start, (end + 1));
}

function rangesFullyOverlap(range1, range2) {
  const range1HasRange2 = _.every(range2, (val) => range1.includes(val));
  const range2HasRange1 = _.every(range1, (val) => range2.includes(val));
  return range1HasRange2 || range2HasRange1;
}

function rangesPartiallyOverlap(range1, range2) {
  const range1HasRange2 = _.some(range2, (val) => range1.includes(val));
  const range2HasRange1 = _.some(range1, (val) => range2.includes(val));
  return range1HasRange2 || range2HasRange1;
}

/* **** SOLUTIONS **** */

/**
 * Part 1 Solution
 * @returns {*|number}
 */
function solvePartOne() {
  return input.reduce((totalScore, row) => {
    const pairs = row.split(',');
    const iterationScore = rangesFullyOverlap(toRange(pairs[0]), toRange(pairs[1])) ? 1 : 0;
    totalScore = totalScore + iterationScore;
    return totalScore;
  }, 0);
}

/**
 * Part 2 Solution
 * @returns {*|number}
 */
function solvePartTwo() {
  return input.reduce((totalScore, row) => {
    const pairs = row.split(',');
    const iterationScore = rangesPartiallyOverlap(toRange(pairs[0]), toRange(pairs[1])) ? 1 : 0;
    totalScore = totalScore + iterationScore;
    return totalScore;
  }, 0);
}

console.time('Execution Time');
console.log('Day 4 Answer Pt. 1:', solvePartOne());
console.log('Day 4 Answer Pt. 2:', solvePartTwo());
console.timeEnd('Execution Time');
