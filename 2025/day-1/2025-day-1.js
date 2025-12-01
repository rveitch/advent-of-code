/* eslint-disable no-plusplus */

/**
 * Solves Day 1 Part 1 of Advent of Code 2025
 * @param {string} input - The puzzle input containing rotation instructions
 * @returns {number} - The number of times the dial points at 0 after a rotation
 */
export function solvePart1(input) {
  const instructions = input.trim().split('\n');
  let position = 50; // Dial starts at 50
  let zeroCount = 0;

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i].trim();
    const direction = instruction.charAt(0);
    const distance = parseInt(instruction.substring(1), 10);

    if (direction === 'L') {
      position -= distance;
    } else if (direction === 'R') {
      position += distance;
    }

    // Handle wrapping around the dial (0-99)
    position = ((position % 100) + 100) % 100;

    if (position === 0) {
      zeroCount++;
    }
  }

  return zeroCount;
}

/**
 * Executes a series of movement instructions on a circular dial and calculates
 * the number of times the position crosses or touches numbers that are multiples of 100.
 *
 * The dial is represented as a circular range from 0 to 99, and it starts at position 50.
 * Movements are defined by the input instructions, where each instruction contains a direction
 * ('L' for left or 'R' for right) and a distance. The position wraps around circularly when moving
 * past the bounds of the dial.
 *
 * @param {string} input - A string containing newline-separated movement instructions.
 * Each instruction starts with 'L' or 'R', followed by a positive integer indicating the distance to move.
 * For example: "L10\nR15\nL20".
 *
 * @return {number} The total count of crossings or direct touches with numbers that are multiples of 100
 * during the entire execution of the given movement instructions.
 */
export function solvePart2(input) {
  const instructions = input.trim().split('\n');
  let position = 50; // Dial starts at 50
  let zeroCount = 0;

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i].trim();
    const direction = instruction.charAt(0);
    const distance = parseInt(instruction.substring(1), 10);

    if (direction === 'L') {
      // Moving Left means decreasing position.
      // Range of numbers touched: [position - distance, position - 1]
      // We count how many multiples of 100 exist in this range.
      // Formula: Floor(End / 100) - Floor((Start - 1) / 100)
      // Since we move downwards, 'End' is higher (pos - 1) and 'Start' is lower (pos - distance).
      // Adjusted formula for range [A, B]: Floor(B/100) - Floor((A-1)/100)
      const startRange = position - distance;
      const endRange = position - 1;

      zeroCount += Math.floor(endRange / 100) - Math.floor((startRange - 1) / 100);

      position -= distance;
    } else if (direction === 'R') {
      // Moving Right means increasing position.
      // Range of numbers touched: [position + 1, position + distance]
      const startRange = position + 1;
      const endRange = position + distance;

      zeroCount += Math.floor(endRange / 100) - Math.floor((startRange - 1) / 100);

      position += distance;
    }

    // Handle wrapping around the dial (0-99)
    position = ((position % 100) + 100) % 100;
  }

  return zeroCount;
}
