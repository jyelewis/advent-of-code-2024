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
      .map((invalidPages) => {
        const pages = [...invalidPages];

        // repeatedly swap pages into the correct order until all rules are followed
        while (!pagesAreInValidOrder(orderingRules, pages)) {
          for (const [first, second] of orderingRules) {
            const firstIdx = pages.indexOf(first);
            const secondIdx = pages.indexOf(second);

            if (secondIdx !== -1 && firstIdx > secondIdx) {
              // rule is broken - swap items
              pages[firstIdx] = second;
              pages[secondIdx] = first;
            }
          }
        }
        return pages;
      })
      // find middle pages of each valid update
      .map((pages) => pages[Math.floor(pages.length / 2)])
      .sum()
  );
}

function pagesAreInValidOrder(orderingRules: number[][], pages: number[]) {
  return orderingRules.every(
    ([first, second]) => !pages.includes(second) || pages.indexOf(first) < pages.indexOf(second),
  );
}
