import type { LocalCommandCall } from '../types/command.js';
declare const version: {
    type: "local";
    name: string;
    description: string;
    isEnabled: () => boolean;
    supportsNonInteractive: true;
    load: () => Promise<{
        call: LocalCommandCall;
    }>;
};
export default version;
//# sourceMappingURL=version.d.ts.map