import { range } from "./range";
import { Position } from "./Position";

export function range2D<T>(arr: T[][]): Array<Position<T>>;
export function range2D(sizeX: number, sizeY: number): Array<Position<never>>;
export function range2D<T>(sizeXOrArr: T[][] | number, sizeY?: number): Array<Position<T>> {
  const array = Array.isArray(sizeXOrArr) ? sizeXOrArr : undefined;
  const sizeX = Array.isArray(sizeXOrArr) ? sizeXOrArr[0].length : sizeXOrArr;
  const realSizeY = Array.isArray(sizeXOrArr) ? sizeXOrArr.length : sizeY!;

  const arr: Array<Position> = [];
  for (const y of range(realSizeY)) {
    for (const x of range(sizeX)) {
      arr.push(new Position(x, y, array?.[y]?.[x]));
    }
  }

  return arr;
}
