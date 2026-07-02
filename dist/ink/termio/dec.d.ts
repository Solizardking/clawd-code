/**
 * DEC (Digital Equipment Corporation) Private Mode Sequences
 *
 * DEC private modes use CSI ? N h (set) and CSI ? N l (reset) format.
 * These are terminal-specific extensions to the ANSI standard.
 */
/**
 * DEC private mode numbers
 */
export declare const DEC: {
    readonly CURSOR_VISIBLE: 25;
    readonly ALT_SCREEN: 47;
    readonly ALT_SCREEN_CLEAR: 1049;
    readonly MOUSE_NORMAL: 1000;
    readonly MOUSE_BUTTON: 1002;
    readonly MOUSE_ANY: 1003;
    readonly MOUSE_SGR: 1006;
    readonly FOCUS_EVENTS: 1004;
    readonly BRACKETED_PASTE: 2004;
    readonly SYNCHRONIZED_UPDATE: 2026;
};
/** Generate CSI ? N h sequence (set mode) */
export declare function decset(mode: number): string;
/** Generate CSI ? N l sequence (reset mode) */
export declare function decreset(mode: number): string;
export declare const BSU: string;
export declare const ESU: string;
export declare const EBP: string;
export declare const DBP: string;
export declare const EFE: string;
export declare const DFE: string;
export declare const SHOW_CURSOR: string;
export declare const HIDE_CURSOR: string;
export declare const ENTER_ALT_SCREEN: string;
export declare const EXIT_ALT_SCREEN: string;
export declare const ENABLE_MOUSE_TRACKING: string;
export declare const DISABLE_MOUSE_TRACKING: string;
//# sourceMappingURL=dec.d.ts.map