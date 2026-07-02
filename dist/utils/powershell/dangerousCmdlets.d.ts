/**
 * Shared constants for PowerShell cmdlets that execute arbitrary code.
 *
 * These lists are consumed by both the permission-engine validators
 * (powershellSecurity.ts) and the UI suggestion gate (staticPrefix.ts).
 * Keeping them here avoids duplicating the lists and prevents sync drift
 * — add a cmdlet once, both consumers pick it up.
 */
/**
 * Cmdlets that accept a -FilePath (or positional path) and execute the
 * file's contents as a script.
 */
export declare const FILEPATH_EXECUTION_CMDLETS: Set<string>;
/**
 * Cmdlets where a scriptblock argument executes arbitrary code (not just
 * filtering/transforming pipeline input like Where-Object).
 */
export declare const DANGEROUS_SCRIPT_BLOCK_CMDLETS: Set<string>;
/**
 * Cmdlets that load and execute module/script code. `.psm1` files run
 * their top-level body on import — same code-execution risk as iex.
 */
export declare const MODULE_LOADING_CMDLETS: Set<string>;
/**
 * Network cmdlets — wildcard rules for these enable exfil/download without
 * prompt. No legitimate narrow prefix exists.
 */
export declare const NETWORK_CMDLETS: Set<string>;
/**
 * Alias/variable mutation cmdlets — Set-Alias rebinds command resolution,
 * Set-Variable can poison $PSDefaultParameterValues. checkRuntimeStateManipulation
 * validator in powershellSecurity.ts independently gates on the permission path.
 */
export declare const ALIAS_HIJACK_CMDLETS: Set<string>;
/**
 * WMI/CIM process spawn — Invoke-WmiMethod -Class Win32_Process -Name Create
 * is a Start-Process equivalent that bypasses checkStartProcess. No legitimate
 * narrow prefix exists; any invocation can spawn arbitrary processes.
 * checkWmiProcessSpawn validator gates on the permission path.
 * (security finding #34)
 */
export declare const WMI_CIM_CMDLETS: Set<string>;
/**
 * Cmdlets in CMDLET_ALLOWLIST with additionalCommandIsDangerousCallback.
 *
 * The allowlist auto-allows these for safe args (StringConstant identifiers).
 * The permission dialog only fires when the callback rejected — i.e. the args
 * contain a scriptblock, variable, subexpression, etc. Accepting a
 * `Cmdlet:*` wildcard at that point would match ALL future invocations via
 * prefix-startsWith, bypassing the callback forever.
 * `ForEach-Object:*` → `ForEach-Object { Remove-Item -Recurse / }` auto-allows.
 *
 * Sync with readOnlyValidation.ts — test/utils/powershell/dangerousCmdlets.test.ts
 * asserts this set covers every additionalCommandIsDangerousCallback entry.
 */
export declare const ARG_GATED_CMDLETS: Set<string>;
/**
 * Commands to never suggest as a wildcard prefix in the permission dialog.
 *
 * Derived from the validator lists above plus the small static shells list.
 * Add a cmdlet to the appropriate validator list and it automatically
 * appears here — no separate maintenance.
 */
export declare const NEVER_SUGGEST: ReadonlySet<string>;
//# sourceMappingURL=dangerousCmdlets.d.ts.map