export type PrReviewState = 'approved' | 'pending' | 'changes_requested' | 'draft' | 'merged' | 'closed';
export type PrStatus = {
    number: number;
    url: string;
    reviewState: PrReviewState;
};
/**
 * Derive review state from GitHub API values.
 * Draft PRs always show as 'draft' regardless of reviewDecision.
 * reviewDecision can be: APPROVED, CHANGES_REQUESTED, REVIEW_REQUIRED, or empty string.
 */
export declare function deriveReviewState(isDraft: boolean, reviewDecision: string): PrReviewState;
/**
 * Fetch PR status for the current branch using `gh pr view`.
 * Returns null on any failure (gh not installed, no PR, not in git repo, etc).
 * Also returns null if the PR's head branch is the default branch (e.g., main/master).
 */
export declare function fetchPrStatus(): Promise<PrStatus | null>;
//# sourceMappingURL=ghPrStatus.d.ts.map