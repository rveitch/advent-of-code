const _ = require('lodash');
const inputDataset = require('./input/day-6-input');

const test = false;
if (test) console.log('---TESTING---');
const input = test ? inputDataset.test[0] : inputDataset.data;

function findMarker(buffer, mLen) {
  let answer;
  const maxIterations = (input.length - (mLen - 1));
  const parts = buffer.split('');

  for (let i = 0; i < maxIterations; i++) {
    const sample = _.slice(parts, i, i + mLen);
    if (_.uniq(sample).length === mLen) {
      answer = i + mLen;
      break
    }
  }

  return answer;
}

/* **** SOLUTIONS **** */

/**
 * Part 1 Solution
 * @returns {*|number}
 */
function solvePartOne() {
  return findMarker(input, 4);
}

/**
 * Part 2 Solution
 * @returns {*|number}
 */
function solvePartTwo() {
  return findMarker(input, 14);
}

console.time('Execution Time');
console.log('Day 6 Answer Pt. 1:', solvePartOne()); // 1651
console.log('Day 6 Answer Pt. 2:', solvePartTwo()); // 3837
console.timeEnd('Execution Time');
