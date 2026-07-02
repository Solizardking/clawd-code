import { type AppStateStore } from './AppStateStore.js';
export { type AppState, type AppStateStore, type CompletionBoundary, getDefaultAppState, IDLE_SPECULATION_STATE, type SpeculationResult, type SpeculationState } from './AppStateStore.js';
export declare const AppStoreContext: any;
export declare function AppStateProvider(t0: any): any;
/**
 * Subscribe to a slice of AppState. Only re-renders when the selected value
 * changes (compared via Object.is).
 *
 * For multiple independent fields, call the hook multiple times:
 * ```
 * const verbose = useAppState(s => s.verbose)
 * const model = useAppState(s => s.mainLoopModel)
 * ```
 *
 * Do NOT return new objects from the selector -- Object.is will always see
 * them as changed. Instead, select an existing sub-object reference:
 * ```
 * const { text, promptId } = useAppState(s => s.promptSuggestion) // good
 * ```
 */
export declare function useAppState(selector: any): any;
/**
 * Get the setAppState updater without subscribing to any state.
 * Returns a stable reference that never changes -- components using only
 * this hook will never re-render from state changes.
 */
export declare function useSetAppState(): (updater: (prev: any) => any) => void;
/**
 * Get the store directly (for passing getState/setState to non-React code).
 */
export declare function useAppStateStore(): AppStateStore;
/**
 * Safe version of useAppState that returns undefined if called outside of AppStateProvider.
 * Useful for components that may be rendered in contexts where AppStateProvider isn't available.
 */
export declare function useAppStateMaybeOutsideOfProvider(selector: any): any;
//# sourceMappingURL=AppState.d.ts.map