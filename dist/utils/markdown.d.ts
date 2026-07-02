import { type Token } from 'marked';
import type { CliHighlight } from './cliHighlight.js';
import type { ThemeName } from './theme.js';
export declare function configureMarked(): void;
export declare function applyMarkdown(content: string, theme: ThemeName, highlight?: CliHighlight | null): string;
export declare function formatToken(token: Token, theme: ThemeName, listDepth?: number, orderedListNumber?: number | null, parent?: Token | null, highlight?: CliHighlight | null): string;
/**
 * Pad `content` to `targetWidth` according to alignment. `displayWidth` is the
 * visible width of `content` (caller computes this, e.g. via stringWidth on
 * stripAnsi'd text, so ANSI codes in `content` don't affect padding).
 */
export declare function padAligned(content: string, displayWidth: number, targetWidth: number, align: 'left' | 'center' | 'right' | null | undefined): string;
//# sourceMappingURL=markdown.d.ts.map