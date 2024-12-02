import { describe, expect, it, } from '@jest/globals';
import { countSafeReports } from './2024-day-2.js';

// Example data as a multiline string
const reportData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe('countSafeReports', () => {
  it('Correctly counts the number of safe reports', () => {
    expect(countSafeReports(reportData)).toBe(4);
  });
});
