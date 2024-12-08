import "../utilities";
import { range2D } from "../utilities";

export function day08(input: string) {
  const grid = input.split("\n").map((line) => line.split(""));

  return {
    partA: countAntinodes(grid, false),
    partB: countAntinodes(grid, true),
  };
}

function countAntinodes(grid: string[][], includeHarmonics: boolean) {
  const antinodes = new Set<string>(); // x,y

  range2D(grid).forEach(({ x: x1, y: y1 }) => {
    // find antinodes surounding this node
    const node = grid[y1][x1];
    if (node === ".") return;

    range2D(grid)
      // find pair nodes, excluding the current node
      .filter(({ x: x2, y: y2 }) => (x1 !== x2 || y1 !== y2) && grid[y2][x2] === node)
      // calculate the antinodes, including harmonics
      .forEach(({ x: x2, y: y2 }) => {
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);

        let i = includeHarmonics ? 0 : 1;
        do {
          // check for harmonics
          const antiNodeX = x1 > x2 ? x1 + dx * i : x1 - dx * i;
          const antiNodeY = y1 > y2 ? y1 + dy * i : y1 - dy * i;

          // we're out of bounds, give up
          if (antiNodeX < 0 || antiNodeX >= grid[0].length || antiNodeY < 0 || antiNodeY >= grid.length) return;

          antinodes.add(`${antiNodeX},${antiNodeY}`);

          // if we're looking for harmonics, we need to keep going until we hit the edge
          i++;
        } while (includeHarmonics);
      });
  });

  return antinodes.size;
}
