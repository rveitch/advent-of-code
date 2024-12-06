import { describe, expect, it } from '@jest/globals';
import { simulateGuardPatrol, findLoopInducingPositions } from './2024-day-6.js';

const testMapData = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`.trim();

describe('simulateGuardPatrol', () => {
  it('Correctly simulates guard patrol', () => {
    expect(simulateGuardPatrol(testMapData)).toBe(41);
  });
});

describe('findLoopInducingPositions', () => {
  it('Correctly finds the positions', () => {
    expect(findLoopInducingPositions(testMapData)).toBe(6);
  });
});
