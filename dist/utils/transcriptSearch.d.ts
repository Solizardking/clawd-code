import type { RenderableMessage } from '../types/message.js';
/** Flatten a RenderableMessage to lowercased searchable text. WeakMap-
 *  cached — messages are append-only and immutable so a hit is always
 *  valid. Lowercased at cache time: the only caller immediately
 *  .toLowerCase()d the result, re-lowering ~1.5MB on every keystroke
 *  (the backspace hang). Returns '' for non-searchable types. */
export declare function renderableSearchText(msg: RenderableMessage): string;
/** Tool invocation display: renderToolUseMessage shows input fields like
 *  command (Bash), pattern (Grep), file_path (Read/Edit), prompt (Agent).
 *  Same duck-type strategy as toolResultSearchText — known field names,
 *  unknown → empty. Under-count > phantom. */
export declare function toolUseSearchText(input: unknown): string;
/** Duck-type the tool's native Out for searchable text. Known shapes:
 *  {stdout,stderr} (Bash/Shell), {content} (Grep), {file:{content}} (Read),
 *  {filenames:[]} (Grep/Glob), {output} (generic). Falls back to concating
 *  all top-level string fields — crude but better than indexing model-chatter.
 *  Empty for unknown shapes: under-count > phantom. */
export declare function toolResultSearchText(r: unknown): string;
//# sourceMappingURL=transcriptSearch.d.ts.map