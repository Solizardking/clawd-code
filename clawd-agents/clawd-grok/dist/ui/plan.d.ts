import type { Plan, PlanQuestion } from "../types/index";
import type { Theme } from "./theme";
export type PlanAnswers = Record<string, string | string[]>;
interface PlanViewProps {
    plan: Plan;
    t: Theme;
}
export declare function PlanView({ plan, t }: PlanViewProps): import("react").ReactNode;
export interface PlanQuestionsState {
    tab: number;
    selected: number;
    answers: PlanAnswers;
    customInputs: Record<string, string>;
    editing: boolean;
}
export declare function initialPlanQuestionsState(): PlanQuestionsState;
interface PlanQuestionsPanelProps {
    t: Theme;
    questions: PlanQuestion[];
    state: PlanQuestionsState;
}
export declare function PlanQuestionsPanel({ t, questions, state }: PlanQuestionsPanelProps): import("react").ReactNode;
export declare function formatPlanAnswers(questions: PlanQuestion[], answers: PlanAnswers): string;
export {};
