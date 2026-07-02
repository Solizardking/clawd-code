/**
 * Hook that manages the permission explainer state.
 * Creates the fetch promise lazily (only when user hits Ctrl+E)
 * to avoid consuming tokens for explanations users never view.
 */
export declare function usePermissionExplainerUI(props: any): any;
/**
 * Content component - shows loading (via Suspense) or explanation when visible
 */
export declare function PermissionExplainerContent(t0: any): any;
//# sourceMappingURL=PermissionExplanation.d.ts.map