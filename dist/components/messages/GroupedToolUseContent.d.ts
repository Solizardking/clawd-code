import * as React from 'react';
import { type Tools } from '../../Tool.js';
import type { GroupedToolUseMessage } from '../../types/message.js';
import type { buildMessageLookups } from '../../utils/messages.js';
type Props = {
    message: GroupedToolUseMessage;
    tools: Tools;
    lookups: ReturnType<typeof buildMessageLookups>;
    inProgressToolUseIDs: Set<string>;
    shouldAnimate: boolean;
};
export declare function GroupedToolUseContent({ message, tools, lookups, inProgressToolUseIDs, shouldAnimate }: Props): React.ReactNode;
export {};
//# sourceMappingURL=GroupedToolUseContent.d.ts.map