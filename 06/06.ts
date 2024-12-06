import { range2D } from "../utilities";

interface Position {
  x: number;
  y: number;
}

enum Direction {
  Any = 0,
  Left,
  Right,
  Up,
  Down,
}

export function day06(input: string) {
  const grid = input.split("\n").map((line) => line.split(""));
  const startingPosition: Position = range2D(grid).find((pos) => grid[pos.y][pos.x] === "^")!;

  const visitedPositions = evaluateGrid(startingPosition, grid)!;

  const partA = visitedPositions.length;
  const partB = visitedPositions
    .filter(({ x, y }) => grid[y][x] !== "^") // ignore starting position
    .map(({ x, y }) => {
      const newGrid = structuredClone(grid);
      newGrid[y][x] = "#";
      return newGrid;
    })
    .count((grid) => evaluateGrid(startingPosition, grid) === null);

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

const turnRight = {
  [Direction.Left]: Direction.Up,
  [Direction.Right]: Direction.Down,
  [Direction.Up]: Direction.Right,
  [Direction.Down]: Direction.Left,
  [Direction.Any]: Direction.Left,
};

// positions until we're out of bounds, or null if we loop forever
function evaluateGrid(startingPosition: Position, grid: string[][]): null | Position[] {
  // I apologise profusely for this
  // can't think of a better way to efficiently store & query visited positions
  const visitedPositions: Position[] = [];
  const visitedPositionsSet = new Set<number>();

  const hasVisited = (position: Position, direction = Direction.Any) =>
    visitedPositionsSet.has((position.y << 11) + (position.x << 3) + direction);

  const markVisited = (position: Position, direction: Direction) => {
    if (!hasVisited(position)) {
      visitedPositions.push(position);
    }

    visitedPositionsSet.add((position.y << 11) + (position.x << 3) + direction);
    visitedPositionsSet.add((position.y << 11) + (position.x << 3) + Direction.Any);
  };

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
      // next position is a wall! Rotate 90º to the right
      currentDirection = turnRight[currentDirection];
      continue;
    }

    // just keep swimming
    currentPosition = nextPosition;
  }
}
