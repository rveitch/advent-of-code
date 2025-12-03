/* eslint-disable no-plusplus, no-restricted-syntax, no-continue */

/**
 * Processes the input data to calculate the total joltage by evaluating each line,
 * determining the maximum joltage derived from combinations of digits within each line,
 * and summing these maximum values.
 *
 * @param {string} input - The raw input consisting of multiple lines of numeric data.
 * @return {number} The total calculated joltage from all lines in the input.
 */
export function solvePart1(input) {
  const lines = input.trim().split('\n');
  let totalJoltage = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    let maxJoltage = 0;
    const digits = trimmedLine.split('').map(Number);

    for (let i = 0; i < digits.length - 1; i++) {
      for (let j = i + 1; j < digits.length; j++) {
        const joltage = digits[i] * 10 + digits[j];
        if (joltage > maxJoltage) {
          maxJoltage = joltage;
        }
      }
    }
    totalJoltage += maxJoltage;
  }

  return totalJoltage;
}

/**
 * Processes the input data to calculate the total "joltage" based on a specific selection algorithm.
 *
 * @param {string} input - A string containing multiple lines of numerical data. Each line consists of a sequence of digits that will be processed.
 * @return {string} - The total calculated joltage as a string representation of a BigInt.
 */
export function solvePart2(input) {
  const lines = input.trim().split('\n');
  let totalJoltage = 0n; // Use BigInt for large numbers

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const digits = trimmedLine.split('').map(Number);
    const numToSelect = 12;

    // Greedy approach: at each step, pick the largest digit
    // that still leaves enough digits remaining to complete the selection
    const selectedDigits = [];
    let startIndex = 0;

    for (let i = 0; i < numToSelect; i++) {
      const digitsStillNeeded = numToSelect - i;
      // We can pick from startIndex up to (digits.length - digitsStillNeeded)
      // because we need digitsStillNeeded digits after this one
      const endIndex = digits.length - digitsStillNeeded;

      let maxDigit = -1;
      let maxDigitIndex = startIndex;

      for (let j = startIndex; j <= endIndex; j++) {
        if (digits[j] > maxDigit) {
          maxDigit = digits[j];
          maxDigitIndex = j;
        }
      }

      selectedDigits.push(maxDigit);
      startIndex = maxDigitIndex + 1;
    }

    // Convert selected digits to a number (use BigInt for large numbers)
    const joltageStr = selectedDigits.join('');
    const joltage = BigInt(joltageStr);
    totalJoltage += joltage;
  }

  return totalJoltage.toString();
}
