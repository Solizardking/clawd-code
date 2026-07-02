import { type ReactNode } from 'react';
import type { PermissionUpdate } from '../../utils/permissions/PermissionUpdateSchema.js';
/**
 * Generate the label for the "Yes, and apply suggestions" option in shell
 * permission dialogs (Bash, PowerShell). Parametrized by the shell tool name
 * and an optional command transform (e.g., Bash strips output redirections so
 * filenames don't show as commands).
 */
export declare function generateShellSuggestionsLabel(suggestions: PermissionUpdate[], shellToolName: string, commandTransform?: (command: string) => string): ReactNode | null;
//# sourceMappingURL=shellPermissionHelpers.d.ts.map