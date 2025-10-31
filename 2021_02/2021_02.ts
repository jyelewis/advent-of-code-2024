import "../utilities";
import { parse } from "../utilities/parse";

export function day2021_02a(input: string) {
  let horzPosition = 0;
  let depth = 0;

  input.split("\n").forEach((line) => {
    const [command, value] = parse`${String} ${Number}`(line);

    switch (command) {
      case "forward":
        horzPosition += value;
        break;
      case "down":
        depth += value;
        break;
      case "up":
        depth -= value;
        break;
    }
  });

  return horzPosition * depth;
}

export function day2021_02b(input: string) {
  let horzPosition = 0;
  let depth = 0;
  let aim = 0;

  input.split("\n").forEach((line) => {
    const [command, value] = parse`${String} ${Number}`(line);

    switch (command) {
      case "forward":
        horzPosition += value;
        depth += aim * value;
        break;
      case "down":
        aim += value;
        break;
      case "up":
        aim -= value;
        break;
    }
  });

  return horzPosition * depth;
}
