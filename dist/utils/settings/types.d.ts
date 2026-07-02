import { z } from 'zod/v4';
export { type AgentHook, type BashCommandHook, type HookCommand, HookCommandSchema, type HookMatcher, HookMatcherSchema, HooksSchema, type HooksSettings, type HttpHook, type PromptHook, } from '../../schemas/hooks.js';
import { type HookCommand } from '../../schemas/hooks.js';
/**
 * Schema for environment variables
 */
export declare const EnvironmentVariablesSchema: () => any;
/**
 * Schema for permissions section
 */
export declare const PermissionsSchema: () => any;
/**
 * Schema for extra marketplaces defined in repository settings
 * Same as KnownMarketplace but without lastUpdated (which is managed automatically)
 */
export declare const ExtraKnownMarketplaceSchema: () => any;
/**
 * Schema for allowed MCP server entry in enterprise allowlist.
 * Supports matching by serverName, serverCommand, or serverUrl (mutually exclusive).
 */
export declare const AllowedMcpServerEntrySchema: () => any;
/**
 * Schema for denied MCP server entry in enterprise denylist.
 * Supports matching by serverName, serverCommand, or serverUrl (mutually exclusive).
 */
export declare const DeniedMcpServerEntrySchema: () => any;
/**
 * Unified schema for settings files
 *
 * ⚠️ BACKWARD COMPATIBILITY NOTICE ⚠️
 *
 * This schema defines the structure of user settings files (.claude/settings.json).
 * We support backward-compatible changes! Here's how:
 *
 * ✅ ALLOWED CHANGES:
 * - Adding new optional fields (always use .optional())
 * - Adding new enum values (keeping existing ones)
 * - Adding new properties to objects
 * - Making validation more permissive
 * - Using union types for gradual migration (e.g., z.union([oldType, newType]))
 *
 * ❌ BREAKING CHANGES TO AVOID:
 * - Removing fields (mark as deprecated instead)
 * - Removing enum values
 * - Making optional fields required
 * - Making types more restrictive
 * - Renaming fields without keeping the old name
 *
 * TO ENSURE BACKWARD COMPATIBILITY:
 * 1. Run: npm run test:file -- test/utils/settings/backward-compatibility.test.ts
 * 2. If tests fail, you've introduced a breaking change
 * 3. When adding new fields, add a test to BACKWARD_COMPATIBILITY_CONFIGS
 *
 * The settings system handles backward compatibility automatically:
 * - When updating settings, invalid fields are preserved in the file (see settings.ts lines 233-249)
 * - Type coercion via z.coerce (e.g., env vars convert numbers to strings)
 * - .passthrough() preserves unknown fields in permissions object
 * - Invalid settings are simply not used, but remain in the file to be fixed by the user
 */
/**
 * Surfaces lockable by `strictPluginOnlyCustomization`. Exported so the
 * schema preprocess (below) and the runtime helper (pluginOnlyPolicy.ts)
 * share one source of truth.
 */
export declare const CUSTOMIZATION_SURFACES: readonly ["skills", "agents", "hooks", "mcp"];
export declare const SettingsSchema: () => any;
/**
 * Internal type for plugin hooks - includes plugin context for execution.
 * Not a Zod schema since it's not user-facing (plugins provide native hooks).
 */
export type PluginHookMatcher = {
    matcher?: string;
    hooks: HookCommand[];
    pluginRoot: string;
    pluginName: string;
    pluginId: string;
};
/**
 * Internal type for skill hooks - includes skill context for execution.
 * Not a Zod schema since it's not user-facing (skills provide native hooks).
 */
export type SkillHookMatcher = {
    matcher?: string;
    hooks: HookCommand[];
    skillRoot: string;
    skillName: string;
};
export type AllowedMcpServerEntry = z.infer<ReturnType<typeof AllowedMcpServerEntrySchema>>;
export type DeniedMcpServerEntry = z.infer<ReturnType<typeof DeniedMcpServerEntrySchema>>;
export type SettingsJson = z.infer<ReturnType<typeof SettingsSchema>>;
/**
 * Type guard for MCP server entry with serverName
 */
export declare function isMcpServerNameEntry(entry: AllowedMcpServerEntry | DeniedMcpServerEntry): entry is {
    serverName: string;
};
/**
 * Type guard for MCP server entry with serverCommand
 */
export declare function isMcpServerCommandEntry(entry: AllowedMcpServerEntry | DeniedMcpServerEntry): entry is {
    serverCommand: string[];
};
/**
 * Type guard for MCP server entry with serverUrl
 */
export declare function isMcpServerUrlEntry(entry: AllowedMcpServerEntry | DeniedMcpServerEntry): entry is {
    serverUrl: string;
};
/**
 * User configuration values for MCPB MCP servers
 */
export type UserConfigValues = Record<string, string | number | boolean | string[]>;
/**
 * Plugin configuration stored in settings.json
 */
export type PluginConfig = {
    mcpServers?: {
        [serverName: string]: UserConfigValues;
    };
};
//# sourceMappingURL=types.d.ts.map