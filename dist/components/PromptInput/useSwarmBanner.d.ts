import type { Theme } from '../../utils/theme.js';
type SwarmBannerInfo = {
    text: string;
    bgColor: keyof Theme;
} | null;
/**
 * Hook that returns banner information for swarm, standalone agent, or --agent CLI context.
 * - Leader (not in tmux): Returns "tmux -L ... attach" command with cyan background
 * - Leader (in tmux / in-process): Falls through to standalone-agent check — shows
 *   /rename name + /color background if set, else null
 * - Teammate: Returns "teammate@team" format with their assigned color background
 * - Viewing a background agent (CoordinatorTaskPanel): Returns agent name with its color
 * - Standalone agent: Returns agent name with their color background (no @team)
 * - --agent CLI flag: Returns "@agentName" with cyan background
 */
export declare function useSwarmBanner(): SwarmBannerInfo;
export {};
//# sourceMappingURL=useSwarmBanner.d.ts.map