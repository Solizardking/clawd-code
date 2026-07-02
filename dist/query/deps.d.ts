import { queryModelWithStreaming } from '../services/api/claude.js';
import { autoCompactIfNeeded } from '../services/compact/autoCompact.js';
import { microcompactMessages } from '../services/compact/microCompact.js';
export type QueryDeps = {
    callModel: typeof queryModelWithStreaming;
    microcompact: typeof microcompactMessages;
    autocompact: typeof autoCompactIfNeeded;
    uuid: () => string;
};
export declare function productionDeps(): QueryDeps;
//# sourceMappingURL=deps.d.ts.map