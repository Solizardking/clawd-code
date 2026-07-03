import * as path from "node:path";
export function resolveTelegramHeadlessBridgePaths(cwd, options = {}) {
    return {
        logFile: path.resolve(cwd, options.logFile ?? "telegram-remote-bridge.log"),
        pairCodeFile: path.resolve(cwd, options.pairCodeFile ?? "telegram-pair-code.txt"),
    };
}
//# sourceMappingURL=headless-bridge-paths.js.map