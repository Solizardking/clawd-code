import type { Theme } from "../theme.js";
export interface BtwState {
    status: "loading" | "done" | "error";
    question: string;
    answer?: string;
    error?: string;
}
export declare function BtwOverlay({ state, theme: t }: {
    state: BtwState;
    theme: Theme;
}): import("react").ReactNode;
