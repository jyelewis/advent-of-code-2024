import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day18a, day18b } from "./18";

describe("day18", () => {
  const sampleInput = fs.readFileSync("18/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("18/input.txt").toString("utf-8");

  it("18a sample input", () => {
    const answer = day18a(sampleInput, true);
    assert.equal(answer, 22);
  });

  it("18a input", () => {
    const answer = day18a(input);
    assert.equal(answer, 308);
  });

  it("18b sample input", () => {
    const answer = day18b(sampleInput, true);
    assert.equal(answer, "6,1");
  });

  it("18b input", () => {
    const answer = day18b(input);
    assert.equal(answer, "46,28");
  });
});
