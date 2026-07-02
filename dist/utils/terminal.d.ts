/**
 * Renders the content with line-based truncation for terminal display.
 * If the content exceeds the maximum number of lines, it truncates the content
 * and adds a message indicating the number of additional lines.
 * @param content The content to render.
 * @param terminalWidth Terminal width for wrapping lines.
 * @returns The rendered content with truncation if needed.
 */
export declare function renderTruncatedContent(content: string, terminalWidth: number, suppressExpandHint?: boolean): string;
/** Fast check: would OutputLine truncate this content? Counts raw newlines
 *  only (ignores terminal-width wrapping), so it may return false for a single
 *  very long line that wraps past 3 visual rows — acceptable, since the common
 *  case is multi-line output. */
export declare function isOutputLineTruncated(content: string): boolean;
//# sourceMappingURL=terminal.d.ts.map