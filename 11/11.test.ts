import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day11a, day11b } from "./11";

describe("day11", () => {
  const sampleInput = fs.readFileSync("11/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("11/input.txt").toString("utf-8");

  it("11a sample input", () => {
    const answer = day11a(sampleInput);
    assert.equal(answer, 55312);
  });

  it("11a input", () => {
    const answer = day11a(input);
    assert.equal(answer, 189167);
  });

  it("11b sample input", () => {
    const answer = day11b(sampleInput);
    assert.equal(answer, 65601038650482);
  });

  it("11b input", () => {
    const answer = day11b(input);
    assert.equal(answer, 225253278506288);
  });
});
