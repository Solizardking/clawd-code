/**
 * Serialize async turns (local TUI + Telegram) so only one Agent.processMessage runs at a time.
 */
export declare function createTurnCoordinator(): {
    run<T>(fn: () => Promise<T>): Promise<T>;
};
export type TurnCoordinator = ReturnType<typeof createTurnCoordinator>;
