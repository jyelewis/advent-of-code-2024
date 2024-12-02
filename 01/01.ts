import { parse2DArray } from "../utilities";

export function day01a(input: string) {
  const [list1, list2] = parseInput(input);

  return list1.map((_, i) => Math.abs(list1[i] - list2[i])).sum();
}

export function day01b(input: string) {
  const [list1, list2] = parseInput(input);

  return list1
    .map((num) => {
      const numOccurrences = list2.count((num2) => num2 === num);
      return num * numOccurrences;
    })
    .sum();
}

function parseInput(input: string): [number[], number[]] {
  let list1: number[] = [];
  let list2: number[] = [];

  for (const [value1, value2] of parse2DArray(input)) {
    list1.push(value1);
    list2.push(value2);
  }

  // ensure our lists are sorted so numbers are compared in the correct order
  return [list1.toSorted(), list2.toSorted()];
}
