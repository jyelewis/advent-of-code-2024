import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day2021_03a, day2021_03b } from "./2021_03";

describe("day2021_03", () => {
  const sampleInput = fs.readFileSync("2021_03/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("2021_03/input.txt").toString("utf-8");

  it("2021_03a sample input", () => {
    const answer = day2021_03a(sampleInput);
    assert.equal(answer, 198);
  });

  it("2021_03a input", () => {
    const answer = day2021_03a(input);
    assert.equal(answer, 852500);
  });

  it("2021_03b sample input", () => {
    const answer = day2021_03b(sampleInput);
    assert.equal(answer, 230);
  });

  it("2021_03b input", () => {
    const answer = day2021_03b(input);
    assert.equal(answer, 1007985);
  });
});
