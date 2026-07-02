export declare function KeybindingProvider(t0: any): any;
export declare function useKeybindingContext(): any;
/**
 * Optional hook that returns undefined outside of KeybindingProvider.
 * Useful for components that may render before provider is available.
 */
export declare function useOptionalKeybindingContext(): any;
/**
 * Hook to register a keybinding context as active while the component is mounted.
 *
 * When a context is registered, its keybindings take precedence over Global bindings.
 * This allows context-specific bindings (like ThemePicker's ctrl+t) to override
 * global bindings (like the todo toggle) when the context is active.
 *
 * @example
 * ```tsx
 * function ThemePicker() {
 *   useRegisterKeybindingContext('ThemePicker')
 *   // Now ThemePicker's ctrl+t binding takes precedence over Global
 * }
 * ```
 */
export declare function useRegisterKeybindingContext(context: any, t0: any): void;
//# sourceMappingURL=KeybindingContext.d.ts.map