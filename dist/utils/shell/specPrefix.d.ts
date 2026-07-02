/**
 * Fig-spec-driven command prefix extraction.
 *
 * Given a command name + args array + its @withfig/autocomplete spec, walks
 * the spec to find how deep into the args a meaningful prefix extends.
 * `git -C /repo status --short` → `git status` (spec says -C takes a value,
 * skip it, find `status` as a known subcommand).
 *
 * Pure over (string, string[], CommandSpec) — no parser dependency. Extracted
 * from src/utils/bash/prefix.ts so PowerShell's extractor can reuse it;
 * external CLIs (git, npm, kubectl) are shell-agnostic.
 */
import type { CommandSpec } from '../bash/registry.js';
export declare const DEPTH_RULES: Record<string, number>;
export declare function buildPrefix(command: string, args: string[], spec: CommandSpec | null): Promise<string>;
//# sourceMappingURL=specPrefix.d.ts.map