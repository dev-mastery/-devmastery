export function toNearestSize(sizes: number[], value: number): number {
  const min = Math.min(...sizes);
  if (value <= min) return min;

  const max = Math.max(...sizes);
  if (value >= max) return max;

  return [...sizes]
    .sort((a, b): number => a - b)
    .reduce((acc, size) => (acc <= size ? size : acc), value);
}
