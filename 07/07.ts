import { parse2DArray } from "../utilities";

export function day07(input: string) {
  const sumValidEquations = (includeConcat: boolean) =>
    parse2DArray(input)
      .filter(([goal, ...testValues]) =>
        // check if the goal is in the possible outputs
        possibleOutputsForTestValues(goal, testValues.toReversed(), includeConcat).includes(goal),
      )
      .map(([goal]) => goal)
      .sum();

  return {
    partA: sumValidEquations(false),
    partB: sumValidEquations(true),
  };
}

// I will not be explaining myself
const fastConcat = (num1: number, num2: number) => num1 * Math.pow(10, Math.floor(Math.log10(num2)) + 1) + num2;

// testValues -> all possible combinations
// input is expected to be reversed, so we can work backwards
function possibleOutputsForTestValues(goal: number, [last, ...rest]: number[], includeConcat: boolean): number[] {
  const combineTwoValues = (a: number, b: number) =>
    includeConcat ? [a + b, a * b, fastConcat(a, b)].filter((x) => x <= goal) : [a + b, a * b];

  // base case, all operations between final two values
  if (rest.length === 1) {
    return combineTwoValues(rest[0], last);
  }

  // recursive case, get the deepest pair of values and work outwards
  return possibleOutputsForTestValues(goal, rest, includeConcat).flatMap((value) => combineTwoValues(value, last));
}
