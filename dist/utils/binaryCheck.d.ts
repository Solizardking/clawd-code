/**
 * Check if a binary/command is installed and available on the system.
 * Uses 'which' on Unix systems (macOS, Linux, WSL) and 'where' on Windows.
 *
 * @param command - The command name to check (e.g., 'gopls', 'rust-analyzer')
 * @returns Promise<boolean> - true if the command exists, false otherwise
 */
export declare function isBinaryInstalled(command: string): Promise<boolean>;
/**
 * Clear the binary check cache (useful for testing)
 */
export declare function clearBinaryCache(): void;
//# sourceMappingURL=binaryCheck.d.ts.map