/**
 * Part 1:
 * Extracts and processes 'mul' instructions from a string, calculating the sum of all evaluated multiplication operations found.
 * Each 'mul' instruction is expected to be in the format 'mul(x, y)' where x and y are integer operands.
 *
 * @param {string} memory - The input string potentially containing multiple 'mul' instructions, which are to be extracted and evaluated.
 * @return {number} The sum of the results of all 'mul' instructions found and evaluated in the input string.
 */
export function extractAndSumMulInstructions(memory) {
  // Regular expression to match valid mul instructions (e.g., mul(44,46))
  const regex = /mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;
  let match;
  let totalSum = 0;

  // Finding all matches and calculating the result
  while ((match = regex.exec(memory)) !== null) { // eslint-disable-line no-cond-assign
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    totalSum += x * y;
  }

  return totalSum;
}

/**
 * Part 2:
 * Calculates the sum of the products specified by the "mul(X,Y)" instructions found in the memory string.
 * It respects the toggle instructions "do()" and "don't()" to enable or disable multiplication.
 * Initially, multiplication is enabled.
 *
 * @param {string} memory - A string containing "mul(X,Y)", "do()", and "don't()" instructions.
 *                          "mul(X,Y)" adds the product of X and Y to the sum if multiplication is enabled.
 *                          "do()" re-enables multiplication.
 *                          "don't()" disables multiplication.
 *                          X and Y are integers between 0 and 999.
 * @return {number} The total sum of all valid multiplications found in the string, respecting toggling instructions.
 */
export function calculateSumWithConditions(memory) {
  // Regular expressions to match the relevant instructions
  const mulRegex = /mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don't\(\)/g;

  let totalSum = 0;
  let mulEnabled = true; // Initially, mul instructions are enabled
  let index = 0;

  while (index < memory.length) {
    // Check for don't() instruction
    dontRegex.lastIndex = index;
    const dontMatch = dontRegex.exec(memory);
    // Check for do() instruction
    doRegex.lastIndex = index;
    const doMatch = doRegex.exec(memory);
    // Check for mul(X,Y) instruction
    mulRegex.lastIndex = index;
    const mulMatch = mulRegex.exec(memory);

    // Determine the nearest relevant match
    let closestMatch = memory.length;
    let matchType = null;

    if (dontMatch && dontMatch.index < closestMatch) {
      closestMatch = dontMatch.index;
      matchType = 'dont';
    }
    if (doMatch && doMatch.index < closestMatch) {
      closestMatch = doMatch.index;
      matchType = 'do';
    }
    if (mulMatch && mulMatch.index < closestMatch) {
      closestMatch = mulMatch.index;
      matchType = 'mul';
    }

    if (matchType === 'dont') {
      mulEnabled = false;
      index = dontMatch.index + dontMatch[0].length;
    } else if (matchType === 'do') {
      mulEnabled = true;
      index = doMatch.index + doMatch[0].length;
    } else if (matchType === 'mul') {
      if (mulEnabled) {
        const x = parseInt(mulMatch[1], 10);
        const y = parseInt(mulMatch[2], 10);
        totalSum += x * y;
      }
      index = mulMatch.index + mulMatch[0].length;
    } else {
      break;
    }
  }

  return totalSum;
}

export default {
  extractAndSumMulInstructions,
  calculateSumWithConditions,
};
