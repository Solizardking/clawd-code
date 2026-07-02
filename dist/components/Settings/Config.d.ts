import * as React from 'react';
import type { LocalJSXCommandContext, CommandResultDisplay } from '../../commands.js';
type Props = {
    onClose: (result?: string, options?: {
        display?: CommandResultDisplay;
    }) => void;
    context: LocalJSXCommandContext;
    setTabsHidden: (hidden: boolean) => void;
    onIsSearchModeChange?: (inSearchMode: boolean) => void;
    contentHeight?: number;
};
export declare function Config({ onClose, context, setTabsHidden, onIsSearchModeChange, contentHeight }: Props): React.ReactNode;
export {};
//# sourceMappingURL=Config.d.ts.map