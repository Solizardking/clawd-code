import * as React from 'react';
import { type MemoryFileInfo } from './claudemd.js';
import type { getGlobalConfig } from './config.js';
import type { AgentDefinitionsResult } from '../tools/AgentTool/loadAgentsDir.js';
export type StatusNoticeType = 'warning' | 'info';
export type StatusNoticeContext = {
    config: ReturnType<typeof getGlobalConfig>;
    agentDefinitions?: AgentDefinitionsResult;
    memoryFiles: MemoryFileInfo[];
};
export type StatusNoticeDefinition = {
    id: string;
    type: StatusNoticeType;
    isActive: (context: StatusNoticeContext) => boolean;
    render: (context: StatusNoticeContext) => React.ReactNode;
};
export declare const statusNoticeDefinitions: StatusNoticeDefinition[];
export declare function getActiveNotices(context: StatusNoticeContext): StatusNoticeDefinition[];
//# sourceMappingURL=statusNoticeDefinitions.d.ts.map