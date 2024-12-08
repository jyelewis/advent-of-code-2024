import "../utilities";
import { range2D } from "../utilities";

export function day08(input: string) {
  const grid = input.split("\n").map((line) => line.split(""));

  return {
    partA: countAntiNodes(grid, false),
    partB: countAntiNodes(grid, true),
  };
}

function countAntiNodes(grid: string[][], includeHarmonics: boolean) {
  const antiNodes = new Set<string>(); // x,y

  range2D(grid) // find harmonics for each tower in the grid
    .filter(({ value }) => value !== ".") // remove empty spaces
    .forEach(({ x: x1, y: y1, value: freq1 }) =>
      range2D(grid) // find other towers with same frequency
        .filter(({ x: x2, y: y2, value: freq2 }) => !(x1 === x2 && y1 === y2) && freq1 === freq2)
        // calculate the anti-nodes, including harmonics, for each tower pair
        .forEach(({ x: x2, y: y2 }) => {
          let harmonic = includeHarmonics ? 0 : 1; // only include self if looking for harmonics
          do {
            // rise over run babyeeee
            const antiNodeX = x1 + (x1 - x2) * harmonic;
            const antiNodeY = y1 + (y1 - y2) * harmonic;

            if (antiNodeX < 0 || antiNodeX >= grid[0].length || antiNodeY < 0 || antiNodeY >= grid.length) return; // we're out of bounds, give up

            // another anti-node found, add it to the set
            antiNodes.add(`${antiNodeX},${antiNodeY}`);

            // if we're looking for harmonics, we need to keep going until we hit the edge
            harmonic += 1;
          } while (includeHarmonics);
        }),
    );

  return antiNodes.size;
}
