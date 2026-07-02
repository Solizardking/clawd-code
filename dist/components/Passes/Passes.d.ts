import * as React from 'react';
import type { CommandResultDisplay } from '../../commands.js';
type Props = {
    onDone: (result?: string, options?: {
        display?: CommandResultDisplay;
    }) => void;
};
export declare function Passes({ onDone }: Props): React.ReactNode;
export {};
//# sourceMappingURL=Passes.d.ts.map