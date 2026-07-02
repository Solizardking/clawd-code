/**
 * Periodic background summarization for coordinator mode sub-agents.
 *
 * Forks the sub-agent's conversation every ~30s using runForkedAgent()
 * to generate a 1-2 sentence progress summary. The summary is stored
 * on AgentProgress for UI display.
 *
 * Cache sharing: uses the same CacheSafeParams as the parent agent
 * to share the prompt cache. Tools are kept in the request for cache
 * key matching but denied via canUseTool callback.
 */
import type { TaskContext } from '../../Task.js';
import type { AgentId } from '../../types/ids.js';
import { type CacheSafeParams } from '../../utils/forkedAgent.js';
export declare function startAgentSummarization(taskId: string, agentId: AgentId, cacheSafeParams: CacheSafeParams, setAppState: TaskContext['setAppState']): {
    stop: () => void;
};
//# sourceMappingURL=agentSummary.d.ts.map