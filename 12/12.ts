import { Pos, range2D } from "../utilities";
import assert from "node:assert";

export interface Region {
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

export function sidesForRegion(region: Region) {
  // for each cell
  return region.cells
    .flatMap((cell) => {
      const cellWalls: Array<{
        tag: string;
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
      }> = [];

      // TODO: this can be dramatically simplified

      // top side
      const isMissingCellAbove = region.cells.some((c) => c.x === cell.x && c.y === cell.y - 1) === false;
      if (isMissingCellAbove) {
        // there must be a wall above us!
        // how far out does it extend?
        let xStart = cell.x;
        while (xStart >= 0) {
          const isPrevHavingCell = region.cells.some((c) => c.x === xStart - 1 && c.y === cell.y);
          const isPrevMissingCellAbove = region.cells.some((c) => c.x === xStart - 1 && c.y === cell.y - 1);

          if (isPrevHavingCell && !isPrevMissingCellAbove) {
            // we can extend our wall to the left
            xStart--;

            // and go again
          } else {
            // we've reached the left end of the wall
            break;
          }
        }
        assert(xStart >= 0);

        let xEnd = cell.x;
        while (xEnd <= 10_000) {
          const isNextHavingCell = region.cells.some((c) => c.x === xEnd + 1 && c.y === cell.y);
          const isNextMissingCellAbove = region.cells.some((c) => c.x === xEnd + 1 && c.y === cell.y - 1);
          if (isNextHavingCell && !isNextMissingCellAbove) {
            // we can extend our wall to the right
            xEnd++;
          } else {
            // we've reached the right end of the wall
            break;
          }
        }
        assert(xEnd < 10_000);

        cellWalls.push({
          tag: "top",
          xStart,
          xEnd,
          yStart: cell.y,
          yEnd: cell.y,
        });
      }

      // bottom side
      const isMissingCellBelow = region.cells.some((c) => c.x === cell.x && c.y === cell.y + 1) === false;
      if (isMissingCellBelow) {
        // there must be a wall below us!
        // how far out does it extend?
        let xStart = cell.x;
        while (xStart >= 0) {
          const isPrevHavingCell = region.cells.some((c) => c.x === xStart - 1 && c.y === cell.y);
          const isPrevMissingCellBelow = region.cells.some((c) => c.x === xStart - 1 && c.y === cell.y + 1);

          if (isPrevHavingCell && !isPrevMissingCellBelow) {
            // we can extend our wall to the left
            xStart--;

            // and go again
          } else {
            // we've reached the left end of the wall
            break;
          }
        }
        assert(xStart >= 0);

        let xEnd = cell.x;
        while (xEnd <= 10_000) {
          const isNextHavingCell = region.cells.some((c) => c.x === xEnd + 1 && c.y === cell.y);
          const isNextMissingCellBelow = region.cells.some((c) => c.x === xEnd + 1 && c.y === cell.y + 1);
          if (isNextHavingCell && !isNextMissingCellBelow) {
            // we can extend our wall to the right
            xEnd++;
          } else {
            // we've reached the right end of the wall
            break;
          }
        }
        assert(xEnd < 10_000);

        cellWalls.push({
          tag: "bottom",
          xStart,
          xEnd,
          yStart: cell.y + 1,
          yEnd: cell.y + 1,
        });
      }

      // left side
      const isMissingCellLeft = region.cells.some((c) => c.x === cell.x - 1 && c.y === cell.y) === false;
      if (isMissingCellLeft) {
        // there must be a wall left of us!
        // how far out does it extend?
        let yStart = cell.y;
        while (yStart >= 0) {
          const isAboveHavingCell = region.cells.some((c) => c.x === cell.x && c.y === yStart - 1);
          const isAboveMissingCellLeft = region.cells.some((c) => c.x === cell.x - 1 && c.y === yStart - 1);

          if (isAboveHavingCell && !isAboveMissingCellLeft) {
            // we can extend our wall up
            yStart--;

            // and go again
          } else {
            // we've reached the left end of the wall
            break;
          }
        }
        assert(yStart >= 0);

        let yEnd = cell.y;
        while (yEnd <= 10_000) {
          const isBelowHavingCell = region.cells.some((c) => c.x === cell.x && c.y === yEnd + 1);
          const isBelowMissingCellLeft = region.cells.some((c) => c.x === cell.x - 1 && c.y === yEnd + 1);

          if (isBelowHavingCell && !isBelowMissingCellLeft) {
            // we can extend our wall dowm
            yEnd++;
          } else {
            // we've reached the end of the wall
            break;
          }
        }
        assert(yEnd < 10_000);

        cellWalls.push({
          tag: "left",
          xStart: cell.x,
          xEnd: cell.x,
          yStart,
          yEnd,
        });
      }

      // right side
      const isMissingCellRight = region.cells.some((c) => c.x === cell.x + 1 && c.y === cell.y) === false;
      if (isMissingCellRight) {
        // there must be a wall left of us!
        // how far out does it extend?
        let yStart = cell.y;
        while (yStart >= 0) {
          const isAboveHavingCell = region.cells.some((c) => c.x === cell.x && c.y === yStart - 1);
          const isAboveMissingCellRight = region.cells.some((c) => c.x === cell.x + 1 && c.y === yStart - 1);

          if (isAboveHavingCell && !isAboveMissingCellRight) {
            // we can extend our wall up
            yStart--;

            // and go again
          } else {
            // we've reached the left end of the wall
            break;
          }
        }
        assert(yStart >= 0);

        let yEnd = cell.y;
        while (yEnd <= 10_000) {
          const isBelowHavingCell = region.cells.some((c) => c.x === cell.x && c.y === yEnd + 1);
          const isBelowMissingCellRight = region.cells.some((c) => c.x === cell.x + 1 && c.y === yEnd + 1);

          if (isBelowHavingCell && !isBelowMissingCellRight) {
            // we can extend our wall dowm
            yEnd++;
          } else {
            // we've reached the end of the wall
            break;
          }
        }
        assert(yEnd < 10_000);

        cellWalls.push({
          tag: "right",
          xStart: cell.x + 1,
          xEnd: cell.x + 1,
          yStart,
          yEnd,
        });
      }

      return cellWalls;
    })
    .dedup(({ tag, xStart, xEnd, yStart, yEnd }) => `${tag}-${xStart},${yStart}-${xEnd},${yEnd}`).length;
  // generate a list of lines representing that cells sides (complete lines)
  // dedup sides
  // count
}

// TODO: merge with a
export function day12b(input: string) {
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

  return regions.map((r) => r.cells.length * sidesForRegion(r)).sum();
}
