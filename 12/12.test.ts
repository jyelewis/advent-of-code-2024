import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day12a, day12b } from "./12";

describe("day12", () => {
  const sampleInput = fs.readFileSync("12/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("12/input.txt").toString("utf-8");

  it("12a sample input", () => {
    const answer = day12a(sampleInput);
    assert.equal(answer, 1930);
  });

  it("12a input", () => {
    const answer = day12a(input);
    assert.equal(answer, 1396298);
  });

  it("12b sample input", () => {
    const answer = day12b(sampleInput);
    assert.equal(answer, 123);
  });

  it("12b input", () => {
    const answer = day12b(input);
    assert.equal(answer, 123);
  });
});
