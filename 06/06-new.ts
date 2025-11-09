import { Grid, Position, Direction, GridPosition } from "../utilities";

const dirs = [Direction.LEFT, Direction.UP, Direction.RIGHT, Direction.DOWN];

export function day06New(input: string) {
  const grid = new Grid(input.split("\n").map((line) => line.split("")));
  const startingPosition = grid.positions.find(({ value }) => value === "^")!;

  const visitedPositions = evaluateGrid(startingPosition)!;

  const partA = visitedPositions.length;

  const partB = visitedPositions.count(({ x, y, value }) => {
    if (value === "^") {
      return false;
    }

    const extraWall = new Position(x, y);
    const wouldLoop = evaluateGrid(startingPosition, extraWall) === null;
    return wouldLoop;
  });

  return {
    partA,
    partB,
  };
}

// positions until we're out of bounds, or null if we loop forever
function evaluateGrid(position: GridPosition<string>, extraWall?: Position): null | GridPosition<string>[] {
  let direction = Direction.UP;

  const visitedPositionsSet = new Map<string, GridPosition<string>>(); // unique locations we've been to
  const visitedPositionsDirectionsSet = new Set<string>(); // unique locations + directions

  // run the simulation
  while (true) {
    // mark this item as visited
    visitedPositionsSet.set(position.key, position);
    visitedPositionsDirectionsSet.add(`${position.key}-${direction.key}`);

    // now move
    const nextPosition = position.moveOrNull(direction);
    if (nextPosition === null) {
      // we've escaped, return the positions we've visited
      // or an empty array if we weren't keeping track
      return visitedPositionsSet.values().toArray() || [];
    }
    position = nextPosition;

    const hasVisited = visitedPositionsDirectionsSet.has(`${position.key}-${direction.key}`);
    if (hasVisited) {
      // we've been here... must cause a loop
      return null;
    }

    if (position.value === "#" || position.equals(extraWall)) {
      // we've walked into a wall - take a step backwards then turn
      position = position.move(direction, -1);

      // next position is a wall! Rotate 90º to the right (next direction in the list)
      direction = dirs[(dirs.indexOf(direction) + 1) % 4];
    }
  }
}
