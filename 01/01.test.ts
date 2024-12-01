import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day01a, day01b } from "./01";

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
});
