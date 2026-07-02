import type { SystemMemorySavedMessage } from '../../types/message.js';
/**
 * Returns the team-memory segment for the memory-saved UI, plus the count so
 * the caller can derive the private count without accessing teamCount itself.
 * Plain function (not a React component) so the React Compiler won't hoist
 * the teamCount property access for memoization. This module is only loaded
 * when feature('TEAMMEM') is true.
 */
export declare function teamMemSavedPart(message: SystemMemorySavedMessage): {
    segment: string;
    count: number;
} | null;
//# sourceMappingURL=teamMemSaved.d.ts.map