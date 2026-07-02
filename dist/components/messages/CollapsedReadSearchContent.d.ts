import React from 'react';
import { type Tools } from '../../Tool.js';
import type { CollapsedReadSearchGroup } from '../../types/message.js';
import type { buildMessageLookups } from '../../utils/messages.js';
type Props = {
    message: CollapsedReadSearchGroup;
    inProgressToolUseIDs: Set<string>;
    shouldAnimate: boolean;
    verbose: boolean;
    tools: Tools;
    lookups: ReturnType<typeof buildMessageLookups>;
    /** True if this is the currently active collapsed group (last one, still loading) */
    isActiveGroup?: boolean;
};
export declare function CollapsedReadSearchContent({ message, inProgressToolUseIDs, shouldAnimate, verbose, tools, lookups, isActiveGroup }: Props): React.ReactNode;
export {};
//# sourceMappingURL=CollapsedReadSearchContent.d.ts.map