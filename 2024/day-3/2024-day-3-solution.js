import { corruptedMemory } from './2024-day-3-input-data.js';
import { extractAndSumMulInstructions, calculateSumWithConditions } from './2024-day-3.js';

/* ***** PART 1 ***** */
console.log(`Part 1 Solution: ${extractAndSumMulInstructions(corruptedMemory)}`); // Answer: 153469856

/* ***** PART 2 ***** */
console.log(`Part 2 Solution: ${calculateSumWithConditions(corruptedMemory)}`); // Answer: 77055967
