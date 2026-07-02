/**
 * Check if a tool use constitutes a memory file access.
 * Detects session memory (via Read/Grep/Glob) and memdir access (via Read/Edit/Write).
 * Uses the same conditions as the PostToolUse session file access hooks.
 */
export declare function isMemoryFileAccess(toolName: string, toolInput: unknown): boolean;
/**
 * Register session file access tracking hooks.
 * Called during CLI initialization.
 */
export declare function registerSessionFileAccessHooks(): void;
//# sourceMappingURL=sessionFileAccessHooks.d.ts.map