import { jsxs as _jsxs, jsx as _jsx } from "@opentui/react/jsx-runtime";
export function PlanView({ plan, t }) {
    return (_jsxs("box", { paddingLeft: 3, marginTop: 1, flexShrink: 0, flexDirection: "column", children: [_jsx("box", { marginBottom: 1, children: _jsx("text", { children: _jsx("span", { style: { fg: t.planTitle }, children: _jsxs("b", { children: ["◆ ", plan.title] }) }) }) }), _jsx("box", { paddingLeft: 2, marginBottom: 1, children: _jsx("text", { fg: t.textMuted, children: plan.summary }) }), plan.steps.map((step, i) => (_jsxs("box", { paddingLeft: 2, marginBottom: 0, flexDirection: "column", children: [_jsxs("text", { children: [_jsx("span", { style: { fg: t.planStepNum }, children: `${i + 1}. ` }), _jsx("span", { style: { fg: t.planStepTitle }, children: _jsx("b", { children: step.title }) })] }), _jsx("box", { paddingLeft: 3, children: _jsx("text", { fg: t.planStepDesc, children: step.description }) }), step.filePaths && step.filePaths.length > 0 && (_jsx("box", { paddingLeft: 3, children: _jsx("text", { children: step.filePaths.map((fp, j) => (_jsxs("span", { style: { fg: t.planStepFile }, children: [j > 0 ? ", " : "", fp] }, fp))) }) }))] }, `step-${step.title}`)))] }));
}
/* ── Plan Questions Panel (OpenCode-style tabbed inline) ──── */
const SPLIT = {
    topLeft: "",
    bottomLeft: "",
    vertical: "┃",
    topRight: "",
    bottomRight: "",
    horizontal: " ",
    bottomT: "",
    topT: "",
    cross: "",
    leftT: "",
    rightT: "",
};
export function initialPlanQuestionsState() {
    return {
        tab: 0,
        selected: 0,
        answers: {},
        customInputs: {},
        editing: false,
    };
}
export function PlanQuestionsPanel({ t, questions, state }) {
    const isSingle = questions.length === 1 && questions[0]?.type !== "multiselect";
    const isConfirmTab = !isSingle && state.tab === questions.length;
    const q = questions[state.tab];
    return (_jsxs("box", { flexDirection: "column", border: ["left"], customBorderChars: SPLIT, borderColor: t.planBorder, marginTop: 1, paddingLeft: 2, paddingRight: 2, paddingTop: 1, paddingBottom: 1, backgroundColor: t.backgroundPanel, children: [!isSingle && (_jsxs("box", { flexDirection: "row", gap: 2, marginBottom: 1, flexShrink: 0, children: [questions.map((q, i) => {
                        const isActive = i === state.tab;
                        const isAnswered = hasAnswer(state.answers, q);
                        const label = tabLabel(q);
                        return (_jsx("text", { children: _jsxs("span", { style: {
                                    fg: isActive ? t.planTitle : isAnswered ? t.planOptionCheck : t.textMuted,
                                }, children: [isActive ? _jsx("b", { children: label }) : label, isAnswered && !isActive ? " ✓" : ""] }) }, q.id));
                    }), _jsx("text", { children: _jsx("span", { style: {
                                fg: isConfirmTab ? t.planTitle : t.textMuted,
                            }, children: isConfirmTab ? _jsx("b", { children: "Confirm" }) : "Confirm" }) })] })), isConfirmTab ? (_jsx(ConfirmView, { t: t, questions: questions, answers: state.answers })) : q ? (_jsx(QuestionBody, { t: t, question: q, state: state })) : null, _jsxs("box", { flexDirection: "row", gap: 3, marginTop: 1, flexShrink: 0, children: [!isSingle && (_jsxs("text", { children: [_jsx("span", { style: { fg: t.text }, children: "⇆" }), _jsx("span", { style: { fg: t.planHint }, children: " tab" })] })), _jsxs("text", { children: [_jsx("span", { style: { fg: t.text }, children: "↑↓" }), _jsx("span", { style: { fg: t.planHint }, children: " select" })] }), _jsxs("text", { children: [_jsx("span", { style: { fg: t.text }, children: "enter" }), _jsx("span", { style: { fg: t.planHint }, children: isConfirmTab ? " submit" : q?.type === "multiselect" ? " toggle" : isSingle ? " submit" : " confirm" })] }), _jsxs("text", { children: [_jsx("span", { style: { fg: t.text }, children: "esc" }), _jsx("span", { style: { fg: t.planHint }, children: " dismiss" })] })] })] }));
}
/* ── Question Body ────────────────────────────────────────── */
function QuestionBody({ t, question: q, state }) {
    const isMulti = q.type === "multiselect";
    const options = q.options ?? [];
    const showCustom = q.type !== "text";
    const totalItems = options.length + (showCustom ? 1 : 0);
    const isOnCustom = showCustom && state.selected === options.length;
    const customText = state.customInputs[q.id] ?? "";
    return (_jsxs("box", { flexDirection: "column", children: [_jsx("box", { marginBottom: 1, children: _jsxs("text", { fg: t.planQuestionText, children: [_jsx("b", { children: q.question }), isMulti ? _jsx("span", { style: { fg: t.textMuted }, children: " (select all that apply)" }) : null] }) }), q.type === "text" ? (
            /* Free-form text input */
            _jsx("box", { backgroundColor: t.planInputBg, paddingLeft: 1, paddingRight: 1, children: _jsx("text", { fg: t.planInputText, children: state.editing || customText ? (customText + (state.editing ? "▌" : "")) : (_jsx("span", { style: { fg: t.textMuted }, children: "Type your answer..." })) }) })) : (
            /* Options list */
            _jsxs("box", { flexDirection: "column", children: [options.map((opt, i) => {
                        const isFocused = i === state.selected;
                        const isPicked = isOptionPicked(state.answers, q, opt.id);
                        return (_jsx("box", { backgroundColor: isFocused ? t.selectedBg : undefined, paddingLeft: 1, flexDirection: "row", children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.textMuted }, children: `${i + 1}. ` }), _jsx("span", { style: {
                                            fg: isFocused ? t.selected : isPicked ? t.planOptionCheck : t.text,
                                        }, children: isMulti ? `[${isPicked ? "✓" : " "}] ${opt.label}` : opt.label }), isPicked && !isMulti ? _jsx("span", { style: { fg: t.planOptionCheck }, children: " ✓" }) : null] }) }, opt.id));
                    }), showCustom && (_jsx("box", { backgroundColor: isOnCustom ? t.selectedBg : undefined, paddingLeft: 1, children: state.editing && isOnCustom ? (_jsx("box", { backgroundColor: t.planInputBg, paddingLeft: 1, paddingRight: 1, flexGrow: 1, children: _jsx("text", { fg: t.planInputText, children: `${customText}▌` }) })) : (_jsxs("text", { children: [_jsx("span", { style: { fg: t.textMuted }, children: `${totalItems}. ` }), _jsx("span", { style: {
                                        fg: isOnCustom ? t.planOptionSelected : t.textMuted,
                                    }, children: isMulti
                                        ? `[${customText && isOptionPicked(state.answers, q, customText) ? "✓" : " "}] Type your own answer`
                                        : "Type your own answer" }), customText ? _jsx("span", { style: { fg: t.textDim }, children: ` (${customText})` }) : null] })) }))] }))] }));
}
/* ── Confirm/Review Tab ───────────────────────────────────── */
function ConfirmView({ t, questions, answers }) {
    return (_jsxs("box", { flexDirection: "column", children: [_jsx("box", { marginBottom: 1, children: _jsx("text", { fg: t.planQuestionText, children: _jsx("b", { children: "Review" }) }) }), questions.map((q) => {
                const val = formatAnswer(q, answers);
                const answered = val !== "(not answered)";
                return (_jsx("box", { paddingLeft: 1, children: _jsxs("text", { children: [_jsx("span", { style: { fg: t.text }, children: _jsxs("b", { children: [tabLabel(q), ":"] }) }), _jsxs("span", { style: { fg: answered ? t.planOptionCheck : t.textMuted }, children: [" ", val] })] }) }, q.id));
            })] }));
}
/* ── Helpers ───────────────────────────────────────────────── */
function tabLabel(q) {
    if (q.header)
        return q.header;
    const words = q.question.replace(/[?.,!:]+$/, "").split(/\s+/);
    const key = words.find((w) => w.length > 2 && !/^(what|how|should|which|does|the|and|for|are|can|will|you|this|that|with|from)$/i.test(w));
    return key ?? words[0] ?? "Question";
}
function hasAnswer(answers, q) {
    const a = answers[q.id];
    if (!a)
        return false;
    if (Array.isArray(a))
        return a.length > 0;
    return a.trim().length > 0;
}
function isOptionPicked(answers, q, optionId) {
    const a = answers[q.id];
    if (!a)
        return false;
    if (Array.isArray(a))
        return a.includes(optionId);
    return a === optionId;
}
function formatAnswer(q, answers) {
    const a = answers[q.id];
    if (!a)
        return "(not answered)";
    if (q.type === "text")
        return a || "(not answered)";
    if (q.type === "select") {
        const opt = q.options?.find((o) => o.id === a);
        return (opt?.label ?? a) || "(not answered)";
    }
    const arr = a;
    if (arr.length === 0)
        return "(not answered)";
    return arr.map((id) => q.options?.find((o) => o.id === id)?.label ?? id).join(", ");
}
export function formatPlanAnswers(questions, answers) {
    const parts = ["Here are my answers to the plan questions:\n"];
    for (const q of questions) {
        const val = formatAnswer(q, answers);
        parts.push(`- ${q.question}: ${val}`);
    }
    return parts.join("\n");
}
//# sourceMappingURL=plan.js.map