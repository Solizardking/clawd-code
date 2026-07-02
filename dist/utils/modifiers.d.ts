export type ModifierKey = 'shift' | 'command' | 'control' | 'option';
/**
 * Pre-warm the native module by loading it in advance.
 * Call this early to avoid delay on first use.
 */
export declare function prewarmModifiers(): void;
/**
 * Check if a specific modifier key is currently pressed (synchronous).
 */
export declare function isModifierPressed(modifier: ModifierKey): boolean;
//# sourceMappingURL=modifiers.d.ts.map