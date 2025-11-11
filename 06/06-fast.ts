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

export function day06_fast(input: string) {
  const grid = input.lines().map((line) => line.chars());
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
    const wouldLoop = getsStuckInLoop(startingPosition, grid);
    grid[y][x] = oldValue;

    return wouldLoop;
  });

  return {
    partA,
    partB,
  };
}

// faster to mutate the position than to create a new one
function move(pos: Position, direction: Direction, steps = 1) {
  switch (direction) {
    case Direction.Left:
      pos.x -= steps;
      return;
    case Direction.Right:
      pos.x += steps;
      return;
    case Direction.Up:
      pos.y -= steps;
      return;
    case Direction.Down:
      pos.y += steps;
      return;
    default:
      throw "boo";
  }
}

// re-use the same array to avoid creating a new one every time
const visitedPositionsIdx = new Uint16Array(130 * 130 * 5);
let evaluationIndex = 0; // each evaluation gets a unique index

// positions until we're out of bounds
function evaluateGrid(position: Position, grid: string[][]): Position[] {
  evaluationIndex++;
  const visitedPositions: Position[] = [];

  // we're about to mutate this - take a copy
  position = { ...position };
  let direction = Direction.Up;

  // run the simulation
  while (true) {
    const hasVisited = visitedPositionsIdx[position.y * 130 * 5 + position.x * 5 + Direction.Any] === evaluationIndex;
    if (!hasVisited) {
      visitedPositions.push({ ...position });
      visitedPositionsIdx[position.y * 130 * 5 + position.x * 5 + Direction.Any] = evaluationIndex;
    }

    move(position, direction);

    const currentTile = grid[position.y]?.[position.x];
    if (currentTile === undefined) {
      // we've escaped, return the positions we've visited
      // or an empty array if we weren't keeping track
      return visitedPositions || [];
    }

    if (currentTile === "#") {
      // we've walked into a wall - take a step backwards then turn
      move(position, direction, -1);

      // next position is a wall! Rotate 90º to the right (next direction in the list)
      direction = (direction + 1) % 4;
    }
  }
}

function getsStuckInLoop(position: Position, grid: string[][]): boolean {
  evaluationIndex++;

  // we're about to mutate this - take a copy
  position = { ...position };
  let direction = Direction.Up;

  // run the simulation
  while (true) {
    move(position, direction);

    const currentTile = grid[position.y]?.[position.x];
    if (currentTile === undefined) {
      // we've escaped, no loop
      return false;
    }

    if (currentTile === "#") {
      // we've walked into a wall - take a step backwards then turn
      move(position, direction, -1);

      // check if we've bumped into this wall facing this direction before
      const hasVisitedThisSpot =
        visitedPositionsIdx[position.y * 130 * 5 + position.x * 5 + direction] === evaluationIndex;
      if (hasVisitedThisSpot) {
        // we've been here... we're in a loop
        return true;
      }
      visitedPositionsIdx[position.y * 130 * 5 + position.x * 5 + direction] = evaluationIndex;

      // next position is a wall! Rotate 90º to the right (next direction in the list)
      direction = (direction + 1) % 4;
    }
  }
}
