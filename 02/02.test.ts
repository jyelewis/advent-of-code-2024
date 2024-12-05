import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day02a, day02b } from "./02";
import { day02a_compact, day02b_compact } from "./02-compact";

describe("day02", () => {
  const sampleInput = fs.readFileSync("02/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("02/input.txt").toString("utf-8");

  it("02a sample input", () => {
    const answer = day02a(sampleInput);
    assert.equal(answer, 2);
  });

  it("02a input", () => {
    const answer = day02a(input);
    assert.equal(answer, 332);
  });

  it("02b sample input", () => {
    const answer = day02b(sampleInput);
    assert.equal(answer, 4);
  });

  it("02b input", () => {
    const answer = day02b(input);
    assert.equal(answer, 398);
  });

  it("02a_compact sample input", () => {
    const answer = day02a_compact(sampleInput);
    assert.equal(answer, 2);
  });

  it("02a_compact input", () => {
    const answer = day02a_compact(input);
    assert.equal(answer, 332);
  });

  it("02b_compact sample input", () => {
    const answer = day02b_compact(sampleInput);
    assert.equal(answer, 4);
  });

  it("02b_compact input", () => {
    const answer = day02b_compact(input);
    assert.equal(answer, 398);
  });
});
