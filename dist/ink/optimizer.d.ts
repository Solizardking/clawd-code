import type { Diff } from './frame.js';
/**
 * Optimize a diff by applying all optimization rules in a single pass.
 * This reduces the number of patches that need to be written to the terminal.
 *
 * Rules applied:
 * - Remove empty stdout patches
 * - Merge consecutive cursorMove patches
 * - Remove no-op cursorMove (0,0) patches
 * - Concat adjacent style patches (transition diffs — can't drop either)
 * - Dedupe consecutive hyperlinks with same URI
 * - Cancel cursor hide/show pairs
 * - Remove clear patches with count 0
 */
export declare function optimize(diff: Diff): Diff;
//# sourceMappingURL=optimizer.d.ts.map