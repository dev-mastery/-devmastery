export function pipe(...fns: Function[]) {
  return (param?: any) =>
    fns.reduce(
      (result, fn) => (result?.then && result.then(fn)) || fn(result),
      param
    );
}
