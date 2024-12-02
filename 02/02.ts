import { parse2DArray } from "../utilities";

export function day02a(input: string) {
  return parse2DArray(input).count(reportIsSafe);
}

export function day02b(input: string) {
  return parse2DArray(input).count(
    (report) =>
      // the report is already safe
      reportIsSafe(report) ||
      // or removing a single element makes it safe
      report.some((_, i) => reportIsSafe(report.toSpliced(i, 1))),
  );
}

function reportIsSafe(report: number[]): boolean {
  const allIncreasing = report.every((num, i) => i === 0 || num >= report[i - 1]);
  const allDecreasing = report.every((num, i) => i === 0 || num <= report[i - 1]);

  const differencesAllWithinRange = report.every((num, i) => {
    if (i === 0) return true;

    const difference = Math.abs(num - report[i - 1]);
    return 1 <= difference && difference <= 3;
  });

  return (allIncreasing || allDecreasing) && differencesAllWithinRange;
}
