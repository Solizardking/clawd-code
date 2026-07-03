export function getTelegramSourceLabel(kind, userId) {
    return kind === "user" ? `Telegram user ${userId}` : `Telegram Grok • user ${userId}`;
}
export function buildUserEntry(content, decoration = {}) {
    return {
        type: "user",
        content,
        timestamp: new Date(),
        modeColor: decoration.modeColor,
        remoteKey: decoration.remoteKey,
        sourceLabel: decoration.sourceLabel,
    };
}
export function buildAssistantEntry(content, decoration = {}) {
    return {
        type: "assistant",
        content,
        timestamp: new Date(),
        modeColor: decoration.modeColor,
        remoteKey: decoration.remoteKey,
        sourceLabel: decoration.sourceLabel,
    };
}
export function buildToolResultEntry(toolCall, toolResult, decoration = {}) {
    return {
        type: "tool_result",
        content: toolResult.success ? toolResult.output || "Success" : toolResult.error || "Error",
        timestamp: new Date(),
        modeColor: decoration.modeColor,
        remoteKey: decoration.remoteKey,
        sourceLabel: decoration.sourceLabel,
        toolCall,
        toolResult,
    };
}
export function getUnflushedTelegramAssistantContent(fullContent, flushedChars) {
    const safeStart = Math.max(0, Math.min(flushedChars, fullContent.length));
    return fullContent.slice(safeStart);
}
export function replaceTurnEntries(entries, turnKey, replacements) {
    return [...entries.filter((entry) => entry.remoteKey !== turnKey), ...replacements];
}
export function decorateTelegramEntries(entries, userId, turnKey) {
    return entries.map((entry) => {
        if (entry.type === "user") {
            return {
                ...entry,
                remoteKey: turnKey,
                sourceLabel: getTelegramSourceLabel("user", userId),
            };
        }
        if (entry.type === "assistant") {
            return {
                ...entry,
                remoteKey: turnKey,
                sourceLabel: getTelegramSourceLabel("assistant", userId),
            };
        }
        return {
            ...entry,
            remoteKey: turnKey,
        };
    });
}
//# sourceMappingURL=telegram-turn-ui.js.map