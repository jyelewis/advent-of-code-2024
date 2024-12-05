import "../utilities";

export const day03a_compact = (input: string) => input.matchAll(/mul\((\d+),(\d+)\)/g).map(m => +m[1] * +m[2]).toArray().sum();

export const day03b_compact = (input: string) => input.split("do()")
  .map(doInput => day03a_compact(doInput.split("don't()")[0])).sum();
