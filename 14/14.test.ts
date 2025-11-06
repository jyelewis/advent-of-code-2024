import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day14a, day14b } from "./14";

describe("day14", () => {
  const sampleInput = fs.readFileSync("14/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("14/input.txt").toString("utf-8");

  it("14a sample input", () => {
    const answer = day14a(sampleInput);
    assert.equal(answer, 12);
  });

  it("14a input", () => {
    const answer = day14a(input);
    assert.equal(answer, 214109808);
  });

  it("14b sample input", () => {
    const answer = day14b(sampleInput);
    assert.equal(answer, 123);
  });

  it("14b input", () => {
    const answer = day14b(input);
    assert.equal(answer, 123);
  });
});
