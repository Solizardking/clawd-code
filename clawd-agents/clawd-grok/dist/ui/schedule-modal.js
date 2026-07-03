import { jsx as _jsx, jsxs as _jsxs } from "@opentui/react/jsx-runtime";
import { useEffect, useRef } from "react";
export function buildScheduleBrowseRows(schedules, query) {
    const q = query.trim().toLowerCase();
    const filtered = q
        ? schedules.filter((schedule) => schedule.name.toLowerCase().includes(q) ||
            schedule.id.toLowerCase().includes(q) ||
            schedule.instruction.toLowerCase().includes(q) ||
            (schedule.cron ?? "").toLowerCase().includes(q))
        : schedules;
    return filtered.map((schedule) => ({ kind: "schedule", schedule }));
}
function bottomAlignedModalTop(height, panelHeight) {
    return Math.max(2, Math.floor((height - panelHeight) / 2));
}
export function ScheduleBrowserModal({ t, width, height, selectedIndex, searchQuery, rows, }) {
    const listRef = useRef(null);
    useEffect(() => {
        const selected = rows[selectedIndex];
        if (!selected)
            return;
        listRef.current?.scrollChildIntoView(`schedule-${selected.schedule.id}`);
    }, [rows, selectedIndex]);
    const itemCount = Math.max(rows.length, 1);
    const contentHeight = itemCount + 10;
    const panelHeight = Math.min(contentHeight, Math.floor(height * 0.6));
    const panelWidth = Math.min(60, width - 6);
    const overlayBg = "#000000cc";
    return (_jsx("box", { position: "absolute", left: 0, top: 0, width: width, height: height, alignItems: "center", paddingTop: bottomAlignedModalTop(height, panelHeight), backgroundColor: overlayBg, children: _jsxs("box", { width: panelWidth, height: panelHeight, backgroundColor: t.backgroundPanel, paddingTop: 1, paddingBottom: 1, flexDirection: "column", children: [_jsxs("box", { flexShrink: 0, flexDirection: "row", justifyContent: "space-between", paddingLeft: 2, paddingRight: 2, children: [_jsx("text", { fg: t.primary, children: _jsx("b", { children: "Schedules" }) }), _jsx("text", { fg: t.textMuted, children: "esc" })] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, children: _jsx("text", { fg: t.text, children: searchQuery || _jsx("span", { style: { fg: t.textMuted }, children: "Search by name, cron, instruction..." }) }) }), _jsxs("scrollbox", { ref: listRef, flexGrow: 1, minHeight: 0, children: [rows.map((row, idx) => {
                            const selected = idx === selectedIndex;
                            const schedule = row.schedule;
                            const scheduleText = schedule.cron ?? "runs once immediately";
                            return (_jsx("box", { id: `schedule-${schedule.id}`, width: "100%", backgroundColor: selected ? t.selectedBg : undefined, paddingLeft: 2, paddingRight: 2, children: _jsxs("box", { width: "100%", flexDirection: "row", children: [_jsx("text", { fg: selected ? t.primary : t.text, children: _jsx("b", { children: schedule.name }) }), _jsx("text", { fg: t.textMuted, children: ` - ${scheduleText}` })] }) }, `schedule-${schedule.id}`));
                        }), rows.length === 0 ? (_jsx("box", { paddingLeft: 2, paddingRight: 2, children: _jsx("text", { fg: t.textMuted, children: "No schedules yet" }) })) : null] }), _jsx("box", { flexShrink: 0, paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 1, children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.primary }, children: "enter " }), _jsx("span", { style: { fg: t.textMuted }, children: "details · " }), _jsx("span", { style: { fg: t.primary }, children: "ctrl+x " }), _jsx("span", { style: { fg: t.textMuted }, children: "remove" })] }) })] }) }));
}
//# sourceMappingURL=schedule-modal.js.map