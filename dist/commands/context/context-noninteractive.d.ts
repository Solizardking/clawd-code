import type { AppState } from '../../state/AppStateStore.js';
import type { Tools, ToolUseContext } from '../../Tool.js';
import type { AgentDefinitionsResult } from '../../tools/AgentTool/loadAgentsDir.js';
import type { Message } from '../../types/message.js';
import { type ContextData } from '../../utils/analyzeContext.js';
/**
 * Shared data-collection path for `/context` (slash command) and the SDK
 * `get_context_usage` control request. Mirrors query.ts's pre-API transforms
 * (compact boundary, projectView, microcompact) so the token count reflects
 * what the model actually sees.
 */
type CollectContextDataInput = {
    messages: Message[];
    getAppState: () => AppState;
    options: {
        mainLoopModel: string;
        tools: Tools;
        agentDefinitions: AgentDefinitionsResult;
        customSystemPrompt?: string;
        appendSystemPrompt?: string;
    };
};
export declare function collectContextData(context: CollectContextDataInput): Promise<ContextData>;
export declare function call(_args: string, context: ToolUseContext): Promise<{
    type: 'text';
    value: string;
}>;
export {};
//# sourceMappingURL=context-noninteractive.d.ts.map