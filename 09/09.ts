import "../utilities";

export function day09a(input: string) {
  const expanded = input
    .split("")
    .map((c) => parseInt(c, 10))
    .flatMap((size, i) => {
      const isFreeSpace = i % 2 === 1;
      const fileId = i / 2;
      return new Array(size).fill(isFreeSpace ? "." : fileId);
    });

  while (true) {
    // find last block from the right
    const firstFreeSpace = expanded.findIndex((c) => c === ".");
    const lastBlockIndex = expanded.findLastIndex((c) => c !== ".");

    if (firstFreeSpace > lastBlockIndex) {
      // we're done!
      break;
    }

    // move block into free space on the left
    expanded[firstFreeSpace] = expanded[lastBlockIndex];
    expanded[lastBlockIndex] = ".";
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

  for (const file of disk.filter((x) => x.fileId !== null).toReversed()) {
    // try to fit file as close to the start of the disk as possible
    const fileIndex = disk.findIndex((x) => x.fileId === file.fileId);

    const freeSpaceIndex = disk.findIndex((x, i) => x.fileId === null && x.size >= file.size && i < fileIndex);
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
