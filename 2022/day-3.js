const _ = require('lodash');
const inputDataset = require('./input/day-3-input');

const test = false;
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
console.log('partOne:', solvePartOne());

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
console.log('partTwo:', solvePartTwo());
