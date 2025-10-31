import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day2021_04a, day2021_04b } from "./2021_04";

describe("day2021_04", () => {
  const sampleInput = fs.readFileSync("2021_04/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("2021_04/input.txt").toString("utf-8");

  it("2021_04a sample input", () => {
    const answer = day2021_04a(sampleInput);
    assert.equal(answer, 4512);
  });

  it("2021_04a input", () => {
    const answer = day2021_04a(input);
    assert.equal(answer, 21607);
  });

  it("2021_04b sample input", () => {
    const answer = day2021_04b(sampleInput);
    assert.equal(answer, 1924);
  });

  it("2021_04b input", () => {
    const answer = day2021_04b(input);
    assert.equal(answer, 19012);
  });
});
