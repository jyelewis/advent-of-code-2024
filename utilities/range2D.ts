import { range } from "./range";

export function range2D<T>(arr: T[][]): Array<{ x: number; y: number; value: T }>;
export function range2D(sizeX: number, sizeY: number): Array<{ x: number; y: number; value: never }>;
export function range2D<T>(sizeXOrArr: T[][] | number, sizeY?: number): Array<{ x: number; y: number; value: T }> {
  const array = Array.isArray(sizeXOrArr) ? sizeXOrArr : undefined;
  const sizeX = Array.isArray(sizeXOrArr) ? sizeXOrArr[0].length : sizeXOrArr;
  const realSizeY = Array.isArray(sizeXOrArr) ? sizeXOrArr.length : sizeY!;

  const arr: Array<{ x: number; y: number; value: any }> = [];
  for (const y of range(realSizeY)) {
    for (const x of range(sizeX)) {
      arr.push({ x, y, value: array?.[y]?.[x] });
    }
  }

  return arr;
}
