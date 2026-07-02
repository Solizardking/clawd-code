/**
 * Get the asciicast recording file path.
 * For ants with CLAUDE_CODE_TERMINAL_RECORDING=1: returns a path.
 * Otherwise: returns null.
 * The path is computed once and cached in recordingState.
 */
export declare function getRecordFilePath(): string | null;
export declare function _resetRecordingStateForTesting(): void;
/**
 * Find all .cast files for the current session.
 * Returns paths sorted by filename (chronological by timestamp suffix).
 */
export declare function getSessionRecordingPaths(): string[];
/**
 * Rename the recording file to match the current session ID.
 * Called after --resume/--continue changes the session ID via switchSession().
 * The recorder was installed with the initial (random) session ID; this renames
 * the file so getSessionRecordingPaths() can find it by the resumed session ID.
 */
export declare function renameRecordingForSession(): Promise<void>;
/**
 * Flush pending recording data to disk.
 * Call before reading the .cast file (e.g., during /share).
 */
export declare function flushAsciicastRecorder(): Promise<void>;
/**
 * Install the asciicast recorder.
 * Wraps process.stdout.write to capture all terminal output with timestamps.
 * Must be called before Ink mounts.
 */
export declare function installAsciicastRecorder(): void;
//# sourceMappingURL=asciicast.d.ts.map