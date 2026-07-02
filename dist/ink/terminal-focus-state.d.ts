export type TerminalFocusState = 'focused' | 'blurred' | 'unknown';
export declare function setTerminalFocused(v: boolean): void;
export declare function getTerminalFocused(): boolean;
export declare function getTerminalFocusState(): TerminalFocusState;
export declare function subscribeTerminalFocus(cb: () => void): () => void;
export declare function resetTerminalFocusState(): void;
//# sourceMappingURL=terminal-focus-state.d.ts.map