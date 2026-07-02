/**
 * CSI (Control Sequence Introducer) Types
 *
 * Enums and types for CSI command parameters.
 */
export declare const CSI_PREFIX: string;
/**
 * CSI parameter byte ranges
 */
export declare const CSI_RANGE: {
    readonly PARAM_START: 48;
    readonly PARAM_END: 63;
    readonly INTERMEDIATE_START: 32;
    readonly INTERMEDIATE_END: 47;
    readonly FINAL_START: 64;
    readonly FINAL_END: 126;
};
/** Check if a byte is a CSI parameter byte */
export declare function isCSIParam(byte: number): boolean;
/** Check if a byte is a CSI intermediate byte */
export declare function isCSIIntermediate(byte: number): boolean;
/** Check if a byte is a CSI final byte (@ through ~) */
export declare function isCSIFinal(byte: number): boolean;
/**
 * Generate a CSI sequence: ESC [ p1;p2;...;pN final
 * Single arg: treated as raw body
 * Multiple args: last is final byte, rest are params joined by ;
 */
export declare function csi(...args: (string | number)[]): string;
/**
 * CSI final bytes - the command identifier
 */
export declare const CSI: {
    readonly CUU: 65;
    readonly CUD: 66;
    readonly CUF: 67;
    readonly CUB: 68;
    readonly CNL: 69;
    readonly CPL: 70;
    readonly CHA: 71;
    readonly CUP: 72;
    readonly CHT: 73;
    readonly VPA: 100;
    readonly HVP: 102;
    readonly ED: 74;
    readonly EL: 75;
    readonly ECH: 88;
    readonly IL: 76;
    readonly DL: 77;
    readonly ICH: 64;
    readonly DCH: 80;
    readonly SU: 83;
    readonly SD: 84;
    readonly SM: 104;
    readonly RM: 108;
    readonly SGR: 109;
    readonly DSR: 110;
    readonly DECSCUSR: 113;
    readonly DECSTBM: 114;
    readonly SCOSC: 115;
    readonly SCORC: 117;
    readonly CBT: 90;
};
/**
 * Erase in Display regions (ED command parameter)
 */
export declare const ERASE_DISPLAY: readonly ["toEnd", "toStart", "all", "scrollback"];
/**
 * Erase in Line regions (EL command parameter)
 */
export declare const ERASE_LINE_REGION: readonly ["toEnd", "toStart", "all"];
/**
 * Cursor styles (DECSCUSR)
 */
export type CursorStyle = 'block' | 'underline' | 'bar';
export declare const CURSOR_STYLES: Array<{
    style: CursorStyle;
    blinking: boolean;
}>;
/** Move cursor up n lines (CSI n A) */
export declare function cursorUp(n?: number): string;
/** Move cursor down n lines (CSI n B) */
export declare function cursorDown(n?: number): string;
/** Move cursor forward n columns (CSI n C) */
export declare function cursorForward(n?: number): string;
/** Move cursor back n columns (CSI n D) */
export declare function cursorBack(n?: number): string;
/** Move cursor to column n (1-indexed) (CSI n G) */
export declare function cursorTo(col: number): string;
/** Move cursor to column 1 (CSI G) */
export declare const CURSOR_LEFT: string;
/** Move cursor to row, col (1-indexed) (CSI row ; col H) */
export declare function cursorPosition(row: number, col: number): string;
/** Move cursor to home position (CSI H) */
export declare const CURSOR_HOME: string;
/**
 * Move cursor relative to current position
 * Positive x = right, negative x = left
 * Positive y = down, negative y = up
 */
export declare function cursorMove(x: number, y: number): string;
/** Save cursor position (CSI s) */
export declare const CURSOR_SAVE: string;
/** Restore cursor position (CSI u) */
export declare const CURSOR_RESTORE: string;
/** Erase from cursor to end of line (CSI K) */
export declare function eraseToEndOfLine(): string;
/** Erase from cursor to start of line (CSI 1 K) */
export declare function eraseToStartOfLine(): string;
/** Erase entire line (CSI 2 K) */
export declare function eraseLine(): string;
/** Erase entire line - constant form */
export declare const ERASE_LINE: string;
/** Erase from cursor to end of screen (CSI J) */
export declare function eraseToEndOfScreen(): string;
/** Erase from cursor to start of screen (CSI 1 J) */
export declare function eraseToStartOfScreen(): string;
/** Erase entire screen (CSI 2 J) */
export declare function eraseScreen(): string;
/** Erase entire screen - constant form */
export declare const ERASE_SCREEN: string;
/** Erase scrollback buffer (CSI 3 J) */
export declare const ERASE_SCROLLBACK: string;
/**
 * Erase n lines starting from cursor line, moving cursor up
 * This erases each line and moves up, ending at column 1
 */
export declare function eraseLines(n: number): string;
/** Scroll up n lines (CSI n S) */
export declare function scrollUp(n?: number): string;
/** Scroll down n lines (CSI n T) */
export declare function scrollDown(n?: number): string;
/** Set scroll region (DECSTBM, CSI top;bottom r). 1-indexed, inclusive. */
export declare function setScrollRegion(top: number, bottom: number): string;
/** Reset scroll region to full screen (DECSTBM, CSI r). Homes the cursor. */
export declare const RESET_SCROLL_REGION: string;
/** Sent by terminal before pasted content (CSI 200 ~) */
export declare const PASTE_START: string;
/** Sent by terminal after pasted content (CSI 201 ~) */
export declare const PASTE_END: string;
/** Sent by terminal when it gains focus (CSI I) */
export declare const FOCUS_IN: string;
/** Sent by terminal when it loses focus (CSI O) */
export declare const FOCUS_OUT: string;
/**
 * Enable Kitty keyboard protocol with basic modifier reporting
 * CSI > 1 u - pushes mode with flags=1 (disambiguate escape codes)
 * This makes Shift+Enter send CSI 13;2 u instead of just CR
 */
export declare const ENABLE_KITTY_KEYBOARD: string;
/**
 * Disable Kitty keyboard protocol
 * CSI < u - pops the keyboard mode stack
 */
export declare const DISABLE_KITTY_KEYBOARD: string;
/**
 * Enable xterm modifyOtherKeys level 2.
 * tmux accepts this (not the kitty stack) to enable extended keys — when
 * extended-keys-format is csi-u, tmux then emits keys in kitty format.
 */
export declare const ENABLE_MODIFY_OTHER_KEYS: string;
/**
 * Disable xterm modifyOtherKeys (reset to default).
 */
export declare const DISABLE_MODIFY_OTHER_KEYS: string;
//# sourceMappingURL=csi.d.ts.map