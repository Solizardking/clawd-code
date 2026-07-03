import type { TextareaRenderable } from "@opentui/core";
import { type RefObject } from "react";
import type { CustomSubagentConfig } from "../utils/settings";
import type { Theme } from "./theme";
export type SubagentBrowseRow = {
    kind: "agent";
    agent: CustomSubagentConfig;
};
export declare const SUBAGENT_EDITOR_FIELDS: readonly ["name", "model", "instruction"];
export type SubagentEditorField = (typeof SUBAGENT_EDITOR_FIELDS)[number];
export declare function buildSubagentBrowseRows(agents: CustomSubagentConfig[], query: string): SubagentBrowseRow[];
export declare function SubagentsBrowserModal({ t, width, height, selectedIndex, searchQuery, rows, }: {
    t: Theme;
    width: number;
    height: number;
    selectedIndex: number;
    searchQuery: string;
    rows: SubagentBrowseRow[];
}): any;
export declare function SubagentEditorModal({ t, width, height, draft, focusedField, modelIndex, error, title, nameRef, instructionRef, onSubmit, showRemoveHint, }: {
    t: Theme;
    width: number;
    height: number;
    draft: {
        name: string;
        instruction: string;
    };
    focusedField: SubagentEditorField;
    modelIndex: number;
    error: string | null;
    title: string;
    nameRef: RefObject<TextareaRenderable | null>;
    instructionRef: RefObject<TextareaRenderable | null>;
    onSubmit: () => void;
    showRemoveHint?: boolean;
}): any;
