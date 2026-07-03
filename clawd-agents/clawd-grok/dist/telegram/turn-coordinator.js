/**
 * Serialize async turns (local TUI + Telegram) so only one Agent.processMessage runs at a time.
 */
export function createTurnCoordinator() {
    let chain = Promise.resolve();
    return {
        run(fn) {
            const result = chain.then(() => fn());
            chain = result.then(() => { }, () => { });
            return result;
        },
    };
}
//# sourceMappingURL=turn-coordinator.js.map