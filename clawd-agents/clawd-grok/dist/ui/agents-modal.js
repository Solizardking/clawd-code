import { jsx as _jsx, jsxs as _jsxs } from "@opentui/react/jsx-runtime";
import { useEffect, useRef } from "react";
import { MODELS } from "../grok/models";
import { formatSubagentName } from "../utils/subagent-display";
const EDITOR_KEYBINDINGS = [{ name: "return", action: "submit" }];
export const SUBAGENT_EDITOR_FIELDS = ["name", "model", "instruction"];
export function buildSubagentBrowseRows(agents, query) {
    const q = query.trim().toLowerCase();
    const filtered = q
        ? agents.filter((agent) => agent.name.toLowerCase().includes(q) ||
            agent.model.toLowerCase().includes(q) ||
            agent.instruction.toLowerCase().includes(q))
        : agents;
    return filtered.map((agent) => ({ kind: "agent", agent }));
}
function bottomAlignedModalTop(height, panelHeight) {
    return Math.max(2, Math.floor((height - panelHeight) / 2));
}
function syncRef(ref, value) {
    ref.current?.clear();
    if (value) {
        ref.current?.insertText(value);
    }
}
export function SubagentsBrowserModal({ t, width, height, selectedIndex, searchQuery, rows, }) {
    const listRef = useRef(null);
    useEffect(() => {
        const selected = rows[selectedIndex];
        if (!selected)
            return;
        listRef.current?.scrollChildIntoView(`subagent-${selected.agent.name}`);
    }, [rows, selectedIndex]);
    const itemCount = Math.max(rows.length, 1);
    const contentHeight = itemCount + 8;
    const panelHeight = Math.min(contentHeight, Math.floor(height * 0.6));
    const panelWidth = Math.min(60, width - 6);
    const overlayBg = "#000000cc";
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: bottomAlignedModalTop(height, panelHeight), backgroundColor: overlayBg, children: _jsxs("box", { width: panelWidth, height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Custom sub-agents" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, children: _jsx("text", { fg: t.text, children: searchQuery || _jsx("span", { style: { fg: t.textMuted }, children: "Search by name, model..." }) }) }), _jsxs("scrollbox", { ref: listRef, flexGrow: 1, minHeight: 0, children: [rows.map((row, idx) => {
                            const selected = idx === selectedIndex;
                            return (_jsx("box", { id: `subagent-${row.agent.name}`, width: "100%", backgroundColor: selected ? t.selectedBg : undefined, paddingLeft: 2, paddingRight: 2, children: _jsxs("box", { width: "100%", flexDirection: "row", justifyContent: "space-between", children: [_jsx("text", { fg: selected ? t.primary : t.text, children: _jsx("b", { children: formatSubagentName(row.agent.name) }) }), _jsx("text", { fg: t.textMuted, children: row.agent.model })] }) }, `agent-${row.agent.name}`));
                        }), rows.length === 0 ? (_jsx("box", { paddingLeft: 2, paddingRight: 2, children: _jsx("text", { fg: t.textMuted, children: "No custom sub-agents yet" }) })) : null] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 1, children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "enter " }), _jsx("span", { style: { fg: t.textMuted }, children: "open selected · " }), _jsx("span", { style: { fg: t.primary }, children: "ctrl+a " }), _jsx("span", { style: { fg: t.textMuted }, children: "add" })] }) })] }) }));
}
export function SubagentEditorModal({ t, width, height, draft, focusedField, modelIndex, error, title, nameRef, instructionRef, onSubmit, showRemoveHint, }) {
    const model = MODELS[modelIndex] ?? MODELS[0];
    const panelWidth = Math.min(68, width - 6);
    const panelHeight = Math.min(28, Math.floor(height * 0.75));
    const overlayBg = "#000000cc";
    useEffect(() => {
        syncRef(nameRef, draft.name);
        syncRef(instructionRef, draft.instruction);
    }, [draft, nameRef, instructionRef]);
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: bottomAlignedModalTop(height, panelHeight), backgroundColor: overlayBg, children: _jsxs("box", { width: panelWidth, height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: title }) }), _jsx("text", { fg: t.textMuted, children: "esc back" })] }), _jsxs("scrollbox", { flexGrow: 1, minHeight: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: [_jsxs("box", { paddingBottom: 1, children: [_jsx("text", { fg: focusedField === "name" ? t.primary : t.textMuted, children: "Name (task tool agent value)" }), _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, children: _jsx("textarea", { ref: nameRef, focused: focusedField === "name", placeholder: "e.g. security-review", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 1, maxHeight: 2, wrapMode: "word", keyBindings: EDITOR_KEYBINDINGS, onSubmit: onSubmit }) })] }), _jsxs("box", { paddingBottom: 1, children: [_jsxs("text", { fg: focusedField === "model" ? t.primary : t.textMuted, children: ["Model - ", _jsx("span", { style: { fg: t.text }, children: `${model.name} (${model.id})` })] }), focusedField === "model" ? _jsx("text", { fg: t.textMuted, children: "up/down or left/right to change model" }) : null] }), _jsxs("box", { paddingBottom: 1, children: [_jsx("text", { fg: focusedField === "instruction" ? t.primary : t.textMuted, children: "Instruction (system prompt)" }), _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, children: _jsx("textarea", { ref: instructionRef, focused: focusedField === "instruction", placeholder: "How this sub-agent should behave...", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 4, maxHeight: 12, wrapMode: "word", keyBindings: EDITOR_KEYBINDINGS, onSubmit: onSubmit }) })] }), error ? (_jsx("box", { paddingBottom: 1, children: _jsx("text", { fg: t.diffRemovedFg, children: error }) })) : null] }), _jsxs("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, flexDirection: "column", gap: 0, children: [showRemoveHint ? (_jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "ctrl+x " }), _jsx("span", { style: { fg: t.textMuted }, children: "remove sub-agent" })] })) : null, _jsx("text", { fg: t.textMuted, children: "tab fields · enter save" })] })] }) }));
}
//# sourceMappingURL=agents-modal.js.map