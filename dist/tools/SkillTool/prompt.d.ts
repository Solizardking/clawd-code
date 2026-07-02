import type { Command } from 'src/commands.js';
export declare const SKILL_BUDGET_CONTEXT_PERCENT = 0.01;
export declare const CHARS_PER_TOKEN = 4;
export declare const DEFAULT_CHAR_BUDGET = 8000;
export declare const MAX_LISTING_DESC_CHARS = 250;
export declare function getCharBudget(contextWindowTokens?: number): number;
export declare function formatCommandsWithinBudget(commands: Command[], contextWindowTokens?: number): string;
export declare const getPrompt: any;
export declare function getSkillToolInfo(cwd: string): Promise<{
    totalCommands: number;
    includedCommands: number;
}>;
export declare function getLimitedSkillToolCommands(cwd: string): Promise<Command[]>;
export declare function clearPromptCache(): void;
export declare function getSkillInfo(cwd: string): Promise<{
    totalSkills: number;
    includedSkills: number;
}>;
//# sourceMappingURL=prompt.d.ts.map