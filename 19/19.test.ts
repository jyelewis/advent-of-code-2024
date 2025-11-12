import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day19 } from "./19";

describe("day19", () => {
  const sampleInput = fs.readFileSync("19/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("19/input.txt").toString("utf-8");

  it("19 sample input", () => {
    const { partA, partB } = day19(sampleInput);
    assert.equal(partA, 6);
    assert.equal(partB, 16);
  });

  it("19 input", () => {
    const { partA, partB } = day19(input);
    assert.equal(partA, 293);
    assert.equal(partB, 623924810770264);
  });
});
