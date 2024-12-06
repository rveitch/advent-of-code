import { describe, expect, it } from '@jest/globals';
import { solvePart1 } from './2024-day-5.js';

const orderRules = [
  '47|53',
  '97|13',
  '97|61',
  '97|47',
  '75|29',
  '61|13',
  '75|53',
  '29|13',
  '97|29',
  '53|29',
  '61|53',
  '97|53',
  '61|29',
  '47|13',
  '75|47',
  '97|75',
  '47|61',
  '75|61',
  '47|29',
  '75|13',
  '53|13',
];

const orderUpdates = [
  [75, 47, 61, 53, 29],
  [97, 61, 53, 29, 13],
  [75, 29, 13],
  [75, 97, 47, 61, 53],
  [61, 13, 29],
  [97, 13, 75, 29, 47],
];

describe('calculateSumOfMiddlePages', () => {
  it('Correctly calculates the sum of middle pages', () => {
    expect(solvePart1(orderUpdates, orderRules)).toBe(143);
  });
});
