/**
 * Tracks commands recently denied by the auto mode classifier.
 * Populated from useCanUseTool.ts, read from RecentDenialsTab.tsx in /permissions.
 */
export type AutoModeDenial = {
    toolName: string;
    /** Human-readable description of the denied command (e.g. bash command string) */
    display: string;
    reason: string;
    timestamp: number;
};
export declare function recordAutoModeDenial(denial: AutoModeDenial): void;
export declare function getAutoModeDenials(): readonly AutoModeDenial[];
//# sourceMappingURL=autoModeDenials.d.ts.map