// its a crime I know, but for AOC some QOL enhancements go a long way
declare global {
  interface Array<T> {
    mapNotNull<O>(fn: (item: T) => null | O): O[];
  }
}

Array.prototype.mapNotNull = function <O>(fn: (item: any) => null | O): O[] {
  return this.map(fn).filter((x) => x !== null);
};

export {};
