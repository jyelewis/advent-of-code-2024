import { parse2DArray, range } from "../utilities";

function nextInSequence(history: number[]): number {
  const lastRecordedValue = history[history.length - 1];
  const deltas = range(history.length - 1).map((idx) => history[idx + 1] - history[idx]);

  const deltasAreAllZero = deltas.every((delta) => delta === 0);
  if (deltasAreAllZero) {
    // base case: return the amount we increased by in the last layer
    return lastRecordedValue;
  }

  // weeeee
  return lastRecordedValue + nextInSequence(deltas);
}

export function day2023_09a(input: string) {
  return parse2DArray(input).map(nextInSequence).sum();
}

export function day2023_09b(input: string) {
  // same but go backwards
  return parse2DArray(input)
    .map((r) => r.toReversed())
    .map(nextInSequence)
    .sum();
}
