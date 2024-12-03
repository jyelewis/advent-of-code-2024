import "../utilities";

export function day03a(input: string) {
  return input
    .matchAll(/mul\((\d+),(\d+)\)/g) // find each 'mul(a,b)' pattern
    .map((match) => parseInt(match[1]) * parseInt(match[2]))
    .toArray()
    .sum();
}

export function day03b(input: string) {
  return input
    .split("do()") // break into groups that start with 'do()'
    .map((doInput) => doInput.split("don't()")[0]) // remove the 'don't()' part
    .map(day03a) // run part a
    .sum();
}
