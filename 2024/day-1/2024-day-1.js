/**
 * Calculates the total distance between two lists of numbers by sorting them
 * and summing up the absolute differences of their corresponding elements.
 *
 * @param {number[]} leftList - The first list of numbers.
 * @param {number[]} rightList - The second list of numbers.
 * @return {number} The total distance calculated as the sum of the absolute differences
 *                  between the sorted elements of the two lists.
 */
export function calculateTotalDistance(leftList, rightList) {
  // Step 1: Sort both lists
  const sortedList1 = leftList.slice().sort((a, b) => a - b);
  const sortedList2 = rightList.slice().sort((a, b) => a - b);

  // Step 2: Calculate the total distance
  let totalDistance = 0;
  for (let i = 0; i < sortedList1.length; i += 1) {
    const distance = Math.abs(sortedList1[i] - sortedList2[i]);
    totalDistance += distance;
  }

  return totalDistance;
}

/**
 * Calculates a similarity score between two lists based on matching elements.
 * Each matching element contributes to the score by its value multiplied by its frequency in the right list.
 *
 * @param {number[]} leftList - The first list of numbers to compare.
 * @param {number[]} rightList - The second list of numbers to compare against.
 * @return {number} The calculated similarity score.
 */
export function calculateSimilarityScore(leftList, rightList) {
  // Create a frequency map for the right list
  const frequencyMap = rightList.reduce((map, num) => {
    map[num] = (map[num] || 0) + 1; // eslint-disable-line no-param-reassign
    return map;
  }, {});

  // Calculate similarity score
  let similarityScore = 0;
  for (const num of leftList) { // eslint-disable-line no-restricted-syntax
    if (frequencyMap[num]) {
      similarityScore += num * frequencyMap[num];
    }
  }

  return similarityScore;
}

export default {
  calculateTotalDistance,
  calculateSimilarityScore,
};
