import { range2D } from "../utilities";

interface Pos {
  x: number;
  y: number;
}

enum Direction {
  Left,
  Right,
  Up,
  Down,
  Any,
}

function moveForwardMut(pos: Pos, direction: Direction) {
  switch (direction) {
    case Direction.Left:
      pos.x -= 1;
      return;
    case Direction.Right:
      pos.x += 1;
      return;
    case Direction.Up:
      pos.y -= 1;
      return;
    case Direction.Down:
      pos.y += 1;
      return;
    default:
      throw "boo";
  }
}

function moveBackwardMut(pos: Pos, direction: Direction) {
  switch (direction) {
    case Direction.Left:
      pos.x += 1;
      return;
    case Direction.Right:
      pos.x -= 1;
      return;
    case Direction.Up:
      pos.y += 1;
      return;
    case Direction.Down:
      pos.y -= 1;
      return;
    default:
      throw "boo";
  }
}

const turnRight = {
  [Direction.Left]: Direction.Up,
  [Direction.Right]: Direction.Down,
  [Direction.Up]: Direction.Right,
  [Direction.Down]: Direction.Left,
  [Direction.Any]: Direction.Left,
};

export function day06a(input: string) {
  const grid = input.split("\n").map((line) => line.split(""));
  const startingPosition: Pos = range2D(grid).find((pos) => grid[pos.y][pos.x] === "^")!;

  return evaluateGrid(startingPosition, grid)!.length;
}

export function day06b(input: string) {
  const grid = input.split("\n").map((line) => line.split(""));
  const startingPosition: Pos = range2D(grid).find((pos) => grid[pos.y][pos.x] === "^")!;

  const positionsVisited = evaluateGrid(startingPosition, grid)!;

  return positionsVisited
    .filter(({ x, y }) => grid[y][x] !== "^") // ignore starting position
    .map(({ x, y }) => {
      const newGrid = structuredClone(grid);
      newGrid[y][x] = "#";
      return newGrid;
    })
    .count((grid) => evaluateGrid(startingPosition, grid, false) === null);
}

// number of steps until we're out of bounds, or null if we loop forever
function evaluateGrid(startingPosition: Pos, grid: string[][], bother = true): null | Pos[] {
  const visitedPositions: Pos[] = [];
  const visitedPositionsSet = new Set<number>();

  const hasVisited = (position: Pos, direction = Direction.Any) =>
    visitedPositionsSet.has(position.y * 10000 + position.x * 10 + direction);

  const markVisited = (position: Pos, direction: Direction) => {
    if (bother && !hasVisited(position)) {
      visitedPositions.push({ x: currentPosition.x, y: currentPosition.y });
    }

    visitedPositionsSet.add(position.y * 10000 + position.x * 10 + direction);
    visitedPositionsSet.add(position.y * 10000 + position.x * 10 + Direction.Any);
  };

  let currentPosition: Pos = structuredClone(startingPosition);
  let currentDirection = Direction.Up;

  while (true) {
    markVisited(currentPosition, currentDirection);

    // const nextPosition = moveForward(currentPosition, currentDirection);
    moveForwardMut(currentPosition, currentDirection);
    if (hasVisited(currentPosition, currentDirection)) {
      // we've been here... must cause a loop
      return null;
    }

    if (grid[currentPosition.y]?.[currentPosition.x] === undefined) {
      // we've escaped, return the positions we've visited
      return visitedPositions;
    }

    if (grid[currentPosition.y][currentPosition.x] === "#") {
      // next position is a wall! Rotate 90º to the right
      moveBackwardMut(currentPosition, currentDirection);
      currentDirection = turnRight[currentDirection];
    }
  }
}
