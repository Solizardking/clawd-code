type Match = {
    file: string;
    line: number;
    text: string;
};
/**
 * Global Search dialog (ctrl+shift+f / cmd+shift+f).
 * Debounced ripgrep search across the workspace.
 */
export declare function GlobalSearchDialog(t0: any): any;
/**
 * Parse a ripgrep -n --no-heading output line: "path:line:text".
 * Windows paths may contain a drive letter ("C:\..."), so a simple split on
 * the first colon would mangle the path — use a regex that captures up to
 * the first :<digits>: instead.
 * @internal exported for testing
 */
export declare function parseRipgrepLine(line: string): Match | null;
export {};
//# sourceMappingURL=GlobalSearchDialog.d.ts.map