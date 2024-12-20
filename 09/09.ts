import "../utilities";

// pretty gross, but its fast
export function day09a(input: string) {
  const expanded = input
    .split("")
    .map((c) => parseInt(c, 10))
    .flatMap((size, i) => {
      const isFreeSpace = i % 2 === 1;
      const fileId = i / 2;
      return new Array(size).fill(isFreeSpace ? "." : fileId);
    });

  let firstFreeSpaceIndex = expanded.findIndex((c) => c === ".");
  let lastBlockIndex = expanded.findLastIndex((c) => c !== ".");

  while (true) {
    if (firstFreeSpaceIndex > lastBlockIndex) {
      // we're done!
      break;
    }

    // move block into free space on the left
    expanded[firstFreeSpaceIndex] = expanded[lastBlockIndex];
    expanded[lastBlockIndex] = ".";

    // look for the next free space
    while (expanded[firstFreeSpaceIndex] !== ".") {
      firstFreeSpaceIndex++;
    }
    while (expanded[lastBlockIndex] === ".") {
      lastBlockIndex--;
    }
  }

  // calculate checksum
  return expanded
    .filter((x) => x !== ".")
    .map((fileId, position) => fileId * position)
    .sum();
}

// totally different approach for partb, preserve the original compact format rather than expanding
export function day09b(input: string) {
  // parse input into chunks files & free space
  const disk = input.split("").map((c, i) => ({
    fileId: i % 2 === 1 ? null : i / 2,
    size: parseInt(c, 10),
  }));

  let fileIndex = disk.length - 1;

  for (const file of disk.filter((x) => x.fileId !== null).toReversed()) {
    // try to fit file as close to the start of the disk as possible
    while (disk[fileIndex].fileId !== file.fileId) {
      fileIndex--;
    }

    // search for free space
    let freeSpaceIndex = 0;
    while (freeSpaceIndex < fileIndex) {
      let freeSpace = disk[freeSpaceIndex];
      if (freeSpace.fileId === null && freeSpace.size >= file.size) {
        break;
      }
      freeSpaceIndex++;
    }

    const freeSpace = disk[freeSpaceIndex];

    if (freeSpaceIndex === -1) {
      continue;
    }

    // replace original file location with free space
    disk[fileIndex] = {
      fileId: null,
      size: file.size,
    };

    // move file into this free space, splitting the free space
    disk.splice(freeSpaceIndex, 1, file, {
      fileId: null,
      size: freeSpace.size - file.size,
    });
  }

  // checksum with our new format
  let position = 0;
  let checksum = 0;
  for (const chunk of disk.values()) {
    for (let i = 0; i < chunk.size; i++) {
      if (chunk.fileId !== null) {
        checksum += chunk.fileId * position;
      }
      position++;
    }
  }

  return checksum;
}
