import { describe, it } from "node:test";
import fs from "fs";
import assert from "node:assert";
import { day2022_25, decToSnaffu, snaffuToDec } from "./2022_25";

describe("day2022_25", () => {
  const sampleInput = fs.readFileSync("2022_25/example-input.txt").toString("utf-8");
  const input = fs.readFileSync("2022_25/input.txt").toString("utf-8");

  it("day2022_25 sample input", () => {
    const answer = day2022_25(sampleInput);
    assert.equal(answer, "2=-1=0");
  });

  it("day2022_25 input", () => {
    const answer = day2022_25(input);
    assert.equal(answer, "20=2-02-0---02=22=21");
  });

  it("converts many nums", () => {
    for (let i = 0; i < 1000; i++) {
      const snaffu = decToSnaffu(i);
      const dec = snaffuToDec(snaffu);
      assert.equal(dec, i, `Failed at i=${i}: snaffu: '${snaffu}', dec=${dec}`);
    }
  });

  it("Dud case", () => {
    assert.equal(decToSnaffu(13), "1==");
  });

  it("snaffuToDec", () => {
    assert.equal(snaffuToDec("1=="), 13);

    assert.equal(snaffuToDec("1"), 1);
    assert.equal(snaffuToDec("2"), 2);
    assert.equal(snaffuToDec("1="), 3);
    assert.equal(snaffuToDec("1-"), 4);
    assert.equal(snaffuToDec("10"), 5);
    assert.equal(snaffuToDec("11"), 6);
    assert.equal(snaffuToDec("12"), 7);
    assert.equal(snaffuToDec("2="), 8);
    assert.equal(snaffuToDec("2-"), 9);
    assert.equal(snaffuToDec("20"), 10);
    assert.equal(snaffuToDec("1=0"), 15);
    assert.equal(snaffuToDec("1-0"), 20);
    assert.equal(snaffuToDec("1=11-2"), 2022);
    assert.equal(snaffuToDec("1-0---0"), 12345);
    assert.equal(snaffuToDec("1121-1110-1=0"), 314159265);
  });

  it("decToSnaffu", () => {
    assert.equal(decToSnaffu(1), "1");
    assert.equal(decToSnaffu(2), "2");
    assert.equal(decToSnaffu(3), "1=");
    assert.equal(decToSnaffu(4), "1-");
    assert.equal(decToSnaffu(5), "10");
    assert.equal(decToSnaffu(6), "11");
    assert.equal(decToSnaffu(7), "12");
    assert.equal(decToSnaffu(8), "2=");
    assert.equal(decToSnaffu(9), "2-");
    assert.equal(decToSnaffu(10), "20");
    assert.equal(decToSnaffu(15), "1=0");
    assert.equal(decToSnaffu(20), "1-0");
    assert.equal(decToSnaffu(2022), "1=11-2");
    assert.equal(decToSnaffu(12345), "1-0---0");
    assert.equal(decToSnaffu(314159265), "1121-1110-1=0");
  });
});
