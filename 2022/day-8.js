const _ = require('lodash');
const inputDataset = require('./input/day-8-input');

const test = false;
const debug = false;
if (test) console.log('---TESTING---');
const input = test ? inputDataset.test : inputDataset.data;

/* **** HELPER FUNCTIONS **** */

function toGrid(inputArray = []) {
  return inputArray.map((row) => row.split('').map((cell) => Number(cell)));
}

/**
 * Determines if a tree is on an exterior edge of the grid.
 * @param {Array<number>} grid
 * @param {Number} rowIndex - The index of the row cell.
 * @param {Number} colIndex - The index of the column cell.
 * @returns {boolean}
 */
function isEdgy(grid, rowIndex, colIndex) {
  const onRowEdge = rowIndex === 0 || rowIndex === (grid.length - 1);
  const onColEdge = colIndex === 0 || colIndex === (grid[0].length - 1);
  return onRowEdge || onColEdge
}

function isVisible(currentTree, treesBefore) {
  return _.every(treesBefore, (treeBefore) => currentTree > treeBefore);
}

function isInteriorTreeVisible(grid, rowIndex, colIndex) {
  const currentTree = grid[rowIndex][colIndex];

  const westTrees = getWestTrees(grid, rowIndex, colIndex);
  const isVisibleFromWest = isVisible(currentTree, westTrees);
  if (isVisibleFromWest) {
    return true;
  }

  const eastTrees = getEastTrees(grid, rowIndex, colIndex);
  const isVisibleFromEast = isVisible(currentTree, eastTrees);
  if (isVisibleFromEast) {
    return true;
  }

  const northTrees = getNorthTrees(grid, rowIndex, colIndex);
  const isVisibleFromNorth = isVisible(currentTree, northTrees);
  if (isVisibleFromNorth) {
    return true;
  }

  const southTrees = getSouthTrees(grid, rowIndex, colIndex);
  const isVisibleFromSouth = isVisible(currentTree, southTrees);
  if (isVisibleFromSouth) {
    return true;
  }

  return false;
}

function getSurroundingTrees(grid, rowIndex, colIndex) {
  return {
    west: getWestTrees(grid, rowIndex, colIndex),
    east: getEastTrees(grid, rowIndex, colIndex),
    north: getNorthTrees(grid, rowIndex, colIndex),
    south: getSouthTrees(grid, rowIndex, colIndex),
  }
}

function scenicScoreForTree(grid, rowIndex, colIndex) {
  const currentTree = grid[rowIndex][colIndex];
  const { west, east, north, south } = getSurroundingTrees(grid, rowIndex, colIndex);
  const surroundingTrees = [north.reverse(), west.reverse(), south.reverse(), east];
  const rowScores = surroundingTrees.map((treesInRow) => scenicScoreForRow(currentTree, treesInRow));
  const scenicScore = rowScores.reduce((a, b) => a * b);
  return {
    coordinates: [rowIndex, colIndex],
    scenicScore,
    treeHeight: currentTree,
  }
}

function scenicScoreForRow(treeHeight, treesInRow) {
  let score = 0;
  for (let i = 0; i < treesInRow.length; i++) {
    score += 1;
    if (treeHeight <= treesInRow[i]) {
      break
    }
  }
  return score;
}

function getWestTrees(grid, rowIndex, colIndex) {
  return _.take(grid[rowIndex], colIndex);
}

function getEastTrees(grid, rowIndex, colIndex) {
  return _.takeRight(grid[rowIndex], (grid[0].length - (colIndex + 1)));
}

function getNorthTrees(grid, rowIndex, colIndex) {
  const northTrees = [];
  for (let x = 0; x < rowIndex; x++) {
    northTrees.push(grid[x][colIndex]);
  }
  return northTrees;
}

function getSouthTrees(grid, rowIndex, colIndex) {
  const southTrees = [];
  for (let x = grid.length - 1; x > rowIndex; x--) {
    southTrees.push(grid[x][colIndex]);
  }
  return southTrees;
}

/* **** SOLUTIONS **** */

/**
 * Part 1 Solution
 * @returns {*|number}
 */
function solvePartOne() {
  const grid = toGrid(input);
  if (debug) console.log('totalTrees:', grid.length * grid[0].length);

  return grid.reduce((visibleTreesInGrid, row, rowIndex) => { // row
    const rowTotal = row.reduce((visibleTreesInRow, tree, colIndex) => { // column
      const edge = isEdgy(grid, rowIndex, colIndex);
      if (debug) console.log(`x: ${rowIndex}, y: ${colIndex}, edge: ${edge}`);
      if (edge) {
        visibleTreesInRow += 1;
        return visibleTreesInRow;
      }

      const interiorVisible = isInteriorTreeVisible(grid, rowIndex, colIndex);
      if (interiorVisible) {
        visibleTreesInRow += 1;
        return visibleTreesInRow;
      }

      return visibleTreesInRow;
    }, 0);
    visibleTreesInGrid = visibleTreesInGrid + rowTotal;
    return visibleTreesInGrid;
  }, 0);
}

/**
 * Part 2 Solution
 * @returns {*|number}
 */
function solvePartTwo() {
  const grid = toGrid(input);
  if (debug) console.log('totalTrees:', grid.length * grid[0].length);

  const treeScores = grid.reduce((allTrees, row, rowIndex) => {
    const treesInRow = row.reduce((trees, tree, colIndex) => {
      trees.push(scenicScoreForTree(grid, rowIndex, colIndex));
      return trees;
    }, []);
    allTrees = allTrees.concat(treesInRow);
    return allTrees;
  }, []);

  const sortedScores = _.sortBy(treeScores, ['scenicScore']).reverse();
  return sortedScores[0].scenicScore; // return highest scenic score
}

console.time('Execution Time');
console.log('Day 8 Answer Pt. 1:', solvePartOne()); // 1870
console.log('Day 8 Answer Pt. 2:', solvePartTwo()); // 517440
console.timeEnd('Execution Time');
