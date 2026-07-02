import type { ToolPermissionContext } from '../Tool.js';
/**
 * Extracts the static base directory from a glob pattern.
 * The base directory is everything before the first glob special character (* ? [ {).
 * Returns the directory portion and the remaining relative pattern.
 */
export declare function extractGlobBaseDirectory(pattern: string): {
    baseDir: string;
    relativePattern: string;
};
export declare function glob(filePattern: string, cwd: string, { limit, offset }: {
    limit: number;
    offset: number;
}, abortSignal: AbortSignal, toolPermissionContext: ToolPermissionContext): Promise<{
    files: string[];
    truncated: boolean;
}>;
//# sourceMappingURL=glob.d.ts.map