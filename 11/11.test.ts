import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day11 } from "./11";

describe("day11", () => {
  const sampleInput = fs.readFileSync("11/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("11/input.txt").toString("utf-8");

  it("11a sample input", () => {
    const { partA, partB } = day11(sampleInput);
    assert.equal(partA, 55312);
    assert.equal(partB, 65601038650482);
  });

  it("11a input", () => {
    const { partA, partB } = day11(input);
    assert.equal(partA, 189167);
    assert.equal(partB, 225253278506288);
  });
});
