/**
 * Sandbox types for the Claude Code Agent SDK
 *
 * This file is the single source of truth for sandbox configuration types.
 * Both the SDK and the settings validation import from here.
 */
import { z } from 'zod/v4';
/**
 * Network configuration schema for sandbox.
 */
export declare const SandboxNetworkConfigSchema: () => any;
/**
 * Filesystem configuration schema for sandbox.
 */
export declare const SandboxFilesystemConfigSchema: () => any;
/**
 * Sandbox settings schema.
 */
export declare const SandboxSettingsSchema: () => any;
export type SandboxSettings = z.infer<ReturnType<typeof SandboxSettingsSchema>>;
export type SandboxNetworkConfig = NonNullable<z.infer<ReturnType<typeof SandboxNetworkConfigSchema>>>;
export type SandboxFilesystemConfig = NonNullable<z.infer<ReturnType<typeof SandboxFilesystemConfigSchema>>>;
export type SandboxIgnoreViolations = NonNullable<SandboxSettings['ignoreViolations']>;
//# sourceMappingURL=sandboxTypes.d.ts.map