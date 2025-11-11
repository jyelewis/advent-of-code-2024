import { Direction, Grid, GridPosition, parse2DArray, Position } from "../utilities";

export function day18a(input: string, isExample: boolean = false) {
  const allFallingBytes = parse2DArray(input).map(([x, y]) => new Position(x, y));
  // limited to first 1024, as per instructions
  const fallingBytes = allFallingBytes.slice(0, isExample ? 12 : 1024);

  // create an empty grid of appropriate size
  const gridSize = isExample ? 7 : 71;
  const memorySpace = Grid.fromSize(gridSize, gridSize, ".");

  // populate the grid with the falling bytes
  fallingBytes.forEach((bytePos) => memorySpace.setValue(bytePos, "#"));

  // pathfind from top-left to bottom-right
  const startPos = memorySpace.itemAt(new Position(0, 0));
  const endPos = memorySpace.itemAt(new Position(gridSize - 1, gridSize - 1));

  let currentPositions = [
    {
      pos: startPos,
      stepsTaken: 0,
    },
  ];
  while (true) {
    let newPositions: typeof currentPositions = [];
    for (const { pos, stepsTaken } of currentPositions) {
      if (pos.equals(endPos)) {
        return stepsTaken; // reached the end
      }

      // explore neighbors
      newPositions.push(
        ...Direction.CARDINAL
          // try to move in that direction
          .mapNotNull((dir) => pos.moveOrNull(dir))
          // filter down to valid paths
          .filter((pos) => pos.value !== "#")
          // store as a new step position
          .map((pos) => ({
            pos,
            stepsTaken: stepsTaken + 1,
          })),
      );
    }

    // trick: uniq will preference first items seen, so sorting by stepsTaken first means we keep the shortest paths
    currentPositions = newPositions
      // TODO: this isn't even needed!
      //       why... isn't this needed? We walk in lock step - nothing prevents us from doubling back on ourselves though, foolishly, add that optimisation
      // keep only the shortest paths to each position
      // .toSorted((a, b) => a.stepsTaken - b.stepsTaken)
      // remove duplicate (longer) positions
      .unique(({ pos }) => pos.key);
  }
}

export function day18b(input: string, isExample: boolean = false) {
  const fallingBytes = parse2DArray(input).map(([x, y]) => new Position(x, y));

  // create an empty grid of appropriate size
  const gridSize = isExample ? 7 : 71;
  const memorySpace = Grid.fromSize(gridSize, gridSize, ".");

  // pathfind from top-left to bottom-right
  const startPos = memorySpace.itemAt(new Position(0, 0));
  const endPos = memorySpace.itemAt(new Position(gridSize - 1, gridSize - 1));

  for (const fallingByte of fallingBytes) {
    memorySpace.setValue(fallingByte, "#");

    const shortestPathToExit = pathfind(startPos, endPos);
    if (shortestPathToExit === null) {
      return `${fallingByte.x},${fallingByte.y}`;
    }
  }
}

// TODO: could this be a generic function?
function pathfind(startPos: GridPosition<string>, endPos: GridPosition<string>): number | null {
  let seenPositions = new Set<string>();
  let currentPositions = [
    {
      pos: startPos,
      stepsTaken: 0,
      // TODO: this could be a loop state instead
      novel: true,
    },
  ];
  while (true) {
    let newPositions: typeof currentPositions = [];
    for (const { pos, stepsTaken } of currentPositions) {
      if (pos.equals(endPos)) {
        return stepsTaken; // reached the end
      }
      seenPositions.add(pos.key);

      // explore neighbors
      newPositions.push(
        ...Direction.CARDINAL
          // try to move in that direction
          .mapNotNull((dir) => pos.moveOrNull(dir))
          // filter down to valid paths, which we have not seen yet this tick
          .filter((pos) => pos.value !== "#" && !seenPositions.has(pos.key))
          // store as a new step position
          .map((pos) => ({
            pos,
            stepsTaken: stepsTaken + 1,
            novel: !seenPositions.has(pos.key),
          })),
      );
    }

    if (newPositions.every(({ novel }) => !novel)) {
      // no novel positions found this tick, we are blocked
      return null;
    }

    // trick: uniq will preference first items seen, so sorting by stepsTaken first means we keep the shortest paths
    currentPositions = newPositions
      // keep only the shortest paths to each position
      .toSorted((a, b) => a.stepsTaken - b.stepsTaken)
      // remove duplicate (longer) positions
      .unique(({ pos }) => pos.key);
  }
}
