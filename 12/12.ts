import { Pos, range2D } from "../utilities";

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

export function sidesForRegion(region: Region) {
  // generate a list of lines representing that cells sides (complete lines)
  // dedup sides
  // count
  return region.cells
    .flatMap((cell) => {
      const cellWalls: Array<{
        side: string;
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
      }> = [];

      const directions = [
        {
          side: "top",
          wall: { x: 0, y: -1 },
          start: { x: -1, y: 0 },
          end: { x: 1, y: 0 },
        },
        {
          side: "bottom",
          wall: { x: 0, y: 1 },
          start: { x: -1, y: 0 },
          end: { x: 1, y: 0 },
        },
        {
          side: "left",
          wall: { x: -1, y: 0 },
          start: { x: 0, y: -1 },
          end: { x: 0, y: 1 },
        },
        {
          side: "right",
          wall: { x: 1, y: 0 },
          start: { x: 0, y: -1 },
          end: { x: 0, y: 1 },
        },
      ];
      for (const direction of directions) {
        const isMissingCellAdjacent = !region.cells.some(
          (c) => c.x === cell.x + direction.wall.x && c.y === cell.y + direction.wall.y,
        );
        if (!isMissingCellAdjacent) {
          // no gap, no wall
          continue;
        }

        // there must be a wall above us!
        // how far out does it extend?
        let xStart = cell.x;
        let yStart = cell.y;

        while (true) {
          const isPrevHavingCell = region.cells.some(
            (c) => c.x === xStart + direction.start.x && c.y === yStart + direction.start.y,
          );
          const isPrevMissingCellAdjacent = !region.cells.some(
            (c) =>
              c.x === xStart + direction.start.x + direction.wall.x &&
              c.y === yStart + direction.start.y + direction.wall.y,
          );

          if (!isPrevHavingCell || !isPrevMissingCellAdjacent) {
            // we've reached the end of the wall
            break;
          }

          xStart += direction.start.x;
          yStart += direction.start.y;
        }

        let xEnd = cell.x;
        let yEnd = cell.y;
        while (true) {
          const isNextHavingCell = region.cells.some(
            (c) => c.x === xEnd + direction.end.x && c.y === yEnd + direction.end.y,
          );
          const isNextMissingCellAdjacent = !region.cells.some(
            (c) =>
              c.x === xStart + direction.end.x + direction.wall.x &&
              c.y === yStart + direction.end.y + direction.wall.y,
          );
          if (!isNextHavingCell || !isNextMissingCellAdjacent) {
            // we've reached the end of our wall
            break;
          }

          // continue extending the end of our wall
          xEnd += direction.end.x;
          yEnd += direction.end.y;
        }

        cellWalls.push({
          side: direction.side,
          xStart,
          xEnd,
          yStart,
          yEnd,
        });
      }

      return cellWalls;
    })
    .dedup(({ side, xStart, xEnd, yStart, yEnd }) => `${side}-${xStart},${yStart}-${xEnd},${yEnd}`).length;
}

export function day12(input: string) {
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

  return {
    partA: regions.map((r) => r.cells.length * perimeterForRegion(r)).sum(),
    partB: regions.map((r) => r.cells.length * sidesForRegion(r)).sum(),
  };
}
