// its a crime I know, but for AOC some QOL enhancements go a long way
declare global {
  interface Array<T> {
    count(fn: (item: T) => boolean): number;
  }
}

Array.prototype.count = function (fn: (item: any) => boolean): number {
  return this.reduce((acc, val) => {
    return acc + (fn(val) ? 1 : 0);
  }, 0);
};

export {};
