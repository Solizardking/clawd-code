import type { TextBlockParam } from '@anthropic-ai/sdk/resources/index.mjs';
import React from 'react';
type Props = {
    addMargin: boolean;
    param: TextBlockParam;
    isTranscriptMode?: boolean;
    timestamp?: string;
};
export declare function UserPromptMessage({ addMargin, param: { text }, isTranscriptMode, timestamp }: Props): React.ReactNode;
export {};
//# sourceMappingURL=UserPromptMessage.d.ts.map