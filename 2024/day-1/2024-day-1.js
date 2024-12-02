/**
 * Calculates the total distance between two lists of numbers by sorting them
 * and summing up the absolute differences of their corresponding elements.
 *
 * @param {number[]} list1 - The first list of numbers.
 * @param {number[]} list2 - The second list of numbers.
 * @return {number} The total distance calculated as the sum of the absolute differences
 *                  between the sorted elements of the two lists.
 */
export function calculateTotalDistance(list1, list2) {
  // Step 1: Sort both lists
  const sortedList1 = list1.slice().sort((a, b) => a - b);
  const sortedList2 = list2.slice().sort((a, b) => a - b);

  // Step 2: Calculate the total distance
  let totalDistance = 0;
  for (let i = 0; i < sortedList1.length; i++) {
    const distance = Math.abs(sortedList1[i] - sortedList2[i]);
    totalDistance += distance;
  }

  return totalDistance;
}

export default {
  calculateTotalDistance,
};
