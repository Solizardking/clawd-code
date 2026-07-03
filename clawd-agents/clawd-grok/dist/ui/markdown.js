import { jsx as _jsx } from "@opentui/react/jsx-runtime";
import { RGBA, SyntaxStyle } from "@opentui/core";
import { useMemo } from "react";
function buildSyntaxStyle(t) {
    return SyntaxStyle.fromStyles({
        default: { fg: RGBA.fromHex(t.text) },
        "markup.heading": { fg: RGBA.fromHex(t.mdHeading), bold: true },
        "markup.heading.1": { fg: RGBA.fromHex(t.mdHeading), bold: true },
        "markup.heading.2": { fg: RGBA.fromHex(t.mdHeading), bold: true },
        "markup.heading.3": { fg: RGBA.fromHex(t.mdHeading), bold: true },
        "markup.bold": { fg: RGBA.fromHex(t.mdBold), bold: true },
        "markup.italic": { fg: RGBA.fromHex(t.mdItalic), italic: true },
        "markup.raw": { fg: RGBA.fromHex(t.mdCode) },
        "markup.link": { fg: RGBA.fromHex(t.mdLink), underline: true },
        "markup.link.label": { fg: RGBA.fromHex(t.mdLinkText) },
        "markup.list": { fg: RGBA.fromHex(t.mdListBullet) },
        "markup.quote": { fg: RGBA.fromHex(t.mdItalic), italic: true },
        "markup.separator": { fg: RGBA.fromHex(t.mdHr) },
        code: { fg: RGBA.fromHex(t.mdCodeBlockFg), bg: RGBA.fromHex(t.mdCodeBlockBg) },
    });
}
const TABLE_OPTIONS = {
    widthMode: "full",
    columnFitter: "balanced",
    wrapMode: "word",
    cellPadding: 1,
    borders: true,
    outerBorder: true,
    borderStyle: "rounded",
    borderColor: "#333333",
};
export function Markdown({ content, t }) {
    const syntaxStyle = useMemo(() => buildSyntaxStyle(t), [t]);
    return (_jsx("markdown", { content: content, syntaxStyle: syntaxStyle, conceal: true, 
        // @ts-expect-error MarkdownProps omits inherited Renderable.selectable; needed for TUI text selection
        selectable: true, tableOptions: TABLE_OPTIONS, flexShrink: 0 }));
}
//# sourceMappingURL=markdown.js.map