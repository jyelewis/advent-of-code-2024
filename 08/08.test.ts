import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day08 } from "./08";

describe("day08", () => {
  const sampleInput = fs.readFileSync("08/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("08/input.txt").toString("utf-8");

  it("08 sample input", () => {
    const { partA, partB } = day08(sampleInput);
    assert.equal(partA, 14);
    assert.equal(partB, 34);
  });

  it("08 input", () => {
    const { partA, partB } = day08(input);
    assert.equal(partA, 320);
    assert.equal(partB, 1157);
  });
});
