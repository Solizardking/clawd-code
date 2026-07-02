import { type CompletionType } from '../../utils/unaryLogging.js';
import type { ToolUseConfirm } from './PermissionRequest.js';
export declare function logUnaryPermissionEvent(completion_type: CompletionType, { assistantMessage: { message: { id: message_id }, }, }: ToolUseConfirm, event: 'accept' | 'reject', hasFeedback?: boolean): void;
//# sourceMappingURL=utils.d.ts.map