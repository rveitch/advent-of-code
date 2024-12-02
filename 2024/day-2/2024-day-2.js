/**
 * Counts the number of safe reports from the given data string.
 *
 * @param {string} data - A newline-separated string of reports to be evaluated.
 * @return {number} The number of reports considered safe.
 */
export function countSafeReports(data) {
  const reports = data.trim().split('\n');
  let safeCount = 0;

  reports.forEach((report) => {
    const levels = report.split(' ').map(Number);
    if (isSafeReport(report) || isSafeAfterRemoval(levels)) {
      safeCount += 1;
    }
  });

  return safeCount;
}
/**
 * Determines if a report indicates a safe sequence of levels based on the constraints
 * of increasing or decreasing values.
 *
 * @param {string} report - A string of space-separated numbers representing the levels in the report.
 * @return {boolean} Returns true if the levels are either all increasing or all decreasing
 * according to the predefined safe difference constraints, otherwise false.
 */
export function isSafeReport(report) {
  const levels = report.split(' ').map(Number);
  const differences = levels.slice(0, -1).map((level, i) => level - levels[i + 1]);

  const isIncreasing = differences.every((diff) => diff >= -3 && diff <= -1);
  const isDecreasing = differences.every((diff) => diff >= 1 && diff <= 3);

  return isIncreasing || isDecreasing;
}

/**
 * Determines if the structure can be considered safe after the removal of one level.
 * The function checks each possible configuration after removing one level to see
 * if it results in a safe status.
 *
 * @param {string[]} levels - An array representing the levels of the structure.
 * @return {boolean} - Returns true if the structure is safe after removing one level, otherwise returns false.
 */
export function isSafeAfterRemoval(levels) {
  // Check if removing one level can make it safe
  for (let i = 0; i < levels.length; i += 1) {
    const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
    if (isSafeReport(modifiedLevels.join(' '))) {
      return true;
    }
  }

  return false;
}

export default {
  countSafeReports,
  isSafeReport,
  isSafeAfterRemoval,
};
