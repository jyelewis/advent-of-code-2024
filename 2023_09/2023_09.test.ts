import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day2023_09a, day2023_09b } from "./2023_09";

describe("day2023_09", () => {
  const sampleInput = fs.readFileSync("2023_09/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("2023_09/input.txt").toString("utf-8");

  it("day2023_09a sample input", () => {
    const answer = day2023_09a(sampleInput);
    assert.equal(answer, 114);
  });

  it("day2023_09a input", () => {
    const answer = day2023_09a(input);
    assert.equal(answer, 1953784198);
  });

  it("day2023_09b sample input", () => {
    const answer = day2023_09b(sampleInput);
    assert.equal(answer, 2);
  });

  it("day2023_09b input", () => {
    const answer = day2023_09b(input);
    assert.equal(answer, 957);
  });
});
