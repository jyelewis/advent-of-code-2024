import { describe, it } from "node:test";
import assert from "node:assert";
import { parse } from "./parse";

describe("parse", () => {
  it("Number_Number", () => {
    const result = parse`${Number}_${Number}`("123_456");
    assert.deepEqual(result, [123, 456]);
  });

  it("Number_String", () => {
    const result = parse`${Number}_${String}`("123_abcd");
    assert.deepEqual(result, [123, "abcd"]);
  });

  it("String-String", () => {
    const result = parse`${String}-${String}`("hello-world");
    assert.deepEqual(result, ["hello", "world"]);
  });

  it("Person details", () => {
    const result = parse`Name: ${String}; age: ${Number}; height: ${Number}cm`("Name: Buster; age: 39; height: 184cm");
    assert.deepEqual(result, ["Buster", 39, 184]);
  });
});
