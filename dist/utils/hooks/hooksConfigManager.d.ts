import type { HookEvent } from 'src/entrypoints/agentSdkTypes.js';
import type { AppState } from '../../state/AppState.js';
import { type IndividualHookConfig } from './hooksSettings.js';
export type MatcherMetadata = {
    fieldToMatch: string;
    values: string[];
};
export type HookEventMetadata = {
    summary: string;
    description: string;
    matcherMetadata?: MatcherMetadata;
};
export declare const getHookEventMetadata: any;
export declare function groupHooksByEventAndMatcher(appState: AppState, toolNames: string[]): Record<HookEvent, Record<string, IndividualHookConfig[]>>;
export declare function getSortedMatchersForEvent(hooksByEventAndMatcher: Record<HookEvent, Record<string, IndividualHookConfig[]>>, event: HookEvent): string[];
export declare function getHooksForMatcher(hooksByEventAndMatcher: Record<HookEvent, Record<string, IndividualHookConfig[]>>, event: HookEvent, matcher: string | null): IndividualHookConfig[];
export declare function getMatcherMetadata(event: HookEvent, toolNames: string[]): MatcherMetadata | undefined;
//# sourceMappingURL=hooksConfigManager.d.ts.map