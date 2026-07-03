import { jsx as _jsx, jsxs as _jsxs } from "@opentui/react/jsx-runtime";
const MAX_VISIBLE = 8;
export function SuggestionOverlay({ t, suggestions, selectedIndex, }) {
    if (suggestions.length === 0)
        return null;
    const visible = suggestions.slice(0, MAX_VISIBLE);
    return (_jsxs("box", { paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 1, flexShrink: 0, children: [visible.map((filePath, i) => {
                const isSelected = i === selectedIndex;
                return (_jsxs("box", { height: 1, backgroundColor: isSelected ? t.selectedBg : undefined, flexDirection: "row", gap: 1, children: [_jsx("text", { fg: isSelected ? t.accent : t.textDim, children: isSelected ? "›" : " " }), _jsx("text", { fg: isSelected ? t.selected : t.text, children: filePath })] }, filePath));
            }), suggestions.length > MAX_VISIBLE && _jsx("text", { fg: t.textDim, children: `  +${suggestions.length - MAX_VISIBLE} more` })] }));
}
//# sourceMappingURL=SuggestionOverlay.js.map