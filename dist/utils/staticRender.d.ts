import * as React from 'react';
/**
 * Renders a React node to a string with ANSI escape codes (for terminal output).
 */
export declare function renderToAnsiString(node: React.ReactNode, columns?: number): Promise<string>;
/**
 * Renders a React node to a plain text string (ANSI codes stripped).
 */
export declare function renderToString(node: React.ReactNode, columns?: number): Promise<string>;
//# sourceMappingURL=staticRender.d.ts.map