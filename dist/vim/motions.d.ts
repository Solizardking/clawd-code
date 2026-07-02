/**
 * Vim Motion Functions
 *
 * Pure functions for resolving vim motions to cursor positions.
 */
import type { Cursor } from '../utils/Cursor.js';
/**
 * Resolve a motion to a target cursor position.
 * Does not modify anything - pure calculation.
 */
export declare function resolveMotion(key: string, cursor: Cursor, count: number): Cursor;
/**
 * Check if a motion is inclusive (includes character at destination).
 */
export declare function isInclusiveMotion(key: string): boolean;
/**
 * Check if a motion is linewise (operates on full lines when used with operators).
 * Note: gj/gk are characterwise exclusive per `:help gj`, not linewise.
 */
export declare function isLinewiseMotion(key: string): boolean;
//# sourceMappingURL=motions.d.ts.map