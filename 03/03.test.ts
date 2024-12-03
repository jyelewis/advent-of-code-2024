import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day03a, day03b } from "./03";

describe("day03", () => {
  const sampleInput = fs.readFileSync("03/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("03/input.txt").toString("utf-8");

  it("02a sample input", () => {
    const answer = day03a(sampleInput);
    assert.equal(answer, 161);
  });

  it("02a input", () => {
    const answer = day03a(input);
    assert.equal(answer, 170778545);
  });

  it("02b sample input", () => {
    const answer = day03b(sampleInput);
    assert.equal(answer, 48);
  });

  it("02b input", () => {
    const answer = day03b(input);
    assert.equal(answer, 82868252);
  });
});
