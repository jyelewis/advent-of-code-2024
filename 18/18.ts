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

  return pathfind(startPos, endPos);
}

export function day18b(input: string, isExample: boolean = false) {
  const fallingBytes = parse2DArray(input).map(([x, y]) => new Position(x, y));

  // create an empty grid of appropriate size
  const gridSize = isExample ? 7 : 71;

  // pathfind from top-left to bottom-right
  const startPos = new Position(0, 0);
  const endPos = new Position(gridSize - 1, gridSize - 1);

  let low = 0;
  let high = fallingBytes.length - 1;

  while (true) {
    const mid = Math.floor((low + high) / 2);

    // populate the grid to this point
    let memorySpace = Grid.fromSize(gridSize, gridSize, ".");
    const fallenBytes = fallingBytes.slice(0, mid + 1);
    fallenBytes.forEach((byte) => memorySpace.setValue(byte, "#"));

    const shortestPathToExit = pathfind(memorySpace.itemAt(startPos), memorySpace.itemAt(endPos));
    if (shortestPathToExit === null) {
      high = mid; // already blocked, try earlier
    } else {
      low = mid + 1; // not yet blocked, try later
    }

    if (low >= high) {
      const blockingByte = fallingBytes[high];
      return `${blockingByte.x},${blockingByte.y}`;
    }
  }
}

function pathfind(startPos: GridPosition<string>, endPos: GridPosition<string>): number | null {
  let seenPositions = new Set<string>();
  let currentPositions = [
    {
      pos: startPos,
      stepsTaken: 0,
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
          // filter down to valid paths, which we have not seen before
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
      // no novel positions found this tick, we must be blocked, no path to exit
      return null;
    }

    currentPositions = newPositions.unique(({ pos }) => pos.key);
  }
}
