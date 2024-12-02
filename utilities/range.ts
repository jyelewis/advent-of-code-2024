// quick & dirty index array generator

export function range(size: number): number[];
export function range(from: number, to: number, step?: number): number[];
export function range(fromOrSize: number, to?: number, step = 1): number[] {
  const from = to !== undefined ? fromOrSize : 0;
  const realTo = to !== undefined ? to : fromOrSize - 1;

  const arr: number[] = [];
  for (let i = from; i <= realTo; i += step) {
    arr.push(i);
  }

  return arr;
}
