import * as React from 'react';
export type FeedLine = {
    text: string;
    timestamp?: string;
};
export type FeedConfig = {
    title: string;
    lines: FeedLine[];
    footer?: string;
    emptyMessage?: string;
    customContent?: {
        content: React.ReactNode;
        width: number;
    };
};
export declare function calculateFeedWidth(config: FeedConfig): number;
export declare function Feed(t0: any): any;
//# sourceMappingURL=Feed.d.ts.map