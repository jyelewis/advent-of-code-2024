import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day12, Region, sidesForRegion } from "./12";
import { Position } from "../utilities";

describe("day12", () => {
  const sampleInput = fs.readFileSync("12/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("12/input.txt").toString("utf-8");

  it("12 sample input", () => {
    const { partA, partB } = day12(sampleInput);
    assert.equal(partA, 1930);
    assert.equal(partB, 1206);
  });

  it("12 input", () => {
    const { partA, partB } = day12(input);
    assert.equal(partA, 1396298);
    assert.equal(partB, 853588);
  });

  describe("sidesForRegion", () => {
    it("I", () => {
      const region: Region = {
        plantType: "I",
        cells: [new Position(4, 0), new Position(5, 0), new Position(5, 1), new Position(4, 1)],
      };

      const sides = sidesForRegion(region);
      assert.deepEqual(sides, 4);
    });

    it("C", () => {
      const region: Region = { plantType: "C", cells: [new Position(7, 4)] };

      const sides = sidesForRegion(region);
      assert.equal(sides, 4);
    });
  });
});
