import { Direction, Grid, GridPosition } from "../utilities";
import assert from "node:assert";

export function day16(input: string) {
  const grid = Grid.fromString(input);

  const startPos = grid.positions.find((pos) => pos.value === "S");
  assert(startPos, "startPos not found");

  const endPos = grid.positions.find((pos) => pos.value === "E");
  assert(endPos, "endPos not found");

  const lowestCostToPosition = new Map<string, number>();
  const positionsToSearch: Array<{
    position: GridPosition<string>;
    direction: Direction;
    pathHere: GridPosition<string>[];
  }> = [];

  const enqueueLocation = (
    position: GridPosition<string>,
    direction: Direction,
    cost: number,
    pathHere: GridPosition<string>[],
  ) => {
    const existingLocationCost = lowestCostToPosition.get(`${position.key}-${direction.key}`);
    if (existingLocationCost !== undefined && existingLocationCost < cost) {
      return; // we already have a cheaper path to this location
    }

    positionsToSearch.push({
      position,
      direction,
      pathHere,
    });
    lowestCostToPosition.set(`${position.key}-${direction.key}`, cost);
  };

  const pathsToEnd: Array<{ cost: number; path: GridPosition<string>[] }> = [];

  enqueueLocation(startPos, Direction.EAST, 0, [startPos]);
  while (positionsToSearch.length > 0) {
    const { position, direction, pathHere } = positionsToSearch.shift()!;
    const locationKey = `${position.key}-${direction.key}`;

    const cost = lowestCostToPosition.get(locationKey);
    assert(cost !== undefined, `Cost should be defined ${locationKey}`);

    if (position.equals(endPos)) {
      pathsToEnd.push({
        cost,
        path: pathHere,
      });

      continue;
    }

    if (position.value === "#") {
      continue; // hit a wall
    }

    // search forwards, CCW, CW
    enqueueLocation(position.move(direction), direction, cost + 1, [...pathHere, position.move(direction)]);
    enqueueLocation(position, direction.rotate90CW(), cost + 1000, pathHere);
    enqueueLocation(position, direction.rotate90CCW(), cost + 1000, pathHere);
  }

  const shortestCost = Math.min(...pathsToEnd.map((p) => p.cost));
  const uniqueCells = pathsToEnd
    .filter((p) => p.cost === shortestCost)
    .flatMap((p) => p.path)
    .unique();

  return {
    partA: shortestCost,
    partB: uniqueCells.length,
  };
}
