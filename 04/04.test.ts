import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day04a, day04b } from "./04";
import { day04a_compact } from "./04-compact";
// @ts-ignore
import { day04a as day04a_min } from "./04-min.js";

describe("day04", () => {
  const sampleInput = fs.readFileSync("04/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("04/input.txt").toString("utf-8");

  it("04a sample input", () => {
    const answer = day04a(sampleInput);
    assert.equal(answer, 18);
  });

  it("04a input", () => {
    const answer = day04a(input);
    assert.equal(answer, 2447);
  });

  it("04b sample input", () => {
    const answer = day04b(sampleInput);
    assert.equal(answer, 9);
  });

  it("04b input", () => {
    const answer = day04b(input);
    assert.equal(answer, 1868);
  });

  it("04a_compact sample input", () => {
    const answer = day04a_compact(sampleInput);
    assert.equal(answer, 18);
  });

  it("04a_compact input", () => {
    const answer = day04a_compact(input);
    assert.equal(answer, 2447);
  });

  it("04a_min sample input", () => {
    const answer = day04a_min(sampleInput);
    assert.equal(answer, 18);
  });

  it("04a_min input", () => {
    const answer = day04a_min(input);
    assert.equal(answer, 2447);
  });
});
