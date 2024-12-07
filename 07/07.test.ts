import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day07 } from "./07";

describe("day07", () => {
  const sampleInput = fs.readFileSync("07/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("07/input.txt").toString("utf-8");

  it("07 sample input", () => {
    const { partA, partB } = day07(sampleInput);
    assert.equal(partA, 3749);
    assert.equal(partB, 11387);
  });

  it("07 input", () => {
    const { partA, partB } = day07(input);
    assert.equal(partA, 14711933466277);
    assert.equal(partB, 286580387663654);
  });
});
