import "../utilities";
import { range, sscanf } from "../utilities";
import assert from "node:assert";

export function day14a(input: string) {
  const robots = input
    .split("\n")
    .map(sscanf`p=${Number},${Number} v=${Number},${Number}`)
    .map(([px, py, vx, vy]) => ({ px, py, vx, vy }));

  const gridMaxX = Math.max(...robots.map((r) => r.px));
  const gridMaxY = Math.max(...robots.map((r) => r.py));

  assert(gridMaxX % 2 === 0);
  assert(gridMaxY % 2 === 0);

  const printRobots = () => {
    for (const y of range(0, gridMaxY)) {
      const line = range(0, gridMaxX)
        .map((x) => {
          const numRobotsHere = robots.count((r) => r.px === x && r.py === y);
          return numRobotsHere === 0 ? "." : numRobotsHere;
        })
        .join("");

      console.log(line);
    }
  };

  const tickRobot = (robot: (typeof robots)[0]) => {
    robot.px = (robot.px + robot.vx) % (gridMaxX + 1);
    robot.py = (robot.py + robot.vy) % (gridMaxY + 1);

    // TODO: better wrapping
    if (robot.px < 0) {
      robot.px = gridMaxX + robot.px + 1;
    }
    if (robot.py < 0) {
      robot.py = gridMaxY + robot.py + 1;
    }

    assert(robot.px >= 0);
    assert(robot.py >= 0);
    assert(robot.px <= gridMaxX);
    assert(robot.py <= gridMaxY);
  };

  for (const second of range(1, 100)) {
    for (const robot of robots) {
      tickRobot(robot);
    }
  }

  const horzMidLine = gridMaxY / 2;
  const vertMidLine = gridMaxX / 2;

  const robotsPerQuad = [0, 0, 0, 0];
  for (const robot of robots) {
    const isTop = robot.py < horzMidLine;
    const isBottom = robot.py > horzMidLine;
    const isLeft = robot.px < vertMidLine;
    const isRight = robot.px > vertMidLine;

    if (isTop && isLeft) {
      robotsPerQuad[0] += 1;
    }
    if (isTop && isRight) {
      robotsPerQuad[1] += 1;
    }
    if (isBottom && isLeft) {
      robotsPerQuad[2] += 1;
    }
    if (isBottom && isRight) {
      robotsPerQuad[3] += 1;
    }
  }

  const safetyFactor = robotsPerQuad.reduce((a, b) => a * b);
  return safetyFactor;
}

export function day14b(input: string) {
  const robots = input
    .split("\n")
    .map(sscanf`p=${Number},${Number} v=${Number},${Number}`)
    .map(([px, py, vx, vy]) => ({ px, py, vx, vy }));

  const gridMaxX = Math.max(...robots.map((r) => r.px));
  const gridMaxY = Math.max(...robots.map((r) => r.py));

  assert(gridMaxX % 2 === 0);
  assert(gridMaxY % 2 === 0);

  // const printRobots = () => {
  //   for (const y of range(0, gridMaxY)) {
  //     const line = range(0, gridMaxX)
  //       .map((x) => {
  //         const numRobotsHere = robots.count((r) => r.px === x && r.py === y);
  //         return numRobotsHere === 0 ? "." : numRobotsHere;
  //       })
  //       .join("");
  //
  //     console.log(line);
  //   }
  // };

  const tickRobot = (robot: (typeof robots)[0]) => {
    robot.px = (robot.px + robot.vx) % (gridMaxX + 1);
    robot.py = (robot.py + robot.vy) % (gridMaxY + 1);

    // TODO: better wrapping
    if (robot.px < 0) {
      robot.px = gridMaxX + robot.px + 1;
    }
    if (robot.py < 0) {
      robot.py = gridMaxY + robot.py + 1;
    }

    assert(robot.px >= 0);
    assert(robot.py >= 0);
    assert(robot.px <= gridMaxX);
    assert(robot.py <= gridMaxY);
  };

  const isTree = () => {
    // expect a straight line at
    // x = 32 ; y = 38 - 70
    return range(38, 70).every((y) => robots.some((r) => r.px === 32 && r.py === y));
  };

  let second = 1;
  while (true) {
    for (const robot of robots) {
      tickRobot(robot);
    }

    if (isTree()) {
      console.log(`Found tree after ${second} seconds`);
      return second;
    }

    second += 1;
  }
}
