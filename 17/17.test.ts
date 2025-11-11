import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day17a, day17b } from "./17";

describe("day17", () => {
  const sampleInput = fs.readFileSync("17/example-input.txt").toString("utf-8");
  const sampleInputB = fs.readFileSync("17/example-input-b.txt").toString("utf-8");
  const input = fs.readFileSync("17/input.txt").toString("utf-8");

  it("17a sample input", () => {
    const answer = day17a(sampleInput);
    assert.equal(answer, "4,6,3,5,6,3,5,2,1,0");
  });

  it("17a input", () => {
    const answer = day17a(input);
    assert.equal(answer, "4,3,2,6,4,5,3,2,4");
  });

  it("17b sample input b", () => {
    const answer = day17b(sampleInputB);
    assert.equal(answer, 117440);
  });

  it("17b input", () => {
    const answer = day17b(input);
    assert.equal(answer, 164540892147389);
  });
});
