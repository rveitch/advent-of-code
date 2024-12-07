export function evaluateEquations(input) {
  const lines = input.trim().split('\n');
  let totalCalibrationResult = 0;

  lines.forEach((line) => {
    const [testValueStr, numbersStr] = line.split(': ');
    const testValue = parseInt(testValueStr, 10);
    const numbers = numbersStr.split(' ').map((num) => parseInt(num, 10));

    if (canAchieveTestValue(testValue, numbers)) {
      totalCalibrationResult += testValue;
    }
  });

  return totalCalibrationResult;
}

function canAchieveTestValue(testValue, numbers) {
  return checkCombinations(numbers, 0, numbers[0], testValue);
}

function checkCombinations(numbers, index, currentValue, testValue) {
  if (index === numbers.length - 1) {
    return currentValue === testValue;
  }

  const nextNumber = numbers[index + 1];

  // Try adding
  if (checkCombinations(numbers, index + 1, currentValue + nextNumber, testValue)) {
    return true;
  }

  // Try multiplying
  return checkCombinations(numbers, index + 1, currentValue * nextNumber, testValue);
}

/* ***** Part 2 ***** */

export function evaluateEquationsWithConcatenation(input) {
  const lines = input.trim().split('\n');
  let totalCalibrationResult = 0;

  lines.forEach((line) => {
    const [testValueStr, numbersStr] = line.split(': ');
    const testValue = parseInt(testValueStr, 10);
    const numbers = numbersStr.split(' ').map((num) => parseInt(num, 10));

    if (canAchieveTestValueWithConcatenation(testValue, numbers)) {
      totalCalibrationResult += testValue;
    }
  });

  return totalCalibrationResult;
}

function canAchieveTestValueWithConcatenation(testValue, numbers) {
  return checkCombinationsWithConcatenation(numbers, 0, numbers[0], testValue);
}

function checkCombinationsWithConcatenation(numbers, index, currentValue, testValue) {
  if (index === numbers.length - 1) {
    return currentValue === testValue;
  }

  const nextNumber = numbers[index + 1];

  // Try adding
  if (checkCombinationsWithConcatenation(numbers, index + 1, currentValue + nextNumber, testValue)) {
    return true;
  }

  // Try multiplying
  if (checkCombinationsWithConcatenation(numbers, index + 1, currentValue * nextNumber, testValue)) {
    return true;
  }

  // Try concatenating
  const concatenatedValue = parseInt(`${currentValue}${nextNumber}`, 10);
  return checkCombinationsWithConcatenation(numbers, index + 1, concatenatedValue, testValue);
}

export default {
  evaluateEquations,
  evaluateEquationsWithConcatenation,
};
