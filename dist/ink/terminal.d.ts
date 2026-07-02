import type { Writable } from 'stream';
import type { Diff } from './frame.js';
export type Progress = {
    state: 'running' | 'completed' | 'error' | 'indeterminate';
    percentage?: number;
};
/**
 * Checks if the terminal supports OSC 9;4 progress reporting.
 * Supported terminals:
 * - ConEmu (Windows) - all versions
 * - Ghostty 1.2.0+
 * - iTerm2 3.6.6+
 *
 * Note: Windows Terminal interprets OSC 9;4 as notifications, not progress.
 */
export declare function isProgressReportingAvailable(): boolean;
/**
 * Checks if the terminal supports DEC mode 2026 (synchronized output).
 * When supported, BSU/ESU sequences prevent visible flicker during redraws.
 */
export declare function isSynchronizedOutputSupported(): boolean;
/** Record the XTVERSION response. Called once from App.tsx when the reply
 *  arrives on stdin. No-op if already set (defend against re-probe). */
export declare function setXtversionName(name: string): void;
/** True if running in an xterm.js-based terminal (VS Code, Cursor, Windsurf
 *  integrated terminals). Combines TERM_PROGRAM env check (fast, sync, but
 *  not forwarded over SSH) with the XTVERSION probe result (async, survives
 *  SSH — query/reply goes through the pty). Early calls may miss the probe
 *  reply — call lazily (e.g. in an event handler) if SSH detection matters. */
export declare function isXtermJs(): boolean;
/** True if this terminal correctly handles extended key reporting
 *  (Kitty keyboard protocol + xterm modifyOtherKeys). */
export declare function supportsExtendedKeys(): boolean;
/** True if the terminal scrolls the viewport when it receives cursor-up
 *  sequences that reach above the visible area. On Windows, conhost's
 *  SetConsoleCursorPosition follows the cursor into scrollback
 *  (microsoft/terminal#14774), yanking users to the top of their buffer
 *  mid-stream. WT_SESSION catches WSL-in-Windows-Terminal where platform
 *  is linux but output still routes through conhost. */
export declare function hasCursorUpViewportYankBug(): boolean;
export declare const SYNC_OUTPUT_SUPPORTED: boolean;
export type Terminal = {
    stdout: Writable;
    stderr: Writable;
};
export declare function writeDiffToTerminal(terminal: Terminal, diff: Diff, skipSyncMarkers?: boolean): void;
//# sourceMappingURL=terminal.d.ts.map