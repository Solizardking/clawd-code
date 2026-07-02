import type { QuerySource } from 'src/constants/querySource.js';
/**
 * Determines the prompt category for agent usage.
 * Used for analytics to track different agent patterns.
 *
 * @param agentType - The type/name of the agent
 * @param isBuiltInAgent - Whether this is a built-in agent or custom
 * @returns The agent prompt category string
 */
export declare function getQuerySourceForAgent(agentType: string | undefined, isBuiltInAgent: boolean): QuerySource;
/**
 * Determines the prompt category based on output style settings.
 * Used for analytics to track different output style usage.
 *
 * @returns The prompt category string or undefined for default
 */
export declare function getQuerySourceForREPL(): QuerySource;
//# sourceMappingURL=promptCategory.d.ts.map