/**
 * Start background prefetches and housekeeping that are NOT needed before first render.
 * These are deferred from setup() to reduce event loop contention and child process
 * spawning during the critical startup path.
 * Call this after the REPL has been rendered.
 */
export declare function startDeferredPrefetches(): void;
export declare function main(): Promise<void>;
//# sourceMappingURL=main.d.ts.map