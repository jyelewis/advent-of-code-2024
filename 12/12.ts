import { Pos, range2D } from "../utilities";

interface Region {
  plantType: string;
  cells: Pos[];
}

function isAdjacent(a: Pos, b: Pos) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1;
}

function perimeterForRegion(region: Region) {
  // each cell contributes
  // 0 if it has 4 neighbors
  // 1 if it has 3 neighbors
  // 2 if it has 2 neighbors
  // 3 if it has 1 neighbor
  // 4 if it has 0 neighbors

  return region.cells
    .map((cell) => {
      const neighbors = region.cells.filter((other) => isAdjacent(cell, other));
      return 4 - neighbors.length;
    })
    .sum();
}

export function day12a(input: string) {
  const grid = input.split("\n").map((line) => line.split(""));

  // find enclosed regions
  const visitedCells = new Set<string>();
  const regions: Region[] = [];

  // gross, we mutate cells
  const findRegion = (x: number, y: number, plantType: string, cells: Pos[]) => {
    // out of bounds
    if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) {
      return;
    }

    // not the right type
    if (grid[y][x] !== plantType) {
      return;
    }

    // already part of a region
    if (visitedCells.has(`${x},${y}`)) {
      return;
    }

    visitedCells.add(`${x},${y}`);
    cells.push({ x, y });

    findRegion(x + 1, y, plantType, cells);
    findRegion(x - 1, y, plantType, cells);
    findRegion(x, y + 1, plantType, cells);
    findRegion(x, y - 1, plantType, cells);
  };

  range2D(grid).forEach(({ x, y, value: plantType }) => {
    const cells: Pos[] = [];
    findRegion(x, y, plantType, cells);
    if (cells.length > 0) {
      regions.push({ plantType, cells });
    }
  });

  return regions.map((r) => r.cells.length * perimeterForRegion(r)).sum();
}

export function day12b(_input: string) {
  return 123;
}
