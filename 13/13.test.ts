import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day13a, day13b } from "./13";

describe("day13", () => {
  const sampleInput = fs.readFileSync("13/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("13/input.txt").toString("utf-8");

  it("13a sample input", () => {
    const answer = day13a(sampleInput);
    assert.equal(answer, 480);
  });

  it("13a input", () => {
    const answer = day13a(input);
    assert.equal(answer, 27105);
  });

  it("13b sample input", () => {
    const answer = day13b(sampleInput);
    assert.equal(answer, 875318608908);
  });

  it("13b input", () => {
    const answer = day13b(input);
    assert.equal(answer, 101726882250942);
  });
});
