import * as React from 'react';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import { type EffortValue } from '../../utils/effort.js';
type EffortCommandResult = {
    message: string;
    effortUpdate?: {
        value: EffortValue | undefined;
    };
};
export declare function showCurrentEffort(appStateEffort: EffortValue | undefined, model: string): EffortCommandResult;
export declare function executeEffort(args: string): EffortCommandResult;
export declare function call(onDone: LocalJSXCommandOnDone, _context: unknown, args?: string): Promise<React.ReactNode>;
export {};
//# sourceMappingURL=effort.d.ts.map