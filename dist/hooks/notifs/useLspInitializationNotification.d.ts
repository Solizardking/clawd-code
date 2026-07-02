/**
 * Hook that polls LSP status and shows a notification when:
 * 1. Manager initialization fails
 * 2. Any LSP server enters an error state
 *
 * Also adds errors to appState.plugins.errors for /doctor display.
 *
 * Only active when ENABLE_LSP_TOOL is set.
 */
export declare function useLspInitializationNotification(): void;
//# sourceMappingURL=useLspInitializationNotification.d.ts.map