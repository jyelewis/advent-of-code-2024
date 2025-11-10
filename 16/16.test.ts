import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day16 } from "./16";

describe("day16", () => {
  const sampleInput = fs.readFileSync("16/example-input.txt").toString("utf-8");
  const sampleInput2 = fs.readFileSync("16/example-input-2.txt").toString("utf-8");
  const input = fs.readFileSync("16/input.txt").toString("utf-8");

  it("16 sample input", () => {
    const { partA, partB } = day16(sampleInput);
    assert.equal(partA, 7036);
    assert.equal(partB, 45);
  });

  it("16 sample input 2", () => {
    const { partA, partB } = day16(sampleInput2);
    assert.equal(partA, 11048);
    assert.equal(partB, 64);
  });

  it("16 input", () => {
    const { partA, partB } = day16(input);
    assert.equal(partA, 83432);
    assert.equal(partB, 467);
  });
});
