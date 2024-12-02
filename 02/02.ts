// array of reports, each report is an array of level numbers
function parseInput(input: string): Array<number[]> {
  return input.split("\n").map((levelStr) => {
    return levelStr.split(" ").map((numStr) => parseInt(numStr, 10));
  });
}

function reportIsSafe(report: number[]): boolean {
  const allIncreasing = report.every(
    (num, i) => i === 0 || num >= report[i - 1],
  );

  const allDecreasing = report.every(
    (num, i) => i === 0 || num <= report[i - 1],
  );

  const differencesAllWithinRange = report.every((num, i) => {
    if (i === 0) {
      return true;
    }

    const difference = Math.abs(num - report[i - 1]);
    return 1 <= difference && difference <= 3;
  });

  return (allIncreasing || allDecreasing) && differencesAllWithinRange;
}

export function day02a(input: string) {
  return parseInput(input).filter(reportIsSafe).length;
}

export function day02b(input: string) {
  const reports = parseInput(input);

  const safeLevels = reports.filter((report) => {
    if (reportIsSafe(report)) {
      return true;
    }

    for (let i = 0; i < report.length; i++) {
      // check each report with one level removed
      const copy = [...report];
      copy.splice(i, 1);

      // if any are safe, return true
      if (reportIsSafe(copy)) {
        return true;
      }
    }

    // none of our modifications were safe :(
    return false;
  });

  return safeLevels.length;
}
