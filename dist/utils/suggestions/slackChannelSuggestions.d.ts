import type { SuggestionItem } from '../../components/PromptInput/PromptInputFooterSuggestions.js';
import type { MCPServerConnection } from '../../services/mcp/types.js';
export declare const subscribeKnownChannels: (listener: () => void) => () => void;
export declare function hasSlackMcpServer(clients: MCPServerConnection[]): boolean;
export declare function getKnownChannelsVersion(): number;
export declare function findSlackChannelPositions(text: string): Array<{
    start: number;
    end: number;
}>;
export declare function getSlackChannelSuggestions(clients: MCPServerConnection[], searchToken: string): Promise<SuggestionItem[]>;
export declare function clearSlackChannelCache(): void;
//# sourceMappingURL=slackChannelSuggestions.d.ts.map