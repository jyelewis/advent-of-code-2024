import { Grid, range } from "../utilities";
import assert from "node:assert";

export function day20a(input: string) {
  const distancesGrid = computeDistancesGrid(input);
  return findCheats(distancesGrid, 2);
}

export function day20b(input: string) {
  const distancesGrid = computeDistancesGrid(input);
  return findCheats(distancesGrid, 20);
}

export function computeDistancesGrid(input: string): Grid<null | number> {
  // parse input grid
  const grid = Grid.fromString(input);
  const startPosition = grid.positions.find(({ value }) => value === "S")!;
  const endPosition = grid.positions.find(({ value }) => value === "E")!;

  // create a new grid, representing the distances taken from the start for each position
  const distancesGrid = Grid.fromSize<null | number>(grid.width, grid.height, null);
  distancesGrid.setValue(startPosition, 0); // ensure our start position is recorded

  let stepNumber = 0;
  let prevPosition = startPosition;
  let currentPosition = startPosition;
  while (true) {
    const nextPosition = currentPosition
      .adjacents()
      // narrow down to exactly one valid next position
      .find((pos) => pos.value !== "#" && !pos.equals(prevPosition));
    assert(nextPosition !== undefined, "No valid next position found");

    prevPosition = currentPosition;
    currentPosition = nextPosition;

    // store our distance from start
    stepNumber++;
    distancesGrid.setValue(currentPosition, stepNumber);

    if (currentPosition.equals(endPosition)) {
      // we're done
      break;
    }
  }

  return distancesGrid;
}

function findCheats(distancesGrid: Grid<null | number>, maxTimeCheating: number): number {
  // for each position, see if disabling cheats from this spot results in any good cheat options
  const cheatsOver100 = new Set<string>();
  distancesGrid.positions
    .filter(({ value }) => value !== null)
    .map((cheatFromPosition) => {
      let prevPositions = [cheatFromPosition];

      range(1, maxTimeCheating).forEach((cheatTime) => {
        const newPositions = prevPositions.flatMap((pos) => pos.adjacents()).unique();

        prevPositions = newPositions;

        newPositions
          // remove walls (we can't finish on a wall)
          .filter((pos) => pos.value !== null)
          .forEach((cheatToPosition) => {
            const timeAtStart = cheatFromPosition.value!;
            const timeAtEnd = timeAtStart + cheatTime;

            assert(cheatToPosition.value !== null, "Cheat output has no time value");
            const timeSaved = cheatToPosition.value - timeAtEnd;

            if (timeSaved >= 100) {
              const key = `${cheatFromPosition.key}->${cheatToPosition.key}`;
              cheatsOver100.add(key);
            }
          });
      });
    });

  return cheatsOver100.size;
}
