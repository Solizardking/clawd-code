import type { SettingSource } from 'src/utils/settings/constants.js';
import type { AgentDefinition } from '../../tools/AgentTool/loadAgentsDir.js';
export declare const AGENT_PATHS: {
    readonly FOLDER_NAME: ".claude";
    readonly AGENTS_DIR: "agents";
};
type WithPreviousMode = {
    previousMode: ModeState;
};
type WithAgent = {
    agent: AgentDefinition;
};
export type ModeState = {
    mode: 'main-menu';
} | {
    mode: 'list-agents';
    source: SettingSource | 'all' | 'built-in';
} | ({
    mode: 'agent-menu';
} & WithAgent & WithPreviousMode) | ({
    mode: 'view-agent';
} & WithAgent & WithPreviousMode) | {
    mode: 'create-agent';
} | ({
    mode: 'edit-agent';
} & WithAgent & WithPreviousMode) | ({
    mode: 'delete-confirm';
} & WithAgent & WithPreviousMode);
export type AgentValidationResult = {
    isValid: boolean;
    warnings: string[];
    errors: string[];
};
export {};
//# sourceMappingURL=types.d.ts.map