import { describe, expect, it } from '@jest/globals';
import { extractAndSumMulInstructions, calculateSumWithConditions } from './2024-day-3.js';

const corruptedMemoryPt1 = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
const corruptedMemoryPt2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

describe('Part 1', () => {
  it('extractAndSumMulInstructions', () => {
    expect(extractAndSumMulInstructions(corruptedMemoryPt1)).toBe(161);
  });
});

describe('Part 2', () => {
  it('calculateSumWithConditions', () => {
    expect(calculateSumWithConditions(corruptedMemoryPt2)).toBe(48);
  });
});
