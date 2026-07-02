/**
 * Zod schema for keybindings.json configuration.
 * Used for validation and JSON schema generation.
 */
import { z } from 'zod/v4';
/**
 * Valid context names where keybindings can be applied.
 */
export declare const KEYBINDING_CONTEXTS: readonly ["Global", "Chat", "Autocomplete", "Confirmation", "Help", "Transcript", "HistorySearch", "Task", "ThemePicker", "Settings", "Tabs", "Attachments", "Footer", "MessageSelector", "DiffDialog", "ModelPicker", "Select", "Plugin"];
/**
 * Human-readable descriptions for each keybinding context.
 */
export declare const KEYBINDING_CONTEXT_DESCRIPTIONS: Record<(typeof KEYBINDING_CONTEXTS)[number], string>;
/**
 * All valid keybinding action identifiers.
 */
export declare const KEYBINDING_ACTIONS: readonly ["app:interrupt", "app:exit", "app:toggleTodos", "app:toggleTranscript", "app:toggleBrief", "app:toggleTeammatePreview", "app:toggleTerminal", "app:redraw", "app:globalSearch", "app:quickOpen", "history:search", "history:previous", "history:next", "chat:cancel", "chat:killAgents", "chat:cycleMode", "chat:modelPicker", "chat:fastMode", "chat:thinkingToggle", "chat:submit", "chat:newline", "chat:undo", "chat:externalEditor", "chat:stash", "chat:imagePaste", "chat:messageActions", "autocomplete:accept", "autocomplete:dismiss", "autocomplete:previous", "autocomplete:next", "confirm:yes", "confirm:no", "confirm:previous", "confirm:next", "confirm:nextField", "confirm:previousField", "confirm:cycleMode", "confirm:toggle", "confirm:toggleExplanation", "tabs:next", "tabs:previous", "transcript:toggleShowAll", "transcript:exit", "historySearch:next", "historySearch:accept", "historySearch:cancel", "historySearch:execute", "task:background", "theme:toggleSyntaxHighlighting", "help:dismiss", "attachments:next", "attachments:previous", "attachments:remove", "attachments:exit", "footer:up", "footer:down", "footer:next", "footer:previous", "footer:openSelected", "footer:clearSelection", "footer:close", "messageSelector:up", "messageSelector:down", "messageSelector:top", "messageSelector:bottom", "messageSelector:select", "diff:dismiss", "diff:previousSource", "diff:nextSource", "diff:back", "diff:viewDetails", "diff:previousFile", "diff:nextFile", "modelPicker:decreaseEffort", "modelPicker:increaseEffort", "select:next", "select:previous", "select:accept", "select:cancel", "plugin:toggle", "plugin:install", "permission:toggleDebug", "settings:search", "settings:retry", "settings:close", "voice:pushToTalk"];
/**
 * Schema for a single keybinding block.
 */
export declare const KeybindingBlockSchema: () => any;
/**
 * Schema for the entire keybindings.json file.
 * Uses object wrapper format with optional $schema and $docs metadata.
 */
export declare const KeybindingsSchema: () => any;
/**
 * TypeScript types derived from the schema.
 */
export type KeybindingsSchemaType = z.infer<ReturnType<typeof KeybindingsSchema>>;
//# sourceMappingURL=schema.d.ts.map