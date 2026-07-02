/**
 * Sentinel written to stderr ahead of any diverted non-JSON line, so that
 * log scrapers and tests can grep for guard activity.
 */
export declare const STDOUT_GUARD_MARKER = "[stdout-guard]";
/**
 * Install a runtime guard on process.stdout.write for --output-format=stream-json.
 *
 * SDK clients consuming stream-json parse stdout line-by-line as NDJSON. Any
 * stray write — a console.log from a dependency, a debug print that slipped
 * past review, a library banner — breaks the client's parser mid-stream with
 * no recovery path.
 *
 * This guard wraps process.stdout.write at the same layer the asciicast
 * recorder does (see asciicast.ts). Writes are buffered until a newline
 * arrives, then each complete line is JSON-parsed. Lines that parse are
 * forwarded to the real stdout; lines that don't are diverted to stderr
 * tagged with STDOUT_GUARD_MARKER so they remain visible without corrupting
 * the JSON stream.
 *
 * The blessed JSON path (structuredIO.write → writeToStdout → stdout.write)
 * always emits `ndjsonSafeStringify(msg) + '\n'`, so it passes straight
 * through. Only out-of-band writes are diverted.
 *
 * Installing twice is a no-op. Call before any stream-json output is emitted.
 */
export declare function installStreamJsonStdoutGuard(): void;
/**
 * Testing-only reset. Restores the real stdout.write and clears the line
 * buffer so subsequent tests start from a clean slate.
 */
export declare function _resetStreamJsonStdoutGuardForTesting(): void;
//# sourceMappingURL=streamJsonStdoutGuard.d.ts.map