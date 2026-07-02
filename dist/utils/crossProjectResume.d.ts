import type { LogOption } from '../types/logs.js';
export type CrossProjectResumeResult = {
    isCrossProject: false;
} | {
    isCrossProject: true;
    isSameRepoWorktree: true;
    projectPath: string;
} | {
    isCrossProject: true;
    isSameRepoWorktree: false;
    command: string;
    projectPath: string;
};
/**
 * Check if a log is from a different project directory and determine
 * whether it's a related worktree or a completely different project.
 *
 * For same-repo worktrees, we can resume directly without requiring cd.
 * For different projects, we generate the cd command.
 */
export declare function checkCrossProjectResume(log: LogOption, showAllProjects: boolean, worktreePaths: string[]): CrossProjectResumeResult;
//# sourceMappingURL=crossProjectResume.d.ts.map