import { describe, expect, it } from '@jest/globals';
import { evaluateEquations, evaluateEquationsWithConcatenation } from './2024-day-7.js';

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe('evaluateEquations', () => {
  it('Correctly evaluates the equations', () => {
    expect(evaluateEquations(testInput)).toBe(3749);
  });
});

describe('evaluateEquationsWithConcatenation', () => {
  it('Correctly evaluates the equations with concatenation', () => {
    expect(evaluateEquationsWithConcatenation(testInput)).toBe(11387);
  });
});
