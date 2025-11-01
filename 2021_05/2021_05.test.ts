import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day2021 } from "./2021_05";

describe("day2021_05", () => {
  const sampleInput = fs.readFileSync("2021_05/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("2021_05/input.txt").toString("utf-8");

  it("2021 sample input", () => {
    const { partA, partB } = day2021(sampleInput);
    assert.equal(partA, 5);
    assert.equal(partB, 12);
  });

  it("2021 input", () => {
    const { partA, partB } = day2021(input);
    assert.equal(partA, 5690);
    assert.equal(partB, 17741);
  });
});
