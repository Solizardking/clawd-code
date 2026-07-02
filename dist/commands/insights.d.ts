import type { Command } from '../commands.js';
import type { LogOption } from '../types/logs.js';
type RemoteHostInfo = {
    name: string;
    sessionCount: number;
};
type SessionMeta = {
    session_id: string;
    project_path: string;
    start_time: string;
    duration_minutes: number;
    user_message_count: number;
    assistant_message_count: number;
    tool_counts: Record<string, number>;
    languages: Record<string, number>;
    git_commits: number;
    git_pushes: number;
    input_tokens: number;
    output_tokens: number;
    first_prompt: string;
    summary?: string;
    user_interruptions: number;
    user_response_times: number[];
    tool_errors: number;
    tool_error_categories: Record<string, number>;
    uses_task_agent: boolean;
    uses_mcp: boolean;
    uses_web_search: boolean;
    uses_web_fetch: boolean;
    lines_added: number;
    lines_removed: number;
    files_modified: number;
    message_hours: number[];
    user_message_timestamps: string[];
};
type SessionFacets = {
    session_id: string;
    underlying_goal: string;
    goal_categories: Record<string, number>;
    outcome: string;
    user_satisfaction_counts: Record<string, number>;
    claude_helpfulness: string;
    session_type: string;
    friction_counts: Record<string, number>;
    friction_detail: string;
    primary_success: string;
    brief_summary: string;
    user_instructions_to_claude?: string[];
};
type AggregatedData = {
    total_sessions: number;
    total_sessions_scanned?: number;
    sessions_with_facets: number;
    date_range: {
        start: string;
        end: string;
    };
    total_messages: number;
    total_duration_hours: number;
    total_input_tokens: number;
    total_output_tokens: number;
    tool_counts: Record<string, number>;
    languages: Record<string, number>;
    git_commits: number;
    git_pushes: number;
    projects: Record<string, number>;
    goal_categories: Record<string, number>;
    outcomes: Record<string, number>;
    satisfaction: Record<string, number>;
    helpfulness: Record<string, number>;
    session_types: Record<string, number>;
    friction: Record<string, number>;
    success: Record<string, number>;
    session_summaries: Array<{
        id: string;
        date: string;
        summary: string;
        goal?: string;
    }>;
    total_interruptions: number;
    total_tool_errors: number;
    tool_error_categories: Record<string, number>;
    user_response_times: number[];
    median_response_time: number;
    avg_response_time: number;
    sessions_using_task_agent: number;
    sessions_using_mcp: number;
    sessions_using_web_search: number;
    sessions_using_web_fetch: number;
    total_lines_added: number;
    total_lines_removed: number;
    total_files_modified: number;
    days_active: number;
    messages_per_day: number;
    message_hours: number[];
    multi_clauding: {
        overlap_events: number;
        sessions_involved: number;
        user_messages_during: number;
    };
};
/**
 * Deduplicate conversation branches within the same session.
 *
 * When a session file has multiple leaf messages (from retries or branching),
 * loadAllLogsFromSessionFile produces one LogOption per leaf. Each branch
 * shares the same root message, so its duration overlaps with sibling
 * branches. This keeps only the branch with the most user messages
 * (tie-break by longest duration) per session_id.
 */
export declare function deduplicateSessionBranches(entries: Array<{
    log: LogOption;
    meta: SessionMeta;
}>): Array<{
    log: LogOption;
    meta: SessionMeta;
}>;
/**
 * Detects multi-clauding (using multiple Claude sessions concurrently).
 * Uses a sliding window to find the pattern: session1 -> session2 -> session1
 * within a 30-minute window.
 */
export declare function detectMultiClauding(sessions: Array<{
    session_id: string;
    user_message_timestamps: string[];
}>): {
    overlap_events: number;
    sessions_involved: number;
    user_messages_during: number;
};
type InsightResults = {
    at_a_glance?: {
        whats_working?: string;
        whats_hindering?: string;
        quick_wins?: string;
        ambitious_workflows?: string;
    };
    project_areas?: {
        areas?: Array<{
            name: string;
            session_count: number;
            description: string;
        }>;
    };
    interaction_style?: {
        narrative?: string;
        key_pattern?: string;
    };
    what_works?: {
        intro?: string;
        impressive_workflows?: Array<{
            title: string;
            description: string;
        }>;
    };
    friction_analysis?: {
        intro?: string;
        categories?: Array<{
            category: string;
            description: string;
            examples?: string[];
        }>;
    };
    suggestions?: {
        claude_md_additions?: Array<{
            addition: string;
            why: string;
            where?: string;
            prompt_scaffold?: string;
        }>;
        features_to_try?: Array<{
            feature: string;
            one_liner: string;
            why_for_you: string;
            example_code?: string;
        }>;
        usage_patterns?: Array<{
            title: string;
            suggestion: string;
            detail?: string;
            copyable_prompt?: string;
        }>;
    };
    on_the_horizon?: {
        intro?: string;
        opportunities?: Array<{
            title: string;
            whats_possible: string;
            how_to_try?: string;
            copyable_prompt?: string;
        }>;
    };
    cc_team_improvements?: {
        improvements?: Array<{
            title: string;
            detail: string;
            evidence?: string;
        }>;
    };
    model_behavior_improvements?: {
        improvements?: Array<{
            title: string;
            detail: string;
            evidence?: string;
        }>;
    };
    fun_ending?: {
        headline?: string;
        detail?: string;
    };
};
/**
 * Structured export format for claudescope consumption
 */
export type InsightsExport = {
    metadata: {
        username: string;
        generated_at: string;
        claude_code_version: string;
        date_range: {
            start: string;
            end: string;
        };
        session_count: number;
        remote_hosts_collected?: string[];
    };
    aggregated_data: AggregatedData;
    insights: InsightResults;
    facets_summary?: {
        total: number;
        goal_categories: Record<string, number>;
        outcomes: Record<string, number>;
        satisfaction: Record<string, number>;
        friction: Record<string, number>;
    };
};
/**
 * Build export data from already-computed values.
 * Used by background upload to S3.
 */
export declare function buildExportData(data: AggregatedData, insights: InsightResults, facets: Map<string, SessionFacets>, remoteStats?: {
    hosts: RemoteHostInfo[];
    totalCopied: number;
}): InsightsExport;
export declare function generateUsageReport(options?: {
    collectRemote?: boolean;
}): Promise<{
    insights: InsightResults;
    htmlPath: string;
    data: AggregatedData;
    remoteStats?: {
        hosts: RemoteHostInfo[];
        totalCopied: number;
    };
    facets: Map<string, SessionFacets>;
}>;
declare const usageReport: Command;
export default usageReport;
//# sourceMappingURL=insights.d.ts.map