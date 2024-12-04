import { describe, expect, it, } from '@jest/globals';
import { doTheThing } from './2024-day-X.js';

describe('doTheThing', () => {
  it('Correctly does the thing', () => {
    expect(doTheThing('the-thing')).toBe('the-thing');
  })
});
