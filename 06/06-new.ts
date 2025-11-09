import { Grid, Position, Direction } from "../utilities";

// TODO: don't love this hashing stuff, wonder if there is a better way

const dirs = [Direction.LEFT, Direction.UP, Direction.RIGHT, Direction.DOWN];

export function day06New(input: string) {
  const grid = new Grid(input.split("\n").map((line) => line.split("")));
  const startingPosition = grid.positions.find(({ value }) => value === "^")!;

  const visitedPositions = evaluateGrid(startingPosition, grid)!;

  const partA = visitedPositions.length;

  const partB = visitedPositions.count(({ x, y, value }) => {
    if (value === "^") {
      return false;
    }

    const extraWall = new Position(x, y, undefined);
    const wouldLoop = evaluateGrid(startingPosition, grid, false, extraWall) === null;

    return wouldLoop;
  });

  return {
    partA,
    partB,
  };
}

function directionToIndex(direction?: Direction) {
  if (direction === undefined) {
    return 4;
  }
  return dirs.indexOf(direction);
}

// re-use the same array to avoid creating a new one every time
const visitedPositionsIdx = new Uint16Array(130 * 130 * 5);
let evaluationIndex = 0; // each evaluation gets a unique index

// defining these outside the loop allows the JIT to optimize the function across calls
const hasVisited = (grid: Grid, pos: Position, direction?: Direction) =>
  visitedPositionsIdx[grid.intForPos(pos) * 5 + directionToIndex(direction)] === evaluationIndex;

const markVisited = (grid: Grid, pos: Position, direction?: Direction, visitedPositions?: Position[]) => {
  if (visitedPositions && !hasVisited(grid, pos)) {
    visitedPositions.push(pos);
    visitedPositionsIdx[grid.intForPos(pos) * 5 + directionToIndex(undefined)] = evaluationIndex;
  }

  visitedPositionsIdx[grid.intForPos(pos) * 5 + directionToIndex(direction)] = evaluationIndex;
};

// positions until we're out of bounds, or null if we loop forever
function evaluateGrid(
  position: Position<string>,
  grid: Grid<string>,
  keepTrack = true,
  extraWall?: Position,
): null | Position[] {
  evaluationIndex++;
  const visitedPositions: undefined | Position[] = keepTrack ? [] : undefined;

  let direction = Direction.UP;

  // run the simulation
  while (true) {
    // TODO: API sucks
    const posWithValue = grid.itemAt(position);
    markVisited(grid, posWithValue, direction, visitedPositions);

    // now move
    position = position.move(direction); // TODO: this does not get the correct 'cell' from the grid!
    const currentTile = grid.itemAtOrNull(position); // this does though - could be one GridCell call

    if (hasVisited(grid, position, direction)) {
      // we've been here... must cause a loop
      return null;
    }

    if (currentTile === null) {
      // we've escaped, return the positions we've visited
      // or an empty array if we weren't keeping track
      return visitedPositions || [];
    }

    if (currentTile.value === "#" || currentTile.equals(extraWall)) {
      // we've walked into a wall - take a step backwards then turn
      position = position.move(direction, -1);

      // next position is a wall! Rotate 90º to the right (next direction in the list)
      direction = dirs[(dirs.indexOf(direction) + 1) % 4];
    }
  }
}
