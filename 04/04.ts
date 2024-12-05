import { range, range2D } from "../utilities";

export function day04a(input: string) {
  const grid = input.split("\n").map((line) => line.split(""));

  return range2D(grid) // count & sum how many XMAS paths originate from each cell
    .map(({ x, y }) =>
      [
        getString(grid, x, y, 1, 0), // right
        getString(grid, x, y, -1, 0), // left
        getString(grid, x, y, 0, -1), // up
        getString(grid, x, y, 0, 1), // down
        getString(grid, x, y, 1, -1), // up-right
        getString(grid, x, y, -1, -1), // up-left
        getString(grid, x, y, 1, 1), // down-right
        getString(grid, x, y, -1, 1), // down-left
      ].count((str) => str === "XMAS"),
    )
    .sum();
}

export function day04b(input: string) {
  const grid = input.split("\n").map((line) => line.split(""));

  // count how many cells are the center of a MAS-X
  return range2D(grid).count(({ x, y }) => {
    const diagonal1 = getString(grid, x - 1, y - 1, 1, 1, 3); // top-left to bottom-right
    const diagonal2 = getString(grid, x - 1, y + 1, 1, -1, 3); // bottom-left to top-right

    // check they match, either forwards or backwards
    const validMas1 = diagonal1 === "MAS" || diagonal1 === "SAM";
    const validMas2 = diagonal2 === "MAS" || diagonal2 === "SAM";

    // we need a MAS on both diagonals for a valid X-MAS
    return validMas1 && validMas2;
  });
}

function getString(grid: string[][], x: number, y: number, xStep: number, yStep: number, length: number = 4): string {
  return range(length) // follow a path of [length] through the grid, starting from x,y and stepping by xStep, yStep, drop OOB values
    .map((i) => grid[y + i * yStep]?.[x + i * xStep])
    .join("");
}
