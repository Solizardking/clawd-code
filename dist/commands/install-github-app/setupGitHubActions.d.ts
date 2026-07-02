import type { Workflow } from './types.js';
export declare function setupGitHubActions(repoName: string, apiKeyOrOAuthToken: string | null, secretName: string, updateProgress: () => void, skipWorkflow: boolean | undefined, selectedWorkflows: Workflow[], authType: 'api_key' | 'oauth_token', context?: {
    useCurrentRepo?: boolean;
    workflowExists?: boolean;
    secretExists?: boolean;
}): Promise<void>;
//# sourceMappingURL=setupGitHubActions.d.ts.map