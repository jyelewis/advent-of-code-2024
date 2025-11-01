// its a crime I know, but for AOC some QOL enhancements go a long way
declare global {
  interface Array<T> {
    dedup(fn: (item: T) => string): Array<T>;
  }
}

Array.prototype.dedup = function (fn: (item: any) => string): Array<any> {
  const seenItems = new Set<string>();

  return this.filter((item: any) => {
    const itemKey = fn(item);
    if (seenItems.has(itemKey)) {
      return false;
    }
    seenItems.add(itemKey);
    return true;
  });
};

export {};
