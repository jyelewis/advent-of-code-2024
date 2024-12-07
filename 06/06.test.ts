import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day06 } from "./06";
import { day06_fast } from "./06-fast";

describe("day06", () => {
  const sampleInput = fs.readFileSync("06/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("06/input.txt").toString("utf-8");

  it("06 sample input", () => {
    const { partA, partB } = day06(sampleInput);
    assert.equal(partA, 41);
    assert.equal(partB, 6);
  });

  it.skip("06 input", () => {
    const { partA, partB } = day06(input);
    assert.equal(partA, 4752);
    assert.equal(partB, 1719);
  });

  it("06_fast sample input", () => {
    const { partA, partB } = day06_fast(sampleInput);

    assert.equal(partA, 41);
    assert.equal(partB, 6);
  });

  it("06_fast input", () => {
    const { partA, partB } = day06_fast(input);

    assert.equal(partA, 4752);
    assert.equal(partB, 1719);
  });
});
