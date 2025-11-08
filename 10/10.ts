import { Position, Direction, Grid } from "../utilities";

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

function trailsFrom(grid: Grid<number>, pos: Position, previousValue: number = -1): Position[] {
  const currentValue = grid.itemAtOrNull(pos);
  if (currentValue === null || currentValue.value !== previousValue + 1) {
    return []; // out of bounds or not one step up :(
  }

  if (currentValue.value === 9) {
    return [pos]; // yay we reached a peek
  }

  return [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT].flatMap((dir) =>
    trailsFrom(grid, pos.move(dir), currentValue.value),
  );
}
