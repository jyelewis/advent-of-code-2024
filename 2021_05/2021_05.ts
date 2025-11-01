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

  return {
    partA: countCellsWithMoreThanOneLineV3(flatLines),
    partB: countCellsWithMoreThanOneLineV3(lines),
  };
}

function stepDirection(from: number, to: number) {
  if (from < to) {
    return 1;
  }
  if (from > to) {
    return -1;
  }
  return 0;
}

function countCellsWithMoreThanOneLineV3(lines: any[]): number {
  const cellsToCheck = new Map<string, { x: number; y: number }>();
  lines.forEach((line) => {
    const xStep = stepDirection(line.fromX, line.toX);
    const yStep = stepDirection(line.fromY, line.toY);

    let x = line.fromX;
    let y = line.fromY;
    while (true) {
      cellsToCheck.set(`${x},${y}`, { x, y });

      if (x === line.toX && y === line.toY) {
        break;
      }

      x += xStep;
      y += yStep;
    }
  });

  return (
    cellsToCheck
      .values()
      // filter to cells with at least 2 lines
      .filter(
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
      )
      // count how many cells we're left with
      .reduce((acc) => acc + 1, 0)
  );
}
