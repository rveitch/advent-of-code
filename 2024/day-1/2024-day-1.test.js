import { // eslint-disable-line import/no-extraneous-dependencies
  describe,
  it,
  expect,
} from '@jest/globals';
import { calculateTotalDistance } from './2024-day-1.js';

describe('calculateTotalDistance', () => {
  it('calculates the distance between two identical lists', () => {
    const list1 = [3, 4, 2, 1, 3, 3];
    const list2 = [4, 3, 5, 3, 9, 3];
    expect(calculateTotalDistance(list1, list2)).toBe(11);
  });
});
