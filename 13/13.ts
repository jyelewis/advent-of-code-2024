import { sscanf } from "../utilities";
import assert from "node:assert";

export function day13a(input: string) {
  return input
    .split("\n\n")
    .map((machineStr) =>
      sscanf`Button A: X+${Number}, Y+${Number}
Button B: X+${Number}, Y+${Number}
Prize: X=${Number}, Y=${Number}`(machineStr),
    )
    .map(([ax, ay, bx, by, prizeX, prizeY]) => {
      // compute the min token cost of winning this machine
      // start by assuming we press button A as many times as possible, and make the difference up with B
      // then migrate towards pressing B more times instead

      let aPresses = 0;
      let minCredits = Infinity;

      while (true) {
        let x = 0;
        let y = 0;

        // perform our 'a' presses first
        x += ax * aPresses;
        y += ay * aPresses;

        if (x > prizeX || y > prizeY) {
          // we've gone past the prize with just a presses, we've searched the entire space
          break;
        }

        const bPressesForX = (prizeX - x) / bx;
        const bPressesForY = (prizeY - y) / by;

        // same number of presses to land both x & y
        // and an exact int number of presses
        const canMakeIt = bPressesForX === bPressesForY && bPressesForX === Math.floor(bPressesForX);
        if (canMakeIt) {
          // yay we've found an option
          const creditsUsed = aPresses * 3 + bPressesForX;
          minCredits = Math.min(minCredits, creditsUsed);
        }

        // lets continue to look for options until we've exhausted all combos
        aPresses += 1;
      }

      if (minCredits === Infinity) {
        return 0;
      }

      return minCredits;
    })
    .sum();
}

export function day13b(input: string) {
  return input
    .split("\n\n")
    .map((machineStr) =>
      sscanf`Button A: X+${Number}, Y+${Number}
Button B: X+${Number}, Y+${Number}
Prize: X=${Number}, Y=${Number}`(machineStr),
    )
    .map(([ax, ay, bx, by, x, y]) => {
      x += 10000000000000;
      y += 10000000000000;

      // ax * aPresses + bx * bPresses = X
      // ay * aPresses + by * bPresses = Y
      // Δ = ax * by - bx * ay
      const determinant = ax * by - bx * ay;
      assert(determinant !== 0, "degen case");

      // Cramer's Rule
      const aPresses = (x * by - bx * y) / determinant;
      const bPresses = (ax * y - x * ay) / determinant;

      if (aPresses < 0 || bPresses < 0 || aPresses !== Math.floor(aPresses) || bPresses !== Math.floor(bPresses)) {
        // we need integer values, or the solution is not valid (can't half press a button)
        return 0;
      }

      return aPresses * 3 + bPresses;
    })
    .sum();
}
