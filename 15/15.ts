import { Direction, Grid, GridPosition } from "../utilities";
import assert from "node:assert";

export function day15a(input: string) {
  // ---------------- parse input ----------------
  const [gridStr, directionLines] = input.split("\n\n");
  const grid = Grid.fromString(gridStr);

  const directions = directionLines
    .chars()
    .filter((c) => c !== "\n")
    .map((directionChar) => Direction.fromChar(directionChar));

  let robotPosition = grid.positions.find(({ value }) => value === "@");
  assert(robotPosition !== undefined, "Robot starting position not found");

  // ---------------- simulate ----------------
  for (const nextDirection of directions) {
    if (doMove(robotPosition, nextDirection, true)) {
      doMove(robotPosition, nextDirection, false);
      robotPosition = robotPosition.move(nextDirection);
    }
  }

  // ---------------- calculate answer ----------------
  // sum of 'GPS value' of each box
  return grid.positions
    .filter(({ value }) => value === "O")
    .map((box) => 100 * box.y + box.x)
    .sum();
}

export function day15b(input: string) {
  // ---------------- parse input ----------------
  const [gridStr, directionLines] = input.split("\n\n");
  const grid = new Grid(
    gridStr.lines().map((line) =>
      line
        // the factory must grow
        .replaceAll("#", "##")
        .replaceAll(".", "..")
        .replaceAll("@", "@.")
        .replaceAll("O", "[]")
        .chars(),
    ),
  );

  const directions = directionLines
    .chars()
    .filter((c) => c !== "\n")
    .map((directionChar) => Direction.fromChar(directionChar));

  let robotPosition = grid.positions.find(({ value }) => value === "@");
  assert(robotPosition !== undefined, "Robot starting position not found");

  // ---------------- simulate ----------------
  for (const nextDirection of directions) {
    if (doMove(robotPosition, nextDirection, true)) {
      doMove(robotPosition, nextDirection, false);
      robotPosition = robotPosition.move(nextDirection);
    }
  }

  // ---------------- calculate answer ----------------
  // sum of 'GPS value' of each box
  return grid.positions
    .filter(({ value }) => value === "[")
    .map((box) => 100 * box.y + box.x)
    .sum();
}

function doMove(moveFrom: GridPosition<string>, directionToMove: Direction, dryRun: boolean): boolean {
  const moveTo = moveFrom.move(directionToMove);

  if (moveTo.value === "#") {
    if (dryRun) {
      return false;
    } else {
      throw new Error("Invalid move into wall");
    }
  }

  if (moveTo.value === "O") {
    // box: push it out of the way to make room
    if (dryRun) {
      return doMove(moveTo, directionToMove, dryRun);
    } else {
      // do + move
      doMove(moveTo, directionToMove, dryRun);
    }
  }

  // pair up large boxes & always move both or none
  for (const [char, partnerDirection] of [
    ["[", Direction.RIGHT],
    ["]", Direction.LEFT],
  ] as const) {
    if (moveTo.value === char) {
      // large box, can we push the block behind it to make room?
      // need to find matching [ or ] to move both at once
      const moveToPartner = moveTo.move(partnerDirection);

      if (dryRun) {
        if (directionToMove.equals(partnerDirection)) {
          // special case, we will be moving into our partners space
          // if they can move, we can move
          return doMove(moveToPartner, directionToMove, dryRun);
        } else {
          // need to validate that both can be moved before moving either
          return doMove(moveTo, directionToMove, dryRun) && doMove(moveToPartner, directionToMove, dryRun);
        }
      }

      // not a dry run, do the moves
      doMove(moveToPartner, directionToMove, dryRun);
      doMove(moveTo, directionToMove, dryRun);
    }
  }

  if (dryRun) {
    // we would have moved successfully if we got to here
    return true;
  }

  assert(moveTo.value === ".", `Expected space to be empty ${moveTo.value}`);
  moveTo.value = moveFrom.value;
  moveFrom.value = ".";

  return true;
}
