export { flow, pipe } from "fp-ts/function";

// export function flow(
//   ...args: ReadonlyArray<CallableFunction | Promise<unknown>>
// ) {
//   return (x: unknown): unknown =>
//     args.reduce<unknown>((r, fn) => {
//       if (r instanceof Promise) {
//         return r.then(fn as (value: unknown) => unknown);
//       }
//       return (fn as CallableFunction)(r);
//     }, x);
// }

// export function pipe(
//   first: unknown,
//   ...args: ReadonlyArray<CallableFunction | Promise<unknown>>
// ): unknown {
//   if (first instanceof Promise || typeof first === "function") {
//     return flow(first, ...args);
//   }
//   return flow(...args)(first);
// }
