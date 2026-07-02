import type { ToolResultBlockParam } from '@anthropic-ai/sdk/resources/index.mjs';
import type { NotebookCellSource } from '../types/notebook.js';
/**
 * Reads and parses a Jupyter notebook file into processed cell data
 */
export declare function readNotebook(notebookPath: string, cellId?: string): Promise<NotebookCellSource[]>;
/**
 * Maps notebook cell data to tool result block parameters with sophisticated text block merging
 */
export declare function mapNotebookCellsToToolResult(data: NotebookCellSource[], toolUseID: string): ToolResultBlockParam;
export declare function parseCellId(cellId: string): number | undefined;
//# sourceMappingURL=notebook.d.ts.map