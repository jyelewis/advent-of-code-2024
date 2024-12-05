import { parse2DArray } from "../utilities";

const reportIsSafe = (report: number[]) =>
  (report.every((v, i, a) => !i || v > a[i - 1]) || report.every((v, i, a) => !i || v < a[i - 1])) &&
  report.every((n, i) => !i || (1 <= Math.abs(n - report[i - 1]) && Math.abs(n - report[i - 1]) <= 3));

export const day02a_compact = (input: string) => parse2DArray(input).count(reportIsSafe);
export const day02b_compact = (input: string) => parse2DArray(input).count((report) =>
  reportIsSafe(report) || report.some((_, i) => reportIsSafe(report.toSpliced(i, 1))),);
