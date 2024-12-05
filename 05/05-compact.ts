import { parse2DArray } from "../utilities";

export function day05_compact(input: string) {
  const [orderingRules, updates] = input.split("\n\n").map(parse2DArray);
  const isValid = (pages: number[]) => orderingRules.every(([p1, p2]) =>
    !pages.includes(p2) || pages.indexOf(p1) < pages.indexOf(p2));

  return {
    partA: updates.filter(isValid).map((pages) => pages[Math.floor(pages.length / 2)]).sum(),
    partB: updates.filter((p) => !isValid(p)).map((pages) =>
      pages.toSorted((a, b) => (orderingRules.some(([p1, p2]) => a === p1 && b === p2) ? -1 : 0))[Math.floor(pages.length / 2)]).sum()
  };
}
