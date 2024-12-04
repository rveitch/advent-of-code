import { describe, expect, it } from '@jest/globals';
import { countWordOccurrences, countXmasOccurrences } from './2024-day-4.js';

const testGrid = [
  'MMMSXXMASM',
  'MSAMXMSMSA',
  'AMXSXMAAMM',
  'MSAMASMSMX',
  'XMASAMXAMM',
  'XXAMMXXAMA',
  'SMSMSASXSS',
  'SAXAMASAAA',
  'MAMMMXMMMM',
  'MXMXAXMASX',
];

describe('Part 1', () => {
  it('countWordOccurrences', () => {
    expect(countWordOccurrences(testGrid, 'XMAS')).toBe(18);
  });
});

describe('Part 2', () => {
  it('countXmasOccurrences', () => {
    expect(countXmasOccurrences(testGrid)).toBe(9);
  });
});
