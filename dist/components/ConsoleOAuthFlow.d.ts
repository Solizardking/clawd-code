import React from 'react';
type Props = {
    onDone(): void;
    startingMessage?: string;
    mode?: 'login' | 'setup-token';
    forceLoginMethod?: 'claudeai' | 'console';
};
export declare function ConsoleOAuthFlow({ onDone, startingMessage, mode, forceLoginMethod: forceLoginMethodProp }: Props): React.ReactNode;
export {};
//# sourceMappingURL=ConsoleOAuthFlow.d.ts.map