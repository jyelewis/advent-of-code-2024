import { range } from "./range";

export function range2D(arr: unknown[][]): Array<{ x: number; y: number }>;
export function range2D(sizeX: number, sizeY: number): Array<{ x: number; y: number }>;
export function range2D(sizeXOrArr: unknown[][] | number, sizeY?: number): Array<{ x: number; y: number }> {
  const sizeX = Array.isArray(sizeXOrArr) ? sizeXOrArr[0].length : sizeXOrArr;
  const realSizeY = Array.isArray(sizeXOrArr) ? sizeXOrArr.length : sizeY!;

  const arr: Array<{ x: number; y: number }> = [];
  for (const y of range(realSizeY)) {
    for (const x of range(sizeX)) {
      arr.push({ x, y });
    }
  }

  return arr;
}
