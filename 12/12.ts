import { Direction, Grid, GridPosition, Position } from "../utilities";

export interface Region {
  plantType: string;
  cells: Position[];
}

export function day12(input: string) {
  const grid = Grid.fromString(input);

  // find enclosed regions
  // each cell can only be consumed into a region once
  const visitedCells = new Set<string>();
  const findRegion = (pos: GridPosition<string>, plantType: string): Position[] => {
    // not the right type
    if (pos.value !== plantType) {
      return [];
    }

    // already part of another region
    if (visitedCells.has(pos.key)) {
      return [];
    }
    visitedCells.add(pos.key);

    return [
      // this cell, is part of plantType region
      pos.toPosition(),
      // and some of our neighbours might be too
      ...Direction.CARDINAL
        // find any valid adjacent cardinal directions
        .mapNotNull((dir) => pos.moveOrNull(dir))
        // DFS, locate our entire region
        .flatMap((adjPos) => findRegion(adjPos, plantType)),
    ];
  };

  const regions = grid.positions
    // for each position, try and find a region surrounding that position
    .map((pos) => ({ plantType: pos.value, cells: findRegion(pos, pos.value) }))
    // remove any empty regions, typically caused by their region already being captured in a previous cells check
    .filter((x) => x.cells.length > 0);

  return {
    partA: regions.map((r) => r.cells.length * perimeterForRegion(r)).sum(),
    partB: regions.map((r) => r.cells.length * sidesForRegion(r)).sum(),
  };
}

function regionContains(region: Region, pos: Position) {
  return region.cells.some((c) => c.x === pos.x && c.y === pos.y);
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
      const neighbors = region.cells.count((other) => cell.isAdjacentTo(other));
      return 4 - neighbors;
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
        start: Position;
        end: Position;
      }> = [];

      for (const wallNormal of Direction.CARDINAL) {
        const hasCellAdjacent = regionContains(region, cell.move(wallNormal));
        if (hasCellAdjacent) {
          // no gap, no wall
          continue;
        }

        const wall = { side: wallNormal.key, start: cell, end: cell };

        // try to move the wall start backwards, as far as we can go
        while (true) {
          // need to standardise line direction?
          const prevPos = wall.start.move(wallNormal.rotate90CCW());
          const isPrevHavingCell = regionContains(region, prevPos);
          const isPrevMissingCellAdjacent = !regionContains(region, prevPos.move(wallNormal));

          if (!isPrevHavingCell || !isPrevMissingCellAdjacent) {
            // we've reached the start of the wall
            break;
          }

          wall.start = prevPos;
        }

        // try to move the wall end forwards, as far as we can go
        while (true) {
          const nextPos = wall.end.move(wallNormal.rotate90CW());
          const isNextHavingCell = regionContains(region, nextPos);
          const isNextMissingCellAdjacent = !regionContains(region, nextPos.move(wallNormal));

          if (!isNextHavingCell || !isNextMissingCellAdjacent) {
            // we've reached the end of the wall
            break;
          }

          wall.end = nextPos;
        }

        cellWalls.push(wall);
      }

      return cellWalls;
    })
    .unique(({ side, start, end }) => `${side}-${start.key},${end.key}`).length;
}
