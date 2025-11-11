import "../utilities";

export function day2022_25(input: string) {
  return decToSnaffu(input.lines().map(snaffuToDec).sum());
}

export function snaffuToDec(s: string): number {
  return s
    .chars()
    .reverse() // work from right to left
    .map(
      (snaffuDigit) =>
        ({
          "2": 2,
          "1": 1,
          "0": 0,
          "-": -1,
          "=": -2,
        })[snaffuDigit]!,
    )
    .map((decDigit, index) => decDigit * Math.pow(5, index))
    .sum();
}

export function decToSnaffu(n: number): string {
  let place = 0;
  let borrowed = false;

  const snaffuDigits: string[] = [];

  while (n > 0 || borrowed) {
    let placeValue = Math.pow(5, place);
    let nextPlaceValue = Math.pow(5, place + 1);

    const rem = n % nextPlaceValue;
    let digitValue = Math.floor(rem / placeValue);
    n -= digitValue * placeValue;

    if (borrowed) {
      digitValue += 1;
    }

    // map dec to snaffu digit, possibly borrowing
    const [snaffuValue, didBorrow] = {
      5: ["0", true],
      4: ["-", true],
      3: ["=", true],
      2: ["2", false],
      1: ["1", false],
      0: ["0", false],
      [-1]: ["-", false],
      [-2]: ["=", false],
    }[digitValue]! as [string, boolean];

    borrowed = didBorrow;

    snaffuDigits.push(snaffuValue);
    place++;
  }

  return snaffuDigits.reverse().join("");
}
