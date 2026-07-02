/**
 * Hook to register a component as an active overlay.
 * Automatically registers on mount and unregisters on unmount.
 *
 * @param id - Unique identifier for this overlay (e.g., 'select', 'multi-select')
 * @param enabled - Whether to register (default: true). Use this to conditionally register
 *                  based on component props, e.g., only register when onCancel is provided.
 *
 * @example
 * // Conditional registration based on whether cancel is supported
 * function useSelectInput({ state }) {
 *   useRegisterOverlay('select', !!state.onCancel)
 *   // ...
 * }
 */
export declare function useRegisterOverlay(id: any, t0: any): void;
export declare function useIsOverlayActive(): any;
export declare function useIsModalOverlayActive(): any;
//# sourceMappingURL=overlayContext.d.ts.map