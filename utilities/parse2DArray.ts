export function parse2DArray(input: string): number[][] {
  return input.split("\n").map((levelStr) =>
    // split on non digit characters, and convert to numbers
    levelStr.split(/[^-0-9]+/g).map((numStr) => parseInt(numStr.trim(), 10)),
  );
}
