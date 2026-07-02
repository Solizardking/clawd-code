import type { LogOption } from '../types/logs.js';
/**
 * Performs an agentic search using Claude to find relevant sessions
 * based on semantic understanding of the query.
 */
export declare function agenticSessionSearch(query: string, logs: LogOption[], signal?: AbortSignal): Promise<LogOption[]>;
//# sourceMappingURL=agenticSessionSearch.d.ts.map