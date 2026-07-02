import type { ParsedKey } from '../parse-keypress.js';
import { TerminalEvent } from './terminal-event.js';
/**
 * Keyboard event dispatched through the DOM tree via capture/bubble.
 *
 * Follows browser KeyboardEvent semantics: `key` is the literal character
 * for printable keys ('a', '3', ' ', '/') and a multi-char name for
 * special keys ('down', 'return', 'escape', 'f1'). The idiomatic
 * printable-char check is `e.key.length === 1`.
 */
export declare class KeyboardEvent extends TerminalEvent {
    readonly key: string;
    readonly ctrl: boolean;
    readonly shift: boolean;
    readonly meta: boolean;
    readonly superKey: boolean;
    readonly fn: boolean;
    constructor(parsedKey: ParsedKey);
}
//# sourceMappingURL=keyboard-event.d.ts.map