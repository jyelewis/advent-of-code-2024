import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day01a, day01b } from "./01";
import { day01_compact } from "./01-compact";

describe("day01", () => {
  const sampleInput = fs.readFileSync("01/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("01/input.txt").toString("utf-8");

  it("01a sample input", () => {
    const answer = day01a(sampleInput);
    assert.equal(answer, 11);
  });

  it("01a input", () => {
    const answer = day01a(input);
    assert.equal(answer, 3714264);
  });

  it("01b sample input", () => {
    const answer = day01b(sampleInput);
    assert.equal(answer, 31);
  });

  it("01b input", () => {
    const answer = day01b(input);
    assert.equal(answer, 18805872);
  });

  it("01_compact sample input", () => {
    const { partA, partB } = day01_compact(sampleInput);
    assert.equal(partA, 11);
    assert.equal(partB, 31);
  });

  it("01_compact input", () => {
    const { partA, partB } = day01_compact(input);
    assert.equal(partA, 3714264);
    assert.equal(partB, 18805872);
  });
});
