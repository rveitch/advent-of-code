const _ = require('lodash');
const inputDataset = require('./input/day-9-input');

const test = false;
if (test) console.log('---TESTING---');
const input = test ? inputDataset.test : inputDataset.data;

/* **** HELPER FUNCTIONS **** */

class Point {
  X;
  Y;

  constructor(x = 0, y = 0, withHistory) {
    this.X = x;
    this.Y = y;

    if (withHistory) {
      this.History = new Array();
      this.History.push(new Point(x, y, false));
    }
  }

  get positionsVisited() {
    if (!this.History) return;
    return this.History.length;
  }

  IsTouching(point) {
    const xDist = this.X - point.X;
    const yDist = this.Y - point.Y;
    return (xDist <= 1 && xDist >= -1) && (yDist <= 1 && yDist >= -1);
  }

  Move(direction) {
    switch(direction) {
      case 'U':
        this.Y += 1;
        break;
      case 'D':
        this.Y -= 1;
        break;
      case 'L':
        this.X -= 1;
        break;
      case 'R':
        this.X += 1;
        break;
    }

    this.History?.push(new Point(this.X, this.Y, false));
  }

  MoveTowards(point) {
    if (this.IsTouching(point)) {
      return;
    }

    const xDist = Math.abs(point.X - this.X);
    const yDist = Math.abs(point.Y - this.Y);

    if ((xDist >= 2 && yDist >= 1) || (xDist >= 1 && yDist >= 2)) { // Diagonal Movement
      this.X += (point.X > this.X) ? 1 : -1;
      this.Y += (point.Y > this.Y) ? 1 : -1;
    } else if (xDist > 1) { // Horizontal Movement
      this.X += (point.X > this.X) ? 1 : -1;
    } else if (yDist > 1) { // Vertical Movement
      this.Y += (point.Y > this.Y) ? 1 : -1;
    }

    // Only track unique tail moments
    if (!this.History?.find((h) => h.X === this.X && h.Y === this.Y)) {
      this.History?.push(new Point(this.X, this.Y, false));
    }
  }
}

class Rope {
  Head;
  Knots;

  constructor(knots = 1) {
    this.Head = new Point(0, 0, true);
    this.Knots = new Array();
    _.times(knots,() => this.Knots.push(new Point(0, 0, true)))
  }

  get Tail() {
    return this.Knots[this.Knots.length - 1];
  }

  HandleMovement(direction, steps) {
    _.times(steps, ()=> {
      this.Head.Move(direction);
      for (let k = 0; k < this.Knots.length; k++) {
        const h = (k === 0) ? this.Head : this.Knots[k - 1];
        this.Knots[k].MoveTowards(h);
      }
    });
  }
}

function parseInput(inputData) {
  return inputData.map((movement) => {
    const [direction, steps] = movement.split(' ');
    return [direction, +steps];
  });
}

/* **** SOLUTIONS **** */

/**
 * Part 1 Solution
 * @returns {*|number}
 */
function solvePartOne() {
  const rope = new Rope(1);
  const Movements = parseInput(input.movements);
  Movements.forEach(([direction, steps]) => rope.HandleMovement(direction, steps));
  const tailPositionsVisited = rope.Tail.positionsVisited;
  return tailPositionsVisited;
}

/**
 * Part 2 Solution
 * @returns {*|number}
 */
function solvePartTwo() {
  const knots = input.knots - 1; // Excluding head
  const rope = new Rope(knots);
  const Movements = parseInput(input.movements);
  Movements.forEach(([direction, steps]) => rope.HandleMovement(direction, steps));
  const tailPositionsVisited = rope.Tail.positionsVisited;
  return tailPositionsVisited;
}

console.time('Total Execution Time');
console.log('Day 9 Answer Pt. 1:', solvePartOne()); // 6376
console.log('Day 9 Answer Pt. 2:', solvePartTwo()); // 2607
console.timeEnd('Total Execution Time');
