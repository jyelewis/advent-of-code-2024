import { range } from "../range";

export function range2D<T>(array: T[][]): Array<{ x: number; y: number; value: T }> {
  const sizeX = array[0].length;
  const realSizeY = array.length;

  const arr: Array<{ x: number; y: number; value: any }> = [];
  for (const y of range(realSizeY)) {
    for (const x of range(sizeX)) {
      arr.push({ x, y, value: array?.[y]?.[x] });
    }
  }

  return arr;
}
