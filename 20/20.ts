import { Grid, range } from "../utilities";
import assert from "node:assert";

export function day20a(input: string) {
  const grid = Grid.fromString(input);

  const startPosition = grid.positions.find(({ value }) => value === "S")!;
  assert(startPosition !== undefined, "No starting position 'S' found");
  const endPosition = grid.positions.find(({ value }) => value === "E")!;
  assert(endPosition !== undefined, "No end position 'E' found");

  // create a new grid, representing the distances taken from the start for each position
  const distancesGrid = Grid.fromSize<null | number>(grid.width, grid.height, null);

  // TODO: do this at right point
  distancesGrid.setValue(startPosition, 0);

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

  const allCheats: any[] = [];

  distancesGrid.positions
    .filter(({ value }) => value !== null)
    .map((cheatFromPosition) => {
      const cheatToPositions = cheatFromPosition
        .adjacents()
        .flatMap((pos1) => pos1.adjacents())
        .unique();

      const cheats = cheatToPositions.map((cheatOutput) => {
        const timeAtStart = cheatFromPosition.value!;
        const timeAtEnd = timeAtStart + 2;

        const timeSaved = distancesGrid.valueAt(cheatOutput)! - timeAtEnd;
        return {
          cheatFrom: cheatFromPosition,
          cheatTo: cheatOutput,
          timeSaved,
        };
      });

      allCheats.push(...cheats);
    });

  const cheatsOver100 = allCheats.filter((c) => c.timeSaved >= 100);
  return cheatsOver100.length;
}

export function day20b(input: string) {
  const grid = Grid.fromString(input);

  const startPosition = grid.positions.find(({ value }) => value === "S")!;
  assert(startPosition !== undefined, "No starting position 'S' found");
  const endPosition = grid.positions.find(({ value }) => value === "E")!;
  assert(endPosition !== undefined, "No end position 'E' found");

  // create a new grid, representing the distances taken from the start for each position
  const distancesGrid = Grid.fromSize<null | number>(grid.width, grid.height, null);

  // TODO: do this at right point
  distancesGrid.setValue(startPosition, 0);

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

  const foundCheats = new Map<string, number>(); // key: "fromKey->toKey", value: timeSaved

  distancesGrid.positions
    .filter(({ value }) => value !== null)
    .map((cheatFromPosition) => {
      let prevPositions = [cheatFromPosition];

      range(1, 20).forEach((cheatSeconds) => {
        const newPositions = prevPositions.flatMap((pos) => pos.adjacents()).unique();

        prevPositions = newPositions;

        newPositions
          // remove walls (we can't finish on a wall)
          .filter((pos) => pos.value !== null)
          .forEach((cheatOutput) => {
            const timeAtStart = cheatFromPosition.value!;
            const timeAtEnd = timeAtStart + cheatSeconds;

            assert(cheatOutput.value !== null, "Cheat output has no time value");
            const timeSaved = cheatOutput.value - timeAtEnd;
            if (timeSaved < 0) {
              // pretty bad cheat
              return;
            }

            const key = `${cheatFromPosition.key}->${cheatOutput.key}`;
            const existingValue = foundCheats.get(key);
            if (existingValue === undefined || timeSaved > existingValue) {
              // only update if we find a better timeSaved
              foundCheats.set(key, timeSaved);
            }
          });
      });
    });

  const vals = Array.from(foundCheats.values());
  return vals.filter((x) => x >= 100).length;
}
