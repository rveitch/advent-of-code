import { leftList, rightList } from './2024-day-1-input-data.js';
import { calculateTotalDistance, calculateSimilarityScore } from './2024-day-1.js';

// Part 1
const totalDistance = calculateTotalDistance(leftList, rightList);
console.log(`Total Distance: ${totalDistance}`); // 1151792

// Part 2
const similarityScore = calculateSimilarityScore(leftList, rightList);
console.log(`Similarity score: ${similarityScore}`); // 21790168
