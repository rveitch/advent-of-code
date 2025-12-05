/* eslint-disable no-plusplus, no-restricted-syntax, no-continue */

/**
 * Processes an input string to evaluate numbers within specified ranges and counts "fresh" ingredients.
 *
 * @param {string} input - The input string containing ranges and ingredient IDs separated by a blank line.
 * The first section includes ranges in the format "start-end" (one per line),
 * and the second section includes individual ingredient IDs (one per line).
 *
 * @return {number} The count of "fresh" ingredients, which are those whose IDs fall within any of the specified ranges.
 */
export function solvePart1(input) {
  const lines = input.trim().split('\n');
  const ranges = [];
  const ingredients = [];
  let isIngredientSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '') {
      isIngredientSection = true;
      continue;
    }

    if (!isIngredientSection) {
      // Parse range: "start-end"
      const parts = line.split('-');
      ranges.push({
        start: parseInt(parts[0], 10),
        end: parseInt(parts[1], 10),
      });
    } else {
      // Parse ingredient ID
      ingredients.push(parseInt(line, 10));
    }
  }

  // Count fresh ingredients
  let freshCount = 0;
  for (let j = 0; j < ingredients.length; j++) {
    const id = ingredients[j];
    let isFresh = false;

    for (let k = 0; k < ranges.length; k++) {
      if (id >= ranges[k].start && id <= ranges[k].end) {
        isFresh = true;
        break;
      }
    }

    if (isFresh) {
      freshCount++;
    }
  }

  return freshCount;
}

/**
 * Solves the second part of the problem by processing input ranges, merging overlapping or adjacent ranges,
 * and calculating the total count of IDs covered by the merged ranges.
 *
 * @param {string} input - A newline-separated string of ranges, where each range is defined as "start-end".
 *                         Parsing stops at the first blank line encountered.
 * @return {number} The total number of IDs covered by the merged ranges.
 */
export function solvePart2(input) {
  const lines = input.trim().split('\n');
  const ranges = [];

  // Parse only the ranges (stop at blank line)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '') {
      break;
    }

    const parts = line.split('-');
    ranges.push({
      start: parseInt(parts[0], 10),
      end: parseInt(parts[1], 10),
    });
  }

  // Sort ranges by start value
  ranges.sort((a, b) => a.start - b.start);

  // Merge overlapping ranges
  const merged = [];
  let current = ranges[0];

  for (let j = 1; j < ranges.length; j++) {
    const next = ranges[j];

    // Check if ranges overlap or are adjacent
    if (next.start <= current.end + 1) {
      // Merge: extend current range if needed
      if (next.end > current.end) {
        current.end = next.end;
      }
    } else {
      // No overlap, push current and start new
      merged.push(current);
      current = { start: next.start, end: next.end };
    }
  }
  merged.push(current);

  // Count total IDs in merged ranges
  let totalCount = 0;
  for (let k = 0; k < merged.length; k++) {
    totalCount += merged[k].end - merged[k].start + 1;
  }

  return totalCount;
}
