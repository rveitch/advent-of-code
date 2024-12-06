/* eslint-disable no-prototype-builtins, no-restricted-syntax, no-return-assign */

const orderMap = {}; // Bad scoping, but find for this exercise.

function generateOrderMap(orderRules) {
  orderRules.forEach((rule) => {
    const [x, y] = rule.split('|').map(Number);
    if (!orderMap[x]) orderMap[x] = [];
    orderMap[x].push(y);
  });
}

/**
 * Convert order rules to a Map for easier validation
 * Determines if the given sequence of page numbers is in the correct order based on predefined order rules.
 *
 * @param {Array<number>} update - An array of page numbers representing the current sequence to check.
 * @return {boolean} Returns true if the sequence follows the correct order rules, false otherwise.
 */
function isCorrectOrder(update) {
  const indexMap = {};
  update.forEach((pageNum, index) => indexMap[pageNum] = index);

  for (const [x, yList] of Object.entries(orderMap)) {
    for (const y of yList) {
      if (indexMap.hasOwnProperty(x) && indexMap.hasOwnProperty(y)) {
        if (indexMap[x] >= indexMap[y]) {
          return false;
        }
      }
    }
  }

  return true;
}

// Function to sort incorrect updates according to order rules
function sortWithRules(update) {
  const sortedUpdate = [...update];

  sortedUpdate.sort((a, b) => {
    if (orderMap[a] && orderMap[a].hasOwnProperty(b)) {
      return -1; // a should be before b
    }

    if (orderMap[b] && orderMap[b].hasOwnProperty(a)) {
      return 1; // b should be before a
    }

    return update.indexOf(a) - update.indexOf(b);
  });

  return sortedUpdate;
}

/**
 * Part 1:
 * Calculates the sum of the middle page numbers from correctly ordered updates.
 *
 * @param {Array<Array<number>>} orderUpdates - An array of updates, where each update is an array of page numbers.
 * @param {Array<Object>} orderRules - An array of rules that determine the correct order of updates.
 * @return {number} The sum of the middle page numbers from updates that are correctly ordered according to the given rules.
 */
export function solvePart1(orderUpdates, orderRules) {
  let sumOfMiddlePages = 0;
  generateOrderMap(orderRules);

  orderUpdates.forEach((orderUpdate) => {
    if (isCorrectOrder(orderUpdate)) {
      const middleIndex = Math.floor(orderUpdate.length / 2);
      sumOfMiddlePages += orderUpdate[middleIndex];
    }
  });

  return sumOfMiddlePages;
}

/**
 * Part 2:
 * Processes a set of order updates and calculates the sum of the middle page numbers
 * from updates that are correctly ordered according to specified rules.
 *
 * @param {Array} orderUpdates - An array of order updates, where each update is a list of page numbers.
 * @param {Object} orderRules - An object specifying the rules for determining the correct order of pages.
 * @return {number} The sum of the middle page numbers from the correctly ordered updates.
 */
export function solvePart2(orderUpdates) {
  let sumOfMiddlePages = 0;

  orderUpdates.forEach((orderUpdate) => {
    if (isCorrectOrder(orderUpdate)) {
      const correctedUpdate = sortWithRules(orderUpdate);
      const middleIndex = Math.floor(correctedUpdate.length / 2);
      sumOfMiddlePages += correctedUpdate[middleIndex];
    }
  });

  return sumOfMiddlePages;
}

export default {
  solvePart1,
  solvePart2,
};
