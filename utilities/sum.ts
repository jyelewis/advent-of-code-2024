// its a crime I know, but for AOC some QOL enhancements go a long way
declare global {
  interface Array<T> {
    sum(): number;
  }
}

Array.prototype.sum = function (): number {
  return this.reduce((acc, val) => {
    if (typeof val !== "number") {
      throw new TypeError("Array contains non-numeric values");
    }
    return acc + val;
  }, 0);
};

export {};
