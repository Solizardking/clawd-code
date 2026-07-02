import React from 'react';
import type { CommandResultDisplay, LocalJSXCommandContext } from '../../commands.js';
export declare function call(onDone: (result?: string, options?: {
    display?: CommandResultDisplay;
}) => void, context: LocalJSXCommandContext, args: string): Promise<React.ReactNode | null>;
/**
 * Formats workspace folders for display, stripping cwd and showing tail end of paths
 * @param folders Array of folder paths
 * @param maxLength Maximum total length of the formatted string
 * @returns Formatted string with folder paths
 */
export declare function formatWorkspaceFolders(folders: string[], maxLength?: number): string;
//# sourceMappingURL=ide.d.ts.map