import { Direction, Grid, GridPosition } from "../utilities";
import assert from "node:assert";

export function day15a(input: string) {
  // ---------------- parse input ----------------
  const [gridStr, movementLines] = input.split("\n\n");
  const grid = new Grid(gridStr.split("\n").map((line) => line.split("")));

  const directionsStr = movementLines.replace(/\n/g, "");

  const directions = directionsStr.split("").map((directionChar) => {
    switch (directionChar) {
      case "^":
        return Direction.UP;
      case "v":
        return Direction.DOWN;
      case "<":
        return Direction.LEFT;
      case ">":
        return Direction.RIGHT;
      default:
        throw new Error(`Unknown direction character: ${directionChar}`);
    }
  });
  let robotPosition = grid.positions.find(({ value }) => value === "@");
  assert(robotPosition !== undefined, "Robot starting position not found");

  // ---------------- simulate ----------------
  const tryMove = (moveFrom: GridPosition<string>, directionToMove: Direction) => {
    const moveTo = moveFrom.move(directionToMove);

    if (moveTo.value === "#") {
      return false; // wall, cannot move there
    }

    if (moveTo.value === "O") {
      // box, can we push the block behind it to make room?
      if (!tryMove(moveTo, directionToMove)) {
        // we failed to move the box, so we can't move into its space
        return false;
      }
    }

    assert(moveTo.value === ".", "Expected space to be empty");
    // move into empty space
    moveTo.value = moveFrom.value;
    moveFrom.value = ".";

    return true;
  };

  for (const nextDirection of directions) {
    if (tryMove(robotPosition, nextDirection)) {
      // we successfully moved
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
  return 123;
}
