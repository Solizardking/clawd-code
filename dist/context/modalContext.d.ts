export declare const ModalContext: any;
export declare function useIsInsideModal(): boolean;
/**
 * Available content rows/columns when inside a Modal, else falls back to
 * the provided terminal size. Use instead of `useTerminalSize()` when a
 * component caps its visible content height — the modal's inner area is
 * smaller than the terminal.
 */
export declare function useModalOrTerminalSize(fallback: any): any;
export declare function useModalScrollRef(): any;
//# sourceMappingURL=modalContext.d.ts.map