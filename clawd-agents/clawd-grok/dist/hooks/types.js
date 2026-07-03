export const HOOK_EVENTS = [
    "PreToolUse",
    "PostToolUse",
    "PostToolUseFailure",
    "UserPromptSubmit",
    "SessionStart",
    "SessionEnd",
    "Stop",
    "StopFailure",
    "SubagentStart",
    "SubagentStop",
    "TaskCreated",
    "TaskCompleted",
    "PreCompact",
    "PostCompact",
    "Notification",
    "InstructionsLoaded",
    "CwdChanged",
];
export function isHookEvent(value) {
    return HOOK_EVENTS.includes(value);
}
/**
 * Returns the matcher query field for a given hook event input,
 * used to filter matchers by their `matcher` string.
 */
export function getMatchQuery(input) {
    switch (input.hook_event_name) {
        case "PreToolUse":
        case "PostToolUse":
        case "PostToolUseFailure":
            return input.tool_name;
        case "SessionStart":
            return input.source;
        case "SubagentStart":
        case "SubagentStop":
        case "TaskCreated":
        case "TaskCompleted":
            return input.agent_type;
        case "PreCompact":
        case "PostCompact":
            return input.trigger;
        default:
            return undefined;
    }
}
//# sourceMappingURL=types.js.map