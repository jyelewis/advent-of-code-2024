import { range } from "./range";
import { Position } from "./Position";

// TODO: simplify this, discover remaining usages
export function range2D<T>(arr: T[][]): Array<{ x: number; y: number; value: T }>;
export function range2D(sizeX: number, sizeY: number): Array<Position>;
export function range2D<T>(
  sizeXOrArr: T[][] | number,
  sizeY?: number,
): Array<Position> | Array<{ x: number; y: number; value: T }> {
  const array = Array.isArray(sizeXOrArr) ? sizeXOrArr : undefined;
  const sizeX = Array.isArray(sizeXOrArr) ? sizeXOrArr[0].length : sizeXOrArr;
  const realSizeY = Array.isArray(sizeXOrArr) ? sizeXOrArr.length : sizeY!;

  if (array !== undefined) {
    // legacy behaviour, accept a 2d array, return objects with coords
    const arr: Array<{ x: number; y: number; value: any }> = [];
    for (const y of range(realSizeY)) {
      for (const x of range(sizeX)) {
        arr.push({ x, y, value: array?.[y]?.[x] });
      }
    }

    return arr;
  }

  // modern behaviour, return Position objects for a given range
  const arr: Array<Position> = [];
  for (const y of range(realSizeY)) {
    for (const x of range(sizeX)) {
      arr.push(new Position(x, y));
    }
  }

  return arr;
}
