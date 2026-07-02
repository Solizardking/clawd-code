import type { ValidationResult } from 'src/Tool.js';
/**
 * Validates settings file edits to ensure the result conforms to SettingsSchema.
 * This is used by FileEditTool to avoid code duplication.
 *
 * @param filePath - The file path being edited
 * @param originalContent - The original file content before edits
 * @param getUpdatedContent - A closure that returns the content after applying edits
 * @returns Validation result with error details if validation fails
 */
export declare function validateInputForSettingsFileEdit(filePath: string, originalContent: string, getUpdatedContent: () => string): Extract<ValidationResult, {
    result: false;
}> | null;
//# sourceMappingURL=validateEditTool.d.ts.map