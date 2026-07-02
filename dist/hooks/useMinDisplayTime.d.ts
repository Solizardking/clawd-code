/**
 * Throttles a value so each distinct value stays visible for at least `minMs`.
 * Prevents fast-cycling progress text from flickering past before it's readable.
 *
 * Unlike debounce (wait for quiet) or throttle (limit rate), this guarantees
 * each value gets its minimum screen time before being replaced.
 */
export declare function useMinDisplayTime<T>(value: T, minMs: number): T;
//# sourceMappingURL=useMinDisplayTime.d.ts.map