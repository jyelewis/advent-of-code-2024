import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day20a, day20b } from "./20";

describe("day20", () => {
  const sampleInput = fs.readFileSync("20/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("20/input.txt").toString("utf-8");

  it("20a sample input", () => {
    const answer = day20a(sampleInput);
    // TODO: sample answer??
    assert.equal(answer, 0);
  });

  it("20a input", () => {
    const answer = day20a(input);
    assert.equal(answer, 1530);
  });

  it("20b sample input", () => {
    const answer = day20b(sampleInput);
    assert.equal(answer, 0);
  });

  it("20b input", () => {
    console.time("20b");
    const answer = day20b(input);
    assert.equal(answer, 1033983);
    console.timeEnd("20b");
  });
});
