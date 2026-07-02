import type { SDKMessage } from '../entrypoints/agentSdkTypes.js';
export declare const HISTORY_PAGE_SIZE = 100;
export type HistoryPage = {
    /** Chronological order within the page. */
    events: SDKMessage[];
    /** Oldest event ID in this page → before_id cursor for next-older page. */
    firstId: string | null;
    /** true = older events exist. */
    hasMore: boolean;
};
export type HistoryAuthCtx = {
    baseUrl: string;
    headers: Record<string, string>;
};
/** Prepare auth + headers + base URL once, reuse across pages. */
export declare function createHistoryAuthCtx(sessionId: string): Promise<HistoryAuthCtx>;
/**
 * Newest page: last `limit` events, chronological, via anchor_to_latest.
 * has_more=true means older events exist.
 */
export declare function fetchLatestEvents(ctx: HistoryAuthCtx, limit?: number): Promise<HistoryPage | null>;
/** Older page: events immediately before `beforeId` cursor. */
export declare function fetchOlderEvents(ctx: HistoryAuthCtx, beforeId: string, limit?: number): Promise<HistoryPage | null>;
//# sourceMappingURL=sessionHistory.d.ts.map