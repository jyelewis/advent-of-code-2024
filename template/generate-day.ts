import fs from "fs";
import { exec } from "node:child_process";
import assert from "node:assert";

export async function main() {
  assert(process.env.AOC_SESSION_TOKEN, "AOC_SESSION_TOKEN is required");

  const dayNum = parseInt(process.argv[2], 10);
  const dayString = dayNum.toString().padStart(2, "0");
  console.log("Generating day", dayString);

  const source = fs.readFileSync("template/00.ts").toString("utf-8").replaceAll("00", dayString);
  const testSource = fs
    .readFileSync("template/00.test.ts")
    .toString("utf-8")
    .replaceAll("00", dayString)
    .replaceAll("template", dayString);

  fs.mkdirSync(dayString);
  fs.writeFileSync(`${dayString}/${dayString}.ts`, source);
  fs.writeFileSync(`${dayString}/${dayString}.test.ts`, testSource);

  fs.writeFileSync(`${dayString}/example-input.txt`, "");

  const input = await fetch(`https://adventofcode.com/2024/day/${dayNum}/input`, {
    headers: {
      Cookie: `session=${process.env.AOC_SESSION_TOKEN}`,
    },
  });
  fs.writeFileSync(`${dayString}/input.txt`, await input.text());

  // open files in editor
  exec(`idea ${dayString}/${dayString}.ts`);
  exec(`idea ${dayString}/${dayString}.test.ts`);
  exec(`idea ${dayString}/input.txt`);
  exec(`idea ${dayString}/example-input.txt`);

  console.log("Generated day", dayString);
}

main().catch(console.error);
