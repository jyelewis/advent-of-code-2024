import { Grid, Position, Direction } from "../utilities";

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

    // TODO: non value position
    const extraWall = new Position(x, y, undefined);
    const wouldLoop = evaluateGrid(startingPosition, grid, extraWall) === null;

    return wouldLoop;
  });

  return {
    partA,
    partB,
  };
}

// positions until we're out of bounds, or null if we loop forever
function evaluateGrid(position: Position<string>, grid: Grid<string>, extraWall?: Position): null | Position[] {
  let direction = Direction.UP;

  const visitedPositionsSet = new Map<string, Position>(); // unique locations we've been to
  const visitedPositionsDirectionsSet = new Set<string>(); // unique locations + directions

  // run the simulation
  while (true) {
    // mark this item as visited
    // TODO: API sucks
    const posWithValue = grid.itemAt(position);
    visitedPositionsSet.set(posWithValue.key, posWithValue);
    visitedPositionsDirectionsSet.add(`${posWithValue.key}-${direction.key}`);

    // now move
    position = position.move(direction); // TODO: this does not get the correct 'cell' from the grid!
    const currentTile = grid.itemAtOrNull(position); // this does though - could be one GridCell call

    const hasVisited = visitedPositionsDirectionsSet.has(`${position.key}-${direction.key}`);
    if (hasVisited) {
      // we've been here... must cause a loop
      return null;
    }

    if (currentTile === null) {
      // we've escaped, return the positions we've visited
      // or an empty array if we weren't keeping track
      return visitedPositionsSet.values().toArray() || [];
    }

    if (currentTile.value === "#" || currentTile.equals(extraWall)) {
      // we've walked into a wall - take a step backwards then turn
      position = position.move(direction, -1);

      // next position is a wall! Rotate 90º to the right (next direction in the list)
      direction = dirs[(dirs.indexOf(direction) + 1) % 4];
    }
  }
}
