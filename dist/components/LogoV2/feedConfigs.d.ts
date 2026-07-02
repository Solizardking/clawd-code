import type { Step } from '../../projectOnboardingState.js';
import type { LogOption } from '../../types/logs.js';
import type { FeedConfig } from './Feed.js';
export declare function createRecentActivityFeed(activities: LogOption[]): FeedConfig;
export declare function createWhatsNewFeed(releaseNotes: string[]): FeedConfig;
export declare function createProjectOnboardingFeed(steps: Step[]): FeedConfig;
export declare function createGuestPassesFeed(): FeedConfig;
//# sourceMappingURL=feedConfigs.d.ts.map