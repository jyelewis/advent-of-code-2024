// its a crime I know, but for AOC some QOL enhancements go a long way
import assert from "node:assert";

declare global {
  interface Array<T> {
    dedup(fn?: (item: T) => string): Array<T>;
  }
}

Array.prototype.dedup = function (fn?: (item: any) => string): Array<any> {
  if (!fn) {
    fn = (item: any) => item.key;
  }

  const seenItems = new Set<string>();

  return this.filter((item: any) => {
    const itemKey = fn(item);
    assert(itemKey, "dedup requires a key function");

    if (seenItems.has(itemKey)) {
      return false;
    }
    seenItems.add(itemKey);
    return true;
  });
};

export {};
