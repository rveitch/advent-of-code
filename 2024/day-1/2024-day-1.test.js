import { // eslint-disable-line import/no-extraneous-dependencies
  describe,
  it,
  expect,
} from '@jest/globals';
import { calculateTotalDistance, calculateSimilarityScore } from './2024-day-1.js';

const leftList = [3, 4, 2, 1, 3, 3];
const rightList = [4, 3, 5, 3, 9, 3];

describe('calculateTotalDistance', () => {
  it('calculates the distance between two identical lists', () => {
    expect(calculateTotalDistance(leftList, rightList)).toBe(11);
  });
});

describe('calculateSimilarityScore', () => {
  it('calculates the similarity score', () => {
    expect(calculateSimilarityScore(leftList, rightList)).toBe(31);
  });
});
