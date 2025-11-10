import { Direction, Grid, Position } from "../utilities";

export function day2022(input: string) {
  const grid = new Grid<string>(input.split("\n").map((line) => line.split("")));

  const blizzards = grid.positions
    .filter((pos) => pos.value !== "." && pos.value !== "#")
    .map((pos) => ({
      position: pos.toPosition(),
      direction: Direction.fromChar(pos.value),
    }));

  // find first & last empty cell
  const startPos = grid.positions.find((cell) => cell.value === ".")!.toPosition();
  const endPos = grid.positions.findLast((cell) => cell.value === ".")!.toPosition();

  const findFastestPath = (from: Position, to: Position) => {
    let characterPositions = [from];
    let minutes = 0;
    let hasReachedEnd = false;

    // tick time forward until we reach the end
    while (!hasReachedEnd) {
      minutes++;

      // tick each of our blizzards forward one step
      blizzards.forEach((blizzard) => {
        const newPosition = blizzard.position.move(blizzard.direction);

        // wrap around logic
        if (grid.valueAt(newPosition) === "#") {
          if (blizzard.direction.equals(Direction.UP)) {
            blizzard.position.y = grid.height - 2;
          } else if (blizzard.direction.equals(Direction.DOWN)) {
            blizzard.position.y = 1;
          } else if (blizzard.direction.equals(Direction.LEFT)) {
            blizzard.position.x = grid.width - 2;
          } else if (blizzard.direction.equals(Direction.RIGHT)) {
            blizzard.position.x = 1;
          }
        } else {
          blizzard.position = newPosition;
        }
      });

      // for each of our current possible positions, where could we go next?
      characterPositions = characterPositions
        // remove any positions occupied by blizzards
        .filter((currentPosition) => !blizzards.some((blizzard) => blizzard.position.equals(currentPosition)))
        .flatMap((currentPosition) => {
          if (currentPosition.equals(to)) {
            // yay! we made it to the end, whats the time?
            hasReachedEnd = true;
            return [];
          }

          return [
            currentPosition, // we could wait
            // or move in any cardinal direction
            ...Direction.CARDINAL.map((dir) => currentPosition.move(dir))
              // where there isn't a wall of course
              .filter((pos) => grid.isInBounds(pos) && grid.valueAt(pos) !== "#"),
          ];
        })
        .unique();
    }

    return minutes;
  };

  const firstLegMinutes = findFastestPath(startPos, endPos);
  const secondLegMinutes = findFastestPath(endPos, startPos);
  const thirdLegMinutes = findFastestPath(startPos, endPos);

  return {
    partA: firstLegMinutes,
    partB: firstLegMinutes + secondLegMinutes + thirdLegMinutes,
  };
}
