export type SkillUpdate = {
    section: string;
    change: string;
    reason: string;
};
export declare function initSkillImprovement(): void;
/**
 * Apply skill improvements by calling a side-channel LLM to rewrite the skill file.
 * Fire-and-forget — does not block the main conversation.
 */
export declare function applySkillImprovement(skillName: string, updates: SkillUpdate[]): Promise<void>;
//# sourceMappingURL=skillImprovement.d.ts.map