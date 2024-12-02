import { range } from "../utilities/range";

export function day02a(input: string) {
  // count safe reports
  return parseInput(input).filter(reportIsSafe).length;
}

export function day02b(input: string) {
  // count safe reports, including those that become safe by removing a single element
  return parseInput(input).filter(
    (report) =>
      // the report is already safe
      reportIsSafe(report) ||
      // or removing a single element makes it safe
      range(report.length).some((i) => reportIsSafe(report.toSpliced(i, 1))),
  ).length;
}

function parseInput(input: string): Array<number[]> {
  // return 2d array of reports -> levels
  return input
    .split("\n")
    .map((levelStr) =>
      levelStr.split(" ").map((numStr) => parseInt(numStr, 10)),
    );
}

function reportIsSafe(report: number[]): boolean {
  const allIncreasing = report.every(
    (num, i) => i === 0 || num >= report[i - 1],
  );

  const allDecreasing = report.every(
    (num, i) => i === 0 || num <= report[i - 1],
  );

  const differencesAllWithinRange = report.every((num, i) => {
    if (i === 0) return true;

    const difference = Math.abs(num - report[i - 1]);
    return 1 <= difference && difference <= 3;
  });

  return (allIncreasing || allDecreasing) && differencesAllWithinRange;
}
