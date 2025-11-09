import { Position, Direction, Grid, GridPosition } from "../utilities";

export function day10(input: string) {
  const grid = new Grid(
    input.split("\n").map((line) =>
      // split each line into an array of numbers
      line.split("").map((n) => parseInt(n, 10)),
    ),
  );

  const trailheadPeaks = grid.positions.filter(({ value }) => value === 0).map((pos) => trailsFrom(grid, pos));

  return {
    partA: trailheadPeaks.map((peaks) => peaks.dedup().length).sum(),
    partB: trailheadPeaks.map((peaks) => peaks.length).sum(),
  };
}

function trailsFrom(grid: Grid<number>, pos: GridPosition<number>, previousValue: number = -1): Position[] {
  if (pos.value !== previousValue + 1) {
    return []; // not one step up :(
  }

  if (pos.value === 9) {
    return [pos]; // yay we reached a peek
  }

  return [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT]
    .map((dir) => pos.moveOrNull(dir)) // try to move in the given direction
    .filter((newPos) => newPos !== null) // bail if out of bounds
    .flatMap((adjacentPos) => trailsFrom(grid, adjacentPos, pos.value));
}
