import "../utilities";

export const day11 = (input: string) => ({
  partA: countStones(input, 25),
  partB: countStones(input, 75),
});

export function countStones(input: string, blinks: number) {
  // create & populate a map of stones we have, and how many of each we have
  const stones = new Map<number, number>(); // stone number -> count
  input.split(" ").forEach((stone) => stones.set(parseInt(stone, 10), 1));

  for (let i = 0; i < blinks; i++) {
    for (const [stone, count] of Array.from(stones.entries())) {
      // process this stone, and add the newly created stones to our map
      processStone(stone).forEach((newStone) => stones.inc(newStone, count));

      // we've now processed this stone (x count), so we can remove it
      stones.dec(stone, count);
    }
  }

  return Array.from(stones.values()).sum();
}

function processStone(stone: number): number[] {
  if (stone === 0) return [1];

  const stoneDigits = stone.toString(10);
  if (stoneDigits.length % 2 === 0) {
    return [stoneDigits.substring(0, stoneDigits.length / 2), stoneDigits.substring(stoneDigits.length / 2)].map(
      Number,
    );
  }

  return [stone * 2024];
}
