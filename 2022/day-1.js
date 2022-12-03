const inputDataset = require('./input/day-1-input');

const input = inputDataset.data;

const elvesWithSummedCalories = input.reduce((elfCalorieTotal, food) => {
  const calorieTotal = food.reduce((totalCalories, itemCalories) => totalCalories + itemCalories, 0);
  elfCalorieTotal.push(calorieTotal);
  return elfCalorieTotal;
}, []);

const caloriesSorted = elvesWithSummedCalories.sort((a, b) => { return b-a });
const highestTotalCalories = caloriesSorted[0];

console.log('Day 1 Answer Pt. 1:', highestTotalCalories);

const top3Elves = caloriesSorted.slice(0, 3);
const top3TotalCalories = top3Elves.reduce((totalCalories, itemCalories) => totalCalories + itemCalories, 0);

console.log('Day 1 Answer Pt. 2:', top3TotalCalories);
