import * as React from 'react';
import type { CommandResultDisplay } from '../../commands.js';
export declare function playAnimation(skillDir: string): Promise<{
    success: boolean;
    message: string;
}>;
export declare function call(onDone: (result?: string, options?: {
    display?: CommandResultDisplay;
    shouldQuery?: boolean;
}) => void): Promise<React.ReactNode>;
//# sourceMappingURL=thinkback.d.ts.map