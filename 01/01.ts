import "../utilities/sum";

function parseInput(input: string): [number[], number[]] {
  let list1: number[] = [];
  let list2: number[] = [];

  for (const line of input.split("\n")) {
    const [value1, value2] = line.split("   ");

    list1.push(parseInt(value1, 10));
    list2.push(parseInt(value2, 10));
  }

  return [list1, list2];
}

export function day01a(input: string) {
  const [list1, list2] = parseInput(input);

  // ensure our lists are sorted so numbers are compared in the correct order
  list1.sort();
  list2.sort();

  return (
    list1
      // calculate the distance between each pair of items
      .map((_, i) => Math.abs(list1[i] - list2[i]))
      // sum distances
      .sum()
  );
}

export function day01b(input: string) {
  const [list1, list2] = parseInput(input);

  return (
    list1
      .map((num) => {
        const numOccurrences = list2.filter((x) => x === num).length;
        return num * numOccurrences;
      })
      // sum the results
      .sum()
  );
}
