import { Pos, range2D } from "../utilities";

export function day10(input: string) {
  const grid = input.split("\n").map((line) => line.split("").map((n) => parseInt(n, 10)));

  const trailheadPeaks = range2D(grid)
    .filter(({ value }) => value === 0)
    .map((pos) => trailsFrom(grid, pos));

  return {
    partA: trailheadPeaks.map((peaks) => peaks.dedup((p) => `${p.x},${p.y}`).length).sum(),
    partB: trailheadPeaks.map((peaks) => peaks.length).sum(),
  };
}

function trailsFrom(grid: number[][], { x, y }: Pos, previousValue: number = -1): Pos[] {
  const currentValue = grid[y]?.[x];
  if (currentValue === undefined || currentValue !== previousValue + 1) {
    return []; // out of bounds or not one step up :(
  }

  if (currentValue === 9) {
    return [{ x, y }]; // yay we reached a peek
  }

  return [
    ...trailsFrom(grid, { x, y: y - 1 }, currentValue), // up
    ...trailsFrom(grid, { x: x + 1, y }, currentValue), // right
    ...trailsFrom(grid, { x, y: y + 1 }, currentValue), // down
    ...trailsFrom(grid, { x: x - 1, y }, currentValue), // left
  ];
}
