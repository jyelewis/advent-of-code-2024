import { Position, Grid } from "../utilities";

export function day08(input: string) {
  const grid = Grid.fromString(input);

  return {
    partA: countAntiNodes(grid, false),
    partB: countAntiNodes(grid, true),
  };
}

function countAntiNodes(grid: Grid<string>, includeHarmonics: boolean) {
  const antiNodes = new Set<string>();

  grid.positions
    .filter(({ value }) => value !== ".") // remove empty spaces
    .forEach(({ x: x1, y: y1, value: freq1 }) =>
      grid.positions // find other towers with same frequency
        .filter(({ x: x2, y: y2, value: freq2 }) => !(x1 === x2 && y1 === y2) && freq1 === freq2)
        // calculate the anti-nodes, including harmonics, for each tower pair
        .forEach(({ x: x2, y: y2 }) => {
          let harmonic = includeHarmonics ? 0 : 1; // only include self if looking for harmonics
          do {
            // rise over run babyeeee
            const antiNode = new Position(x1 + (x1 - x2) * harmonic, y1 + (y1 - y2) * harmonic);

            if (!grid.isInBounds(antiNode)) return;

            // another anti-node found, add it to the set
            antiNodes.add(antiNode.key);

            // if we're looking for harmonics, we need to keep going until we hit the edge
            harmonic += 1;
          } while (includeHarmonics);
        }),
    );

  return antiNodes.size;
}
