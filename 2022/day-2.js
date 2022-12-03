const inputDataset = require('./input/day-2-input');

const test = false;
if (test) console.log('---TESTING---');
const input = test ? inputDataset.test : inputDataset.data;

const shapeCoding = {
  'A': 'Rock',
  'B': 'Paper',
  'C': 'Scissors',
  'X': 'Rock',
  'Y': 'Paper',
  'Z': 'Scissors',
};

const shapePoints = {
  'Rock': {
    value: 1,
    'Paper': 0,
    'Rock': 3,
    'Scissors': 6,
  },
  'Paper': {
    value: 2,
    'Scissors': 0,
    'Paper': 3,
    'Rock': 6,
  },
  'Scissors': {
    value: 3,
    'Rock': 0,
    'Scissors': 3,
    'Paper': 6,
  },
}

const partOneTotalScore = input.reduce((totalScore, round) => {
  const [opponentHand, playerHand] = round;
  const playerShape = shapeCoding[playerHand];
  const opponentShape = shapeCoding[opponentHand];
  const shapeValue = shapePoints[playerShape].value;
  const roundPoints = shapePoints[playerShape][opponentShape];
  const roundScore = shapeValue + roundPoints;
  totalScore = totalScore + roundScore;
  return totalScore;
}, 0);

console.log('Day 2 Answer Pt. 1:', partOneTotalScore);

function determinePlayerHandShape(playerCode, opponentHand) {
  const playerAction = {
    'X': 'Lose',
    'Y': 'Draw',
    'Z': 'Win',
  };
  const opponentShape = shapeCoding[opponentHand];
  const playerIntent = playerAction[playerCode];

  if (playerIntent === 'Draw') {
    return opponentShape;
  }

  const intentValue = playerIntent === 'Win' ? 0 : 6;
  const opponentShapeObject = { ...shapePoints[opponentShape] };
  delete opponentShapeObject.value;
  const playerShape = Object.keys(opponentShapeObject).find(key => opponentShapeObject[key] === intentValue);
  if (test) console.log('playerIntent:', playerIntent, 'opponentShape:', opponentShape, 'playerShape:', playerShape);
  return playerShape;
}

const partTwoTotalScore = input.reduce((totalScore, round) => {
  const [opponentHand, playerCode] = round;
  const playerShape = determinePlayerHandShape(playerCode, opponentHand);
  const opponentShape = shapeCoding[opponentHand];
  const shapeValue = shapePoints[playerShape].value;
  const roundPoints = shapePoints[playerShape][opponentShape];
  const roundScore = shapeValue + roundPoints;
  totalScore = totalScore + roundScore;
  return totalScore;
}, 0);

console.log('Day 2 Answer Pt. 2:', partTwoTotalScore);
