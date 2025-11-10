export function time<T>(label: string, fn: () => T): T {
  console.time(label);
  const result = fn();
  console.timeEnd(label);
  return result;
}
