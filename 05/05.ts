import { parse2DArray } from "../utilities";

export function day05a(input: string) {
  const [orderingRules, updates] = input.split("\n\n").map(parse2DArray);

  return (
    updates
      // filter to only valid updates
      .filter((pages) => pagesAreInValidOrder(orderingRules, pages))

      // find middle pages of each valid update
      .map((pages) => pages[Math.floor(pages.length / 2)])
      .sum()
  );
}

export function day05b(input: string) {
  const [orderingRules, updates] = input.split("\n\n").map(parse2DArray);

  return (
    updates
      // filter to only the invalid updates
      .filter((pages) => !pagesAreInValidOrder(orderingRules, pages))

      // fix each invalid update, to follow the provided page ordering rules
      .map((pages) =>
        pages.toSorted((a, b) =>
          // feed our sort rules (a < b) into the native sort function
          orderingRules.some(([first, second]) => a === first && b === second) ? -1 : 0,
        ),
      )

      // find middle pages of each, now valid, update
      .map((pages) => pages[Math.floor(pages.length / 2)])
      .sum()
  );
}

function pagesAreInValidOrder(orderingRules: number[][], pages: number[]) {
  return orderingRules.every(
    ([first, second]) => !pages.includes(second) || pages.indexOf(first) < pages.indexOf(second),
  );
}
