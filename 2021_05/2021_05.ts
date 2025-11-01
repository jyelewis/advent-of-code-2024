import { sscanf } from "../utilities";

export function day2021(input: string) {
  const lines = input.split("\n").map((line) => {
    const [fromX, fromY, toX, toY] = sscanf`${Number},${Number} -> ${Number},${Number}`(line);

    return {
      fromX,
      fromY,
      toX,
      toY,
    };
  });

  const flatLines = lines.filter((line) => line.fromX === line.toX || line.fromY === line.toY);

  const countCellsWithMoreThanOneLine = (lines: typeof flatLines): number =>
    lines
      // create a list of cells for each line
      .flatMap((line) => {
        let x = line.fromX;
        let y = line.fromY;

        let cells = [];
        while (true) {
          cells.push({ x, y });

          if (x === line.toX && y === line.toY) {
            break;
          }

          x += stepDirection(line.fromX, line.toX);
          y += stepDirection(line.fromY, line.toY);
        }

        return cells;
      })
      .dedup(({ x, y }) => `${x},${y}`)
      // count which unique cells have 2 or more lines crossing them
      .count(
        (cell) =>
          lines.count((line) => {
            const isWithinBounds =
              Math.min(line.fromX, line.toX) <= cell.x &&
              cell.x <= Math.max(line.fromX, line.toX) &&
              Math.min(line.fromY, line.toY) <= cell.y &&
              cell.y <= Math.max(line.fromY, line.toY);

            const isVertical = line.fromX === line.toX;
            const isHorizontal = line.fromY === line.toY;
            const isDiagonal = Math.abs(cell.x - line.fromX) === Math.abs(cell.y - line.fromY);

            return isWithinBounds && (isVertical || isHorizontal || isDiagonal);
          }) >= 2,
      );

  return {
    partA: countCellsWithMoreThanOneLine(flatLines),
    partB: countCellsWithMoreThanOneLine(lines),
  };
}

function stepDirection(from: number, to: number) {
  if (from < to) return 1;
  if (from > to) return -1;
  return 0;
}
