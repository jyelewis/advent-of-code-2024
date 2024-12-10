import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day10 } from "./10";

describe("day10", () => {
  const sampleInput = fs.readFileSync("10/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("10/input.txt").toString("utf-8");

  it("10 sample input", () => {
    const { partA, partB } = day10(sampleInput);
    assert.equal(partA, 36);
    assert.equal(partB, 81);
  });

  it("10 input", () => {
    const { partA, partB } = day10(input);
    assert.equal(partA, 512);
    assert.equal(partB, 1045);
  });
});
