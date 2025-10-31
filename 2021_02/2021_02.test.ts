import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day2021_02a, day2021_02b } from "./2021_02";

describe("day2021_02", () => {
  const sampleInput = fs.readFileSync("2021_02/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("2021_02/input.txt").toString("utf-8");

  it("2021_02a sample input", () => {
    const answer = day2021_02a(sampleInput);
    assert.equal(answer, 150);
  });

  it("2021_02a input", () => {
    const answer = day2021_02a(input);
    assert.equal(answer, 1427868);
  });

  it("2021_02b sample input", () => {
    const answer = day2021_02b(sampleInput);
    assert.equal(answer, 900);
  });

  it("2021_02b input", () => {
    const answer = day2021_02b(input);
    assert.equal(answer, 1568138742);
  });
});
