/* eslint-disable no-plusplus, no-restricted-syntax, no-continue */

/**
 * Processes the input range pairs and computes the sum of invalid numbers.
 * A number is deemed invalid if it is composed of a sequence repeated twice.
 *
 * @param {string} input A comma-separated string of ranges, where each range is represented as "start-end" (e.g., "10-20,30-40").
 * @return {number} The sum of all invalid numbers within the specified ranges.
 */
export function solvePart1(input) {
  const ranges = input.split(',').map((range) => range.split('-').map(Number));

  let invalidSum = 0;

  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      const s = i.toString();

      // A number made of a sequence repeated twice must have an even length.
      if (s.length % 2 !== 0) continue;

      const mid = s.length / 2;
      const firstHalf = s.substring(0, mid);
      const secondHalf = s.substring(mid);

      if (firstHalf === secondHalf) {
        invalidSum += i;
      }
    }
  }

  return invalidSum;
}

/**
 * Processes a string input of number ranges, identifies invalid numbers within those ranges,
 * and computes the sum of all such invalid numbers. A number is considered invalid if it can be
 * represented as a repeated pattern of a substring with at least two repetitions.
 *
 * @param {string} input - A string containing ranges separated by commas (e.g., "1-5,10-12") where
 *                         each range specifies a start and end.
 * @return {number} The sum of all invalid numbers across the specified ranges.
 */
export function solvePart2(input) {
  const ranges = input.trim().split(',').map((range) => range.split('-').map(Number));

  let invalidSum = 0;

  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      const s = i.toString();
      const len = s.length;
      let isInvalid = false;

      // Try all possible pattern lengths m that could form s
      // m must be a divisor of len, and m <= len / 2 (at least 2 repetitions)
      for (let m = 1; m <= len / 2; m++) {
        if (len % m === 0) {
          const pattern = s.substring(0, m);
          if (pattern.repeat(len / m) === s) {
            isInvalid = true;
            break;
          }
        }
      }

      if (isInvalid) {
        invalidSum += i;
      }
    }
  }

  return invalidSum;
}
