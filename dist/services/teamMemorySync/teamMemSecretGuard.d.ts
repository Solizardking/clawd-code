/**
 * Check if a file write/edit to a team memory path contains secrets.
 * Returns an error message if secrets are detected, or null if safe.
 *
 * This is called from FileWriteTool and FileEditTool validateInput to
 * prevent the model from writing secrets into team memory files, which
 * would be synced to all repository collaborators.
 *
 * Callers can import and call this unconditionally — the internal
 * feature('TEAMMEM') guard keeps it inert when the build flag is off.
 * secretScanner assembles sensitive prefixes at runtime (ANT_KEY_PFX).
 */
export declare function checkTeamMemSecrets(filePath: string, content: string): string | null;
//# sourceMappingURL=teamMemSecretGuard.d.ts.map