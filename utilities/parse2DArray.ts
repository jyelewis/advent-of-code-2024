export function parse2DArray(input: string): number[][] {
  return input.split("\n").map((levelStr) => levelStr.split(/ +/g).map((numStr) => parseInt(numStr.trim(), 10)));
}
