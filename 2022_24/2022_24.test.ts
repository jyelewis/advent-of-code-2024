import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day2022 } from "./2022_24";

describe("day2022_24", () => {
  const sampleInput = fs.readFileSync("2022_24/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("2022_24/input.txt").toString("utf-8");

  it("2022_24 sample input", () => {
    const { partA, partB } = day2022(sampleInput);
    assert.equal(partA, 18);
    assert.equal(partB, 54);
  });

  it("2022_24 input", () => {
    const { partA, partB } = day2022(input);
    assert.equal(partA, 373);
    assert.equal(partB, 997);
  });
});
