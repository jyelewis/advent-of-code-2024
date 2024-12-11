declare global {
  interface Map<K, V> {
    inc(element: number, count?: number): void;
    dec(element: number, count?: number): void;
  }
}

Map.prototype.inc = function (this: Map<number, number>, element: number, count: number = 1): void {
  this.set(element, (this.get(element) || 0) + count);
};

Map.prototype.dec = function (this: Map<number, number>, element: number, count: number = 1): void {
  this.set(element, (this.get(element) || 0) - count);
};

export {};
