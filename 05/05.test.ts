import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day05a, day05b } from "./05";

describe("day05", () => {
  const sampleInput = fs.readFileSync("05/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("05/input.txt").toString("utf-8");

  it("05a sample input", () => {
    const answer = day05a(sampleInput);
    assert.equal(answer, 143);
  });

  it("05a input", () => {
    const answer = day05a(input);
    assert.equal(answer, 5248);
  });

  it("05b sample input", () => {
    const answer = day05b(sampleInput);
    assert.equal(answer, 123);
  });

  it("05b input", () => {
    const answer = day05b(input);
    assert.equal(answer, 4507);
  });
});
