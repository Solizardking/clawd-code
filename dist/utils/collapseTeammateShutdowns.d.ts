import type { RenderableMessage } from '../types/message.js';
/**
 * Collapses consecutive in-process teammate shutdown task_status attachments
 * into a single `teammate_shutdown_batch` attachment with a count.
 */
export declare function collapseTeammateShutdowns(messages: RenderableMessage[]): RenderableMessage[];
//# sourceMappingURL=collapseTeammateShutdowns.d.ts.map