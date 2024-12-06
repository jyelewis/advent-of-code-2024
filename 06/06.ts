import { range2D } from "../utilities";

interface Position {
  x: number;
  y: number;
}

enum Direction {
  Left = 0,
  Up,
  Right,
  Down,
  Any = 4,
}

export function day06(input: string) {
  const grid = input.split("\n").map((line) => line.split(""));
  const startingPosition: Position = range2D(grid).find((pos) => grid[pos.y][pos.x] === "^")!;

  const visitedPositions = evaluateGrid(startingPosition, grid)!;

  const partA = visitedPositions.length;

  const partB = visitedPositions.count(({ x, y }) => {
    if (grid[y][x] === "^") {
      return false;
    }

    // mutate the original grid to avoid cloning it every time
    const oldValue = grid[y][x];
    grid[y][x] = "#";
    const wouldLoop = evaluateGrid(startingPosition, grid, false) === null;
    grid[y][x] = oldValue;

    return wouldLoop;
  });

  return {
    partA,
    partB,
  };
}

function moveForward({ x, y }: Position, direction: Direction): Position {
  switch (direction) {
    case Direction.Left:
      return { x: x - 1, y };
    case Direction.Right:
      return { x: x + 1, y };
    case Direction.Up:
      return { x, y: y - 1 };
    case Direction.Down:
      return { x, y: y + 1 };
    case Direction.Any:
      throw "cannot move forward without a direction";
  }
}

// re-use the same array to avoid creating a new one every time
const visitedPositionsIdx: number[] = new Array(100_000).fill(0);
let evaluationIndex = 0; // each evaluation gets a unique index

// positions until we're out of bounds, or null if we loop forever
function evaluateGrid(startingPosition: Position, grid: string[][], keepTrack = true): null | Position[] {
  evaluationIndex++;
  const visitedPositions: Position[] = [];

  const hasVisited = (position: Position, direction = Direction.Any) =>
    visitedPositionsIdx[position.y * 130 * 5 + position.x * 5 + direction] === evaluationIndex;

  const markVisited = (position: Position, direction: Direction) => {
    if (keepTrack && !hasVisited(position)) {
      visitedPositions.push(position);
    }

    visitedPositionsIdx[position.y * 130 * 5 + position.x * 5 + direction] = evaluationIndex;
    visitedPositionsIdx[position.y * 130 * 5 + position.x * 5 + Direction.Any] = evaluationIndex;
  };

  // run the simulation
  let currentPosition: Position = startingPosition;
  let currentDirection = Direction.Up;
  while (true) {
    markVisited(currentPosition, currentDirection);

    const nextPosition = moveForward(currentPosition, currentDirection);
    if (hasVisited(nextPosition, currentDirection)) {
      // we've been here... must cause a loop
      return null;
    }

    if (grid[nextPosition.y]?.[nextPosition.x] === undefined) {
      // we've escaped, return the positions we've visited
      return visitedPositions;
    }

    if (grid[nextPosition.y][nextPosition.x] === "#") {
      // next position is a wall! Rotate 90º to the right (next direction in the list)
      currentDirection = (currentDirection + 1) % 4;
      continue;
    }

    // just keep swimming
    currentPosition = nextPosition;
  }
}
