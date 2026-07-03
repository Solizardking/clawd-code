import Arborist from "@npmcli/arborist";
import { access, mkdir, readdir, readFile, rm } from "fs/promises";
import os from "os";
import path from "path";
const locks = new Map();
function packageDir(pkg) {
    const sanitized = process.platform === "win32"
        ? Array.from(pkg, (ch) => (/[<>:"|?*]/.test(ch) || ch.charCodeAt(0) < 32 ? "_" : ch)).join("")
        : pkg;
    return path.join(os.homedir(), ".grok", "cache", "lsp", sanitized);
}
export async function lspNpmWhich(pkg) {
    const dir = packageDir(pkg);
    const binDir = path.join(dir, "node_modules", ".bin");
    const pick = async () => {
        const files = await readdir(binDir).catch(() => []);
        if (files.length === 0)
            return undefined;
        if (files.length === 1)
            return files[0];
        const pkgJsonPath = path.join(dir, "node_modules", pkg, "package.json");
        const pkgJson = await readJsonSafe(pkgJsonPath);
        if (pkgJson?.bin) {
            const unscoped = pkg.startsWith("@") ? pkg.split("/")[1] : pkg;
            const bin = pkgJson.bin;
            if (typeof bin === "string")
                return unscoped;
            const keys = Object.keys(bin);
            if (keys.length === 1)
                return keys[0];
            return bin[unscoped] ? unscoped : keys[0];
        }
        return files[0];
    };
    const bin = await pick();
    if (bin)
        return path.join(binDir, bin);
    try {
        await rm(path.join(dir, "package-lock.json"), { force: true });
        await lspNpmAdd(pkg);
    }
    catch {
        return null;
    }
    const resolved = await pick();
    if (!resolved)
        return null;
    return path.join(binDir, resolved);
}
export async function lspNpmAdd(pkg) {
    return withPackageLock(pkg, async () => {
        const dir = packageDir(pkg);
        await mkdir(dir, { recursive: true });
        const arborist = new Arborist({
            path: dir,
            binLinks: true,
            progress: false,
            savePrefix: "",
            ignoreScripts: true,
        });
        const tree = await arborist.loadVirtual().catch(() => undefined);
        if (tree) {
            const first = tree.edgesOut.values().next().value?.to;
            if (first?.path)
                return first.path;
        }
        const result = await arborist.reify({
            add: [pkg],
            save: true,
            saveType: "prod",
        });
        const first = result.edgesOut.values().next().value?.to;
        if (!first?.path)
            throw new Error(`Failed to install ${pkg}`);
        return first.path;
    });
}
async function readJsonSafe(filePath) {
    try {
        await access(filePath);
        const raw = await readFile(filePath, "utf8");
        return JSON.parse(raw);
    }
    catch {
        return undefined;
    }
}
async function withPackageLock(pkg, fn) {
    const key = `lsp-install:${pkg}`;
    while (locks.has(key)) {
        await locks.get(key).catch(() => { });
    }
    const task = fn();
    locks.set(key, task);
    try {
        return await task;
    }
    finally {
        if (locks.get(key) === task) {
            locks.delete(key);
        }
    }
}
//# sourceMappingURL=npm-cache.js.map