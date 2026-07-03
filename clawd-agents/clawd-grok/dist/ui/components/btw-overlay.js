import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "@opentui/react/jsx-runtime";
import { useEffect, useState } from "react";
import { Markdown } from "../markdown.js";
const LOADING_SPINNER_FRAMES = ["⬒", "⬔", "⬓", "⬕"];
function LoadingSpinner() {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setFrame((n) => (n + 1) % LOADING_SPINNER_FRAMES.length), 120);
        return () => clearInterval(id);
    }, []);
    return _jsx(_Fragment, { children: LOADING_SPINNER_FRAMES[frame] });
}
export function BtwOverlay({ state, theme: t }) {
    return (_jsxs("box", { flexDirection: "column", paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, flexShrink: 0, backgroundColor: t.backgroundPanel, children: [_jsxs("text", { children: [_jsx("span", { style: { fg: t.accent }, children: "/btw" }), _jsx("span", { style: { fg: t.textMuted }, children: " — " }), _jsx("span", { style: { fg: t.text }, children: state.question })] }), _jsx("box", { height: 1 }), state.status === "loading" && (_jsxs("text", { children: [_jsx("span", { style: { fg: t.textMuted }, children: _jsx(LoadingSpinner, {}) }), _jsx("span", { style: { fg: t.textMuted }, children: " Answering\u2026" })] })), state.status === "done" && state.answer && _jsx(Markdown, { content: state.answer, t: t }), state.status === "error" && _jsx("text", { fg: t.diffRemovedFg, children: state.error || "Something went wrong." }), state.status !== "loading" && (_jsxs(_Fragment, { children: [_jsx("box", { height: 1 }), _jsxs("text", { children: [_jsx("span", { style: { fg: t.accent }, children: "esc" }), _jsx("span", { style: { fg: t.textMuted }, children: " dismiss" })] })] }))] }));
}
//# sourceMappingURL=btw-overlay.js.map