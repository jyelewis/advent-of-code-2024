import { range2D, sscanf } from "../utilities";

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
    partA: countCellsWithMoreThanOneLine(flatLines),
    partB: countCellsWithMoreThanOneLine(lines),
  };
}

function countCellsWithMoreThanOneLine(lines: any[]): number {
  const gridXStart = Math.min(...lines.map((line) => Math.min(line.fromX, line.toX)));
  const gridXEnd = Math.max(...lines.map((line) => Math.max(line.fromX, line.toX)));
  const gridYStart = Math.min(...lines.map((line) => Math.min(line.fromY, line.toY)));
  const gridYEnd = Math.max(...lines.map((line) => Math.max(line.fromY, line.toY)));

  return range2D(gridXEnd - gridXStart + 1, gridYEnd - gridYStart + 1)
    .map((cell) => {
      const x = cell.x + gridXStart;
      const y = cell.y + gridYStart;

      // count the lines passing through 'cell'
      return lines.count((line) => {
        const isWithinBounds =
          Math.min(line.fromX, line.toX) <= x &&
          x <= Math.max(line.fromX, line.toX) &&
          Math.min(line.fromY, line.toY) <= y &&
          y <= Math.max(line.fromY, line.toY);

        const isVertical = line.fromX === line.toX;
        const isHorizontal = line.fromY === line.toY;
        const isDiagonal = Math.abs(x - line.fromX) === Math.abs(y - line.fromY);

        return isWithinBounds && (isVertical || isHorizontal || isDiagonal);
      });
    })
    .count((linesCrossing) => linesCrossing >= 2);
}
