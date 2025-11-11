import { range } from "../utilities";
import assert from "node:assert";

export function day2021_03a(input: string) {
  const binaryNumbers = input.lines();

  const gammaBits = [];
  const epsilonBits = [];

  for (const bitIndex of range(binaryNumbers[0].length)) {
    const onesCount = binaryNumbers.count((x) => x.charAt(bitIndex) === "1");
    const zerosCount = binaryNumbers.length - onesCount;

    gammaBits.push(onesCount > zerosCount ? 1 : 0);
    epsilonBits.push(onesCount > zerosCount ? 0 : 1);
  }

  const gamma = parseInt(gammaBits.join(""), 2);
  const epsilon = parseInt(epsilonBits.join(""), 2);

  return gamma * epsilon;
}

export function day2021_03b(input: string) {
  const binaryNumbers = input.lines();

  const oxygenGeneratorRating = extractEquipmentRating(binaryNumbers, "MOST_COMMON_BIT");
  const co2ScrubberRating = extractEquipmentRating(binaryNumbers, "LEAST_COMMON_BIT");

  return oxygenGeneratorRating * co2ScrubberRating;
}

function extractEquipmentRating(binaryNumbers: string[], mode: "MOST_COMMON_BIT" | "LEAST_COMMON_BIT") {
  assert(binaryNumbers.length > 0);

  for (let bitIndex = 0; bitIndex < binaryNumbers[0].length; bitIndex++) {
    const onesCount = binaryNumbers.count((x) => x.charAt(bitIndex) === "1");
    const zerosCount = binaryNumbers.length - onesCount;

    const leastCommonBit = onesCount >= zerosCount ? "0" : "1";
    const mostCommonBit = onesCount >= zerosCount ? "1" : "0";

    const requiredBitToProceed = mode === "MOST_COMMON_BIT" ? mostCommonBit : leastCommonBit;
    binaryNumbers = binaryNumbers.filter((x) => x.charAt(bitIndex) === requiredBitToProceed);

    if (binaryNumbers.length === 1) {
      return parseInt(binaryNumbers[0], 2);
    }
  }

  assert(false);
}
