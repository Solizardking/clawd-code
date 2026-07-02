import type { TextBlockParam } from '@anthropic-ai/sdk/resources/index.mjs';
import * as React from 'react';
type Props = {
    addMargin: boolean;
    param: TextBlockParam;
    isTranscriptMode?: boolean;
};
export declare function UserTeammateMessage({ addMargin, param: { text }, isTranscriptMode }: Props): React.ReactNode;
export declare function TeammateMessageContent(t0: any): any;
export {};
//# sourceMappingURL=UserTeammateMessage.d.ts.map