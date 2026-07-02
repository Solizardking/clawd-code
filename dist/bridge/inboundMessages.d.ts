import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import type { UUID } from 'crypto';
import type { SDKMessage } from '../entrypoints/agentSdkTypes.js';
/**
 * Process an inbound user message from the bridge, extracting content
 * and UUID for enqueueing. Supports both string content and
 * ContentBlockParam[] (e.g. messages containing images).
 *
 * Normalizes image blocks from bridge clients that may use camelCase
 * `mediaType` instead of snake_case `media_type` (mobile-apps#5825).
 *
 * Returns the extracted fields, or undefined if the message should be
 * skipped (non-user type, missing/empty content).
 */
export declare function extractInboundMessageFields(msg: SDKMessage): {
    content: string | Array<ContentBlockParam>;
    uuid: UUID | undefined;
} | undefined;
/**
 * Normalize image content blocks from bridge clients. iOS/web clients may
 * send `mediaType` (camelCase) instead of `media_type` (snake_case), or
 * omit the field entirely. Without normalization, the bad block poisons
 * the session — every subsequent API call fails with
 * "media_type: Field required".
 *
 * Fast-path scan returns the original array reference when no
 * normalization is needed (zero allocation on the happy path).
 */
export declare function normalizeImageBlocks(blocks: Array<ContentBlockParam>): Array<ContentBlockParam>;
//# sourceMappingURL=inboundMessages.d.ts.map