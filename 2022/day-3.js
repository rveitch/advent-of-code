const _ = require('lodash');
const inputDataset = require('./input/day-3-input');

const test = false;
if (test) console.log('---TESTING---');
const input = test ? inputDataset.test : inputDataset.data;

function computeSharedPriority(sharedPriorities) {
  const priorityKey = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return sharedPriorities.reduce((totalScore, encodedPriority) => {
    const decodedPriority = priorityKey.indexOf(encodedPriority) + 1;
    totalScore = totalScore + decodedPriority;
    return totalScore;
  }, 0);
}

function solvePartOne() {
  return input.reduce((totalScore, contents) => {
    const firstCompartment = contents.slice(0, contents.length / 2).split('');
    const secondCompartment = contents.slice(contents.length / 2, contents.length).split('');
    const sharedPriorities = _.intersection(firstCompartment, secondCompartment);
    const sharedPriorityScore = computeSharedPriority(sharedPriorities);
    totalScore = totalScore + sharedPriorityScore;
    return totalScore;
  }, 0);
}

function solvePartTwo() {
  const groupedRucksacks = _.chunk(input, 3).map((groups) => {
    return groups.map((group) => group.split(''));
  });
  return groupedRucksacks.reduce((totalScore, rucksackGroup) => {
    const sharedPriorities = _.intersection(rucksackGroup[0], rucksackGroup[1], rucksackGroup[2]);
    const sharedPriorityScore = computeSharedPriority(sharedPriorities);
    totalScore = totalScore + sharedPriorityScore;
    return totalScore;
  }, 0);
}

console.time('Execution Time');
console.log('Day 3 Answer Pt. 1:', solvePartOne());
console.log('Day 3 Answer Pt. 2:', solvePartTwo());
console.timeEnd('Execution Time');
