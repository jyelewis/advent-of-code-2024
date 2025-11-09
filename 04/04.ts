import { Direction, Grid, Position, range } from "../utilities";

export function day04a(input: string) {
  const grid = new Grid(input.split("\n").map((line) => line.split("")));

  return grid.positions // count & sum how many XMAS paths originate from each cell
    .map((pos) =>
      [
        getString(grid, pos, Direction.LEFT),
        getString(grid, pos, Direction.DOWN),
        getString(grid, pos, Direction.DOWN_RIGHT),
        getString(grid, pos, Direction.DOWN_LEFT),
      ].count((str) => str === "XMAS" || str === "SAMX"),
    )
    .sum();
}

export function day04b(input: string) {
  const grid = new Grid(input.split("\n").map((line) => line.split("")));

  // count how many cells are the center of a MAS-X
  return grid.positions.count((pos) => {
    const diagonal1 = getString(grid, pos.upLeft(), Direction.DOWN_RIGHT, 3); // top-left to bottom-right
    const diagonal2 = getString(grid, pos.upRight(), Direction.DOWN_LEFT, 3); // bottom-left to top-right

    // check they match, either forwards or backwards - we need a MAS on both diagonals for a valid X-MAS
    return (diagonal1 === "MAS" || diagonal1 === "SAM") && (diagonal2 === "MAS" || diagonal2 === "SAM");
  });
}

function getString(grid: Grid<string>, pos: Position<string>, dir: Direction, length: number = 4): string {
  return range(length) // follow a path of [length] through the grid, starting from x,y and stepping by dir, drop OOB values
    .map((i) => grid.itemAtOrNull(pos.move(dir, i))?.value)
    .join("");
}
