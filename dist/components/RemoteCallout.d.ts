import React from 'react';
type RemoteCalloutSelection = 'enable' | 'dismiss';
type Props = {
    onDone: (selection: RemoteCalloutSelection) => void;
};
export declare function RemoteCallout({ onDone }: Props): React.ReactNode;
/**
 * Check whether to show the remote callout (first-time dialog).
 */
export declare function shouldShowRemoteCallout(): boolean;
export {};
//# sourceMappingURL=RemoteCallout.d.ts.map