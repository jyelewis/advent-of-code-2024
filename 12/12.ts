import { Grid, GridPosition, Position } from "../utilities";

export interface Region {
  plantType: string;
  cells: Position[];
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
      const neighbors = region.cells.filter((other) => cell.isAdjacentTo(other));
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

      // TODO: gotta be a better way to use new APIs here
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
  const grid = new Grid(input.split("\n").map((line) => line.split("")));

  // find enclosed regions
  // TODO: set+arr pattern again, switch to map + entries
  const visitedCells = new Set<string>();
  const regions: Region[] = [];

  // gross, we mutate cells
  const findRegion = (pos: GridPosition<string>, plantType: string, cells: Position[]) => {
    // not the right type
    if (pos.value !== plantType) {
      return;
    }

    // already part of a region
    if (visitedCells.has(pos.key)) {
      return;
    }

    visitedCells.add(pos.key);
    cells.push(pos);

    pos.downOrNull() && findRegion(pos.down(), plantType, cells);
    pos.upOrNull() && findRegion(pos.up(), plantType, cells);
    pos.rightOrNull() && findRegion(pos.right(), plantType, cells);
    pos.leftOrNull() && findRegion(pos.left(), plantType, cells);
  };

  grid.positions.forEach((pos) => {
    const cells: Position[] = [];
    findRegion(pos, pos.value, cells);
    if (cells.length > 0) {
      regions.push({ plantType: pos.value, cells });
    }
  });

  return {
    partA: regions.map((r) => r.cells.length * perimeterForRegion(r)).sum(),
    partB: regions.map((r) => r.cells.length * sidesForRegion(r)).sum(),
  };
}
