/**
 * Error log sink implementation
 *
 * This module contains the heavy implementation for error logging and should be
 * initialized during app startup. It handles file-based error logging to disk.
 *
 * Usage: Call initializeErrorLogSink() during app startup to attach the sink.
 *
 * DESIGN: This module is separate from log.ts to avoid import cycles.
 * log.ts has NO heavy dependencies - events are queued until this sink is attached.
 */
/**
 * Gets the path to the errors log file.
 */
export declare function getErrorsPath(): string;
/**
 * Gets the path to MCP logs for a server.
 */
export declare function getMCPLogsPath(serverName: string): string;
/**
 * Flush all buffered log writers. Used for testing.
 * @internal
 */
export declare function _flushLogWritersForTesting(): void;
/**
 * Clear all buffered log writers. Used for testing.
 * @internal
 */
export declare function _clearLogWritersForTesting(): void;
/**
 * Initialize the error log sink.
 *
 * Call this during app startup to attach the error logging backend.
 * Any errors logged before this is called will be queued and drained.
 *
 * Should be called BEFORE initializeAnalyticsSink() in the startup sequence.
 *
 * Idempotent: safe to call multiple times (subsequent calls are no-ops).
 */
export declare function initializeErrorLogSink(): void;
//# sourceMappingURL=errorLogSink.d.ts.map