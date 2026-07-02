import type { Tokens } from 'marked';
import React from 'react';
import type { CliHighlight } from '../utils/cliHighlight.js';
type Props = {
    token: Tokens.Table;
    highlight: CliHighlight | null;
    /** Override terminal width (useful for testing) */
    forceWidth?: number;
};
/**
 * Renders a markdown table using Ink's Box layout.
 * Handles terminal width by:
 * 1. Calculating minimum column widths based on longest word
 * 2. Distributing available space proportionally
 * 3. Wrapping text within cells (no truncation)
 * 4. Properly aligning multi-line rows with borders
 */
export declare function MarkdownTable({ token, highlight, forceWidth }: Props): React.ReactNode;
export {};
//# sourceMappingURL=MarkdownTable.d.ts.map