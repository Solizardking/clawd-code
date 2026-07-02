import type { SuggestionItem } from 'src/components/PromptInput/PromptInputFooterSuggestions.js';
import type { ServerResource } from 'src/services/mcp/types.js';
import type { AgentDefinition } from 'src/tools/AgentTool/loadAgentsDir.js';
export declare function generateUnifiedSuggestions(query: string, mcpResources: Record<string, ServerResource[]>, agents: AgentDefinition[], showOnEmpty?: boolean): Promise<SuggestionItem[]>;
//# sourceMappingURL=unifiedSuggestions.d.ts.map