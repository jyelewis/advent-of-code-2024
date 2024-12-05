import { parse2DArray } from "../utilities";

export function day01_compact(input: string) {
  const lists = parse2DArray(input).reduce(([l1, l2]: number[][], [v1, v2]) => [[...l1, v1], [...l2, v2],], [[], []])
    .map(x => x.toSorted());

  return {
    partA: lists[0].map((_, i) => Math.abs(lists[0][i] - lists[1][i])).sum(),
    partB: lists[0].map((n) => n * lists[1].count((n2) => n2 === n)).sum(),
  };
}