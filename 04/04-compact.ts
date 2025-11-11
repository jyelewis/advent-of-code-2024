import { range, range2D } from "../utilities";

export function day04a_compact(input: string) {
  const grid = input.lines().map(line => line.chars());
  return range2D(grid).map(({ x, y }) =>
    [-1, 0, 1].map(xStep => [-1, 0, 1].filter(yStep =>
      range(4).map(i => grid[y + i * yStep]?.[x + i * xStep]).join("") === "XMAS")).flat().length).sum();
}