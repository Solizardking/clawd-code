import { existsSync } from "fs";
import path from "path";
import { getCurrentLspSettings } from "../utils/settings";
import { createWorkspaceLspManager, summarizeLspDiagnostics } from "./manager";
const managers = new Map();
export async function queryLsp(cwd, input) {
    const manager = getOrCreateManager(cwd);
    return manager.query({
        ...input,
        filePath: path.isAbsolute(input.filePath) ? input.filePath : path.resolve(cwd, input.filePath),
    });
}
export async function syncFileWithLsp(cwd, filePath, content, save = true, waitForDiagnostics = true) {
    const manager = getOrCreateManager(cwd);
    return manager.syncFile(path.isAbsolute(filePath) ? filePath : path.resolve(cwd, filePath), content, save, waitForDiagnostics);
}
export function isLspToolEnabled(_cwd) {
    const settings = getCurrentLspSettings();
    return settings.enabled && settings.tool;
}
export function summarizeDiagnostics(diagnostics) {
    return summarizeLspDiagnostics(diagnostics);
}
export async function shutdownWorkspaceLspManager(cwd) {
    const key = resolveManagerKey(cwd);
    const manager = managers.get(key);
    if (!manager)
        return;
    managers.delete(key);
    await manager.close();
}
function getOrCreateManager(cwd) {
    const key = resolveManagerKey(cwd);
    const existing = managers.get(key);
    if (existing)
        return existing;
    const manager = createWorkspaceLspManager(key, getCurrentLspSettings());
    managers.set(key, manager);
    return manager;
}
function resolveManagerKey(cwd) {
    let current = path.resolve(cwd);
    while (true) {
        if (existsSync(path.join(current, ".clawd")) || existsSync(path.join(current, ".git"))) {
            return current;
        }
        const parent = path.dirname(current);
        if (parent === current)
            return current;
        current = parent;
    }
}
//# sourceMappingURL=runtime.js.map