import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day03a, day03b } from "./03";
import { day03a_compact, day03b_compact } from "./03-compact";

describe("day03", () => {
  const sampleInput = fs.readFileSync("03/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("03/input.txt").toString("utf-8");

  it("03a sample input", () => {
    const answer = day03a(sampleInput);
    assert.equal(answer, 161);
  });

  it("03a input", () => {
    const answer = day03a(input);
    assert.equal(answer, 170778545);
  });

  it("03b sample input", () => {
    const answer = day03b(sampleInput);
    assert.equal(answer, 48);
  });

  it("03b input", () => {
    const answer = day03b(input);
    assert.equal(answer, 82868252);
  });

  it("03a_compact sample input", () => {
    const answer = day03a_compact(sampleInput);
    assert.equal(answer, 161);
  });

  it("03a_compact input", () => {
    const answer = day03a_compact(input);
    assert.equal(answer, 170778545);
  });

  it("03b_compact sample input", () => {
    const answer = day03b_compact(sampleInput);
    assert.equal(answer, 48);
  });

  it("03b_compact input", () => {
    const answer = day03b_compact(input);
    assert.equal(answer, 82868252);
  });
});
