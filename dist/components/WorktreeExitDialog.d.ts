import React from 'react';
import type { CommandResultDisplay } from 'src/commands.js';
type Props = {
    onDone: (result?: string, options?: {
        display?: CommandResultDisplay;
    }) => void;
    onCancel?: () => void;
};
export declare function WorktreeExitDialog({ onDone, onCancel }: Props): React.ReactNode;
export {};
//# sourceMappingURL=WorktreeExitDialog.d.ts.map