/**
 * React hook to subscribe to compact warning suppression state.
 *
 * Lives in its own file so that compactWarningState.ts stays React-free:
 * microCompact.ts imports the pure state functions, and pulling React into
 * that module graph would drag it into the print-mode startup path.
 */
export declare function useCompactWarningSuppression(): boolean;
//# sourceMappingURL=compactWarningHook.d.ts.map