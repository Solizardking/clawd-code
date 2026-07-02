/**
 * Auto mode subcommand handlers — dump default/merged classifier rules and
 * critique user-written rules. Dynamically imported when `claude auto-mode ...` runs.
 */
export declare function autoModeDefaultsHandler(): void;
/**
 * Dump the effective auto mode config: user settings where provided, external
 * defaults otherwise. Per-section REPLACE semantics — matches how
 * buildYoloSystemPrompt resolves the external template (a non-empty user
 * section replaces that section's defaults entirely; an empty/absent section
 * falls through to defaults).
 */
export declare function autoModeConfigHandler(): void;
export declare function autoModeCritiqueHandler(options: {
    model?: string;
}): Promise<void>;
//# sourceMappingURL=autoMode.d.ts.map