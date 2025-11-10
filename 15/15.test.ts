import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day15a, day15b } from "./15";

describe("day15", () => {
  const sampleInput = fs.readFileSync("15/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("15/input.txt").toString("utf-8");

  it("15a sample input", () => {
    const answer = day15a(sampleInput);
    assert.equal(answer, 10092);
  });

  it("15a input", () => {
    const answer = day15a(input);
    assert.equal(answer, 1398947);
  });

  it("15b sample input", () => {
    const answer = day15b(sampleInput);
    assert.equal(answer, 9021);
  });

  it("15b input", () => {
    const answer = day15b(input);
    assert.equal(answer, 1397393);
  });
});
