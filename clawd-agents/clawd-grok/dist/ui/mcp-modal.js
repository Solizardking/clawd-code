import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@opentui/react/jsx-runtime";
import { useEffect, useRef } from "react";
import { toMcpServerId } from "../mcp/validate";
const EDITOR_KEYBINDINGS = [{ name: "return", action: "submit" }];
function bottomAlignedModalTop(height, panelHeight) {
    return Math.max(2, Math.floor((height - panelHeight) / 2));
}
export function buildMcpBrowseRows(servers, catalog, query) {
    const q = query.trim().toLowerCase();
    const catalogById = new Map(catalog.map((entry) => [toMcpServerId(entry.id), entry]));
    const filteredServers = q
        ? servers.filter((server) => server.label.toLowerCase().includes(q) ||
            server.id.toLowerCase().includes(q) ||
            server.transport.toLowerCase().includes(q))
        : servers;
    const savedIds = new Set(servers.map((server) => toMcpServerId(server.id || server.label)));
    const filteredCatalog = (q
        ? catalog.filter((entry) => entry.name.toLowerCase().includes(q) ||
            entry.id.toLowerCase().includes(q) ||
            entry.description.toLowerCase().includes(q))
        : catalog).filter((entry) => !savedIds.has(toMcpServerId(entry.id)));
    return [
        ...filteredServers.map((server) => {
            const catalogEntry = catalogById.get(toMcpServerId(server.id || server.label));
            return {
                kind: "server",
                server,
                description: catalogEntry?.description ?? "Custom MCP server",
            };
        }),
        ...filteredCatalog.map((entry) => ({ kind: "catalog", entry })),
        { kind: "add" },
    ];
}
export function McpBrowserModal({ t, width, height, selectedIndex, searchQuery, rows, }) {
    const listRef = useRef(null);
    useEffect(() => {
        const selected = rows[selectedIndex];
        if (!selected)
            return;
        if (selected.kind === "server") {
            listRef.current?.scrollChildIntoView(`mcp-server-${selected.server.id}`);
        }
        else if (selected.kind === "catalog") {
            listRef.current?.scrollChildIntoView(`mcp-catalog-${selected.entry.id}`);
        }
        else {
            listRef.current?.scrollChildIntoView("mcp-add");
        }
    }, [rows, selectedIndex]);
    const itemCount = Math.max(rows.length, 1);
    const contentHeight = itemCount + 7;
    const maxHeight = Math.floor(height * 0.68);
    const panelHeight = Math.min(contentHeight, maxHeight);
    const overlayBg = "#000000cc";
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: bottomAlignedModalTop(height, panelHeight), backgroundColor: overlayBg, children: _jsxs("box", { width: Math.min(96, width - 4), height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "MCP Servers" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, children: _jsx("text", { fg: t.text, children: searchQuery || _jsx("span", { style: { fg: t.textMuted }, children: "Search servers..." }) }) }), _jsx("scrollbox", { ref: listRef, flexGrow: 1, minHeight: 0, children: rows.map((row, idx) => {
                        const selected = idx === selectedIndex;
                        if (row.kind === "server") {
                            const enabledColor = row.server.enabled ? t.diffAddedFg : selected ? t.selected : t.text;
                            return (_jsxs("box", { id: `mcp-server-${row.server.id}`, backgroundColor: selected ? t.selectedBg : undefined, paddingLeft: 2, paddingRight: 2, children: [_jsxs("box", { flexDirection: "row", justifyContent: "space-between", children: [_jsxs("text", { fg: enabledColor, children: [row.server.enabled ? "■ " : "□ ", row.server.label] }), _jsx("text", { fg: row.server.enabled ? t.diffAddedFg : t.textMuted, children: row.server.transport })] }), _jsx("text", { fg: t.textMuted, children: row.description })] }, `server-${row.server.id}`));
                        }
                        if (row.kind === "catalog") {
                            return (_jsxs("box", { id: `mcp-catalog-${row.entry.id}`, backgroundColor: selected ? t.selectedBg : undefined, paddingLeft: 2, paddingRight: 2, children: [_jsxs("box", { flexDirection: "row", justifyContent: "space-between", children: [_jsxs("text", { fg: selected ? t.selected : t.text, children: ["□ ", row.entry.name] }), _jsx("text", { fg: t.textMuted, children: "Popular" })] }), _jsx("text", { fg: t.textMuted, children: row.entry.description })] }, `catalog-${row.entry.id}`));
                        }
                        return (_jsx("box", { id: "mcp-add", backgroundColor: selected ? t.selectedBg : undefined, paddingLeft: 2, paddingRight: 2, children: _jsx("text", { fg: selected ? t.selected : t.primary, children: _jsx("b", { children: "□ Add Custom MCP" }) }) }, "mcp-add"));
                    }) }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 1, children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "enter " }), _jsx("span", { style: { fg: t.textMuted }, children: "toggle  ·  " }), _jsx("span", { style: { fg: t.primary }, children: "ctrl+e " }), _jsx("span", { style: { fg: t.textMuted }, children: "edit  ·  " }), _jsx("span", { style: { fg: t.primary }, children: "ctrl+a " }), _jsx("span", { style: { fg: t.textMuted }, children: "add  ·  " }), _jsx("span", { style: { fg: t.primary }, children: "ctrl+x " }), _jsx("span", { style: { fg: t.textMuted }, children: "delete" })] }) })] }) }));
}
function syncRef(ref, value) {
    ref.current?.clear();
    if (value) {
        ref.current?.insertText(value);
    }
}
export function McpEditorModal({ t, width, height, draft, focusedField, syncKey, error, title, labelRef, urlRef, headersRef, commandRef, argsRef, cwdRef, envRef, onSubmit, }) {
    const panelHeight = Math.min(30, Math.floor(height * 0.82));
    const overlayBg = "#000000cc";
    const isRemote = draft.transport === "http" || draft.transport === "sse";
    // biome-ignore lint/correctness/useExhaustiveDependencies: syncKey is an intentional cache-bust prop
    useEffect(() => {
        syncRef(labelRef, draft.label);
        syncRef(urlRef, draft.url);
        syncRef(headersRef, draft.headersText);
        syncRef(commandRef, draft.command);
        syncRef(argsRef, draft.argsText);
        syncRef(cwdRef, draft.cwd);
        syncRef(envRef, draft.envText);
    }, [draft, syncKey, labelRef, urlRef, headersRef, commandRef, argsRef, cwdRef, envRef]);
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: bottomAlignedModalTop(height, panelHeight), backgroundColor: overlayBg, children: _jsxs("box", { width: Math.min(86, width - 6), height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: title }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: _jsxs("box", { flexDirection: "row", gap: 1, alignItems: "center", children: [_jsx("text", { fg: focusedField === "transport" ? t.primary : t.textMuted, children: "Transport" }), ["stdio", "http", "sse"].map((option) => {
                                const active = draft.transport === option;
                                const focused = focusedField === "transport";
                                return (_jsx("box", { backgroundColor: active ? (focused ? t.selectedBg : t.backgroundElement) : undefined, paddingLeft: 1, paddingRight: 1, children: _jsx("text", { fg: active ? (focused ? t.primary : t.text) : t.textMuted, children: option }) }, option));
                            })] }) }), _jsxs("scrollbox", { flexGrow: 1, minHeight: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, children: [_jsxs("box", { paddingBottom: 1, children: [_jsx("text", { fg: focusedField === "label" ? t.primary : t.textMuted, children: "Label" }), _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, children: _jsx("textarea", { ref: labelRef, focused: focusedField === "label", placeholder: "GitHub MCP", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 1, maxHeight: 2, wrapMode: "word", keyBindings: EDITOR_KEYBINDINGS, onSubmit: onSubmit }) })] }), isRemote ? (_jsxs(_Fragment, { children: [_jsxs("box", { paddingBottom: 1, children: [_jsx("text", { fg: focusedField === "url" ? t.primary : t.textMuted, children: "URL" }), _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, children: _jsx("textarea", { ref: urlRef, focused: focusedField === "url", placeholder: "https://example.com/mcp", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 1, maxHeight: 3, wrapMode: "word", keyBindings: EDITOR_KEYBINDINGS, onSubmit: onSubmit }) })] }), _jsxs("box", { paddingBottom: 1, children: [_jsx("text", { fg: focusedField === "headers" ? t.primary : t.textMuted, children: "Headers (one Header: value per line)" }), _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, children: _jsx("textarea", { ref: headersRef, focused: focusedField === "headers", placeholder: "Authorization: Bearer ...", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 2, maxHeight: 6, wrapMode: "word", keyBindings: EDITOR_KEYBINDINGS, onSubmit: onSubmit }) })] })] })) : (_jsxs(_Fragment, { children: [_jsxs("box", { paddingBottom: 1, children: [_jsx("text", { fg: focusedField === "command" ? t.primary : t.textMuted, children: "Command" }), _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, children: _jsx("textarea", { ref: commandRef, focused: focusedField === "command", placeholder: "npx", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 1, maxHeight: 2, wrapMode: "word", keyBindings: EDITOR_KEYBINDINGS, onSubmit: onSubmit }) })] }), _jsxs("box", { paddingBottom: 1, children: [_jsx("text", { fg: focusedField === "args" ? t.primary : t.textMuted, children: "Arguments (one per line)" }), _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, children: _jsx("textarea", { ref: argsRef, focused: focusedField === "args", placeholder: "-y\n@scope/server", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 2, maxHeight: 6, wrapMode: "word", keyBindings: EDITOR_KEYBINDINGS, onSubmit: onSubmit }) })] }), _jsxs("box", { paddingBottom: 1, children: [_jsx("text", { fg: focusedField === "cwd" ? t.primary : t.textMuted, children: "Working Directory (optional)" }), _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, children: _jsx("textarea", { ref: cwdRef, focused: focusedField === "cwd", placeholder: "/path/to/project", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 1, maxHeight: 2, wrapMode: "word", keyBindings: EDITOR_KEYBINDINGS, onSubmit: onSubmit }) })] })] })), _jsxs("box", { paddingBottom: 1, children: [_jsx("text", { fg: focusedField === "env" ? t.primary : t.textMuted, children: "Extra Env (one KEY=value per line)" }), _jsx("box", { backgroundColor: t.backgroundElement, paddingLeft: 1, paddingRight: 1, children: _jsx("textarea", { ref: envRef, focused: focusedField === "env", placeholder: "API_KEY=...", textColor: t.text, backgroundColor: t.backgroundElement, placeholderColor: t.textMuted, minHeight: 2, maxHeight: 6, wrapMode: "word", keyBindings: EDITOR_KEYBINDINGS, onSubmit: onSubmit }) })] })] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 1, children: error ? (_jsx("text", { fg: t.diffRemovedFg, children: error })) : (_jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "enter " }), _jsx("span", { style: { fg: t.textMuted }, children: "save  ·  " }), _jsx("span", { style: { fg: t.primary }, children: "tab " }), _jsx("span", { style: { fg: t.textMuted }, children: "next field  ·  " }), _jsx("span", { style: { fg: t.primary }, children: "←→ " }), _jsx("span", { style: { fg: t.textMuted }, children: "transport" })] })) })] }) }));
}
//# sourceMappingURL=mcp-modal.js.map