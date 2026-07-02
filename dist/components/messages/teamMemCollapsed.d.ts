import type { CollapsedReadSearchGroup } from '../../types/message.js';
/**
 * Plain function (not a React component) so the React Compiler won't
 * hoist the teamMemory* property accesses for memoization. This module
 * is only loaded when feature('TEAMMEM') is true.
 */
export declare function checkHasTeamMemOps(message: CollapsedReadSearchGroup): boolean;
/**
 * Renders team memory count parts for the collapsed read/search UI.
 * This module is only loaded when feature('TEAMMEM') is true,
 * so DCE removes it entirely from external builds.
 */
export declare function TeamMemCountParts(t0: any): any;
//# sourceMappingURL=teamMemCollapsed.d.ts.map