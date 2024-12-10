import { Pos, range2D } from "../utilities";

export function day10(input: string) {
  const grid = input.split("\n").map((line) => line.split("").map((n) => parseInt(n, 10)));

  // find peaks for each trailhead
  const trailheadPeaks = range2D(grid)
    .filter(({ value }) => value === 0)
    .map((pos) => trailsFrom(grid, pos));

  return {
    partA: trailheadPeaks.map((peaks) => new Set(peaks.map((p) => `${p.x},${p.y}`)).size).sum(),
    partB: trailheadPeaks.map((peaks) => peaks.length).sum(),
  };
}

function trailsFrom(grid: number[][], { x, y }: Pos, previousValue: number = -1): Pos[] {
  const currentValue = grid[y]?.[x];
  if (currentValue === undefined || currentValue !== previousValue + 1) {
    // out of bounds or not one step up :(
    return [];
  }

  if (currentValue === 9) {
    // yay we reached a peek
    return [{ x, y }];
  }

  return [
    ...trailsFrom(grid, { x, y: y - 1 }, currentValue), // up
    ...trailsFrom(grid, { x: x + 1, y }, currentValue), // right
    ...trailsFrom(grid, { x, y: y + 1 }, currentValue), // down
    ...trailsFrom(grid, { x: x - 1, y }, currentValue), // left
  ];
}
