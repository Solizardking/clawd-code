/**
 * Resolve file_uuid attachments on inbound bridge user messages.
 *
 * Web composer uploads via cookie-authed /api/{org}/upload, sends file_uuid
 * alongside the message. Here we fetch each via GET /api/oauth/files/{uuid}/content
 * (oauth-authed, same store), write to ~/.claude/uploads/{sessionId}/, and
 * return @path refs to prepend. Claude's Read tool takes it from there.
 *
 * Best-effort: any failure (no token, network, non-2xx, disk) logs debug and
 * skips that attachment. The message still reaches Claude, just without @path.
 */
import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import { z } from 'zod/v4';
declare const attachmentSchema: () => any;
export type InboundAttachment = z.infer<ReturnType<typeof attachmentSchema>>;
/** Pull file_attachments off a loosely-typed inbound message. */
export declare function extractInboundAttachments(msg: unknown): InboundAttachment[];
/**
 * Resolve all attachments on an inbound message to a prefix string of
 * @path refs. Empty string if none resolved.
 */
export declare function resolveInboundAttachments(attachments: InboundAttachment[]): Promise<string>;
/**
 * Prepend @path refs to content, whichever form it's in.
 * Targets the LAST text block — processUserInputBase reads inputString
 * from processedBlocks[processedBlocks.length - 1], so putting refs in
 * block[0] means they're silently ignored for [text, image] content.
 */
export declare function prependPathRefs(content: string | Array<ContentBlockParam>, prefix: string): string | Array<ContentBlockParam>;
/**
 * Convenience: extract + resolve + prepend. No-op when the message has no
 * file_attachments field (fast path — no network, returns same reference).
 */
export declare function resolveAndPrepend(msg: unknown, content: string | Array<ContentBlockParam>): Promise<string | Array<ContentBlockParam>>;
export {};
//# sourceMappingURL=inboundAttachments.d.ts.map