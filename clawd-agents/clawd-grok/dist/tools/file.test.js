import { mkdtemp, readFile, rm, writeFile as writeFsFile } from "fs/promises";
import os from "os";
import path from "path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { editFile, writeFile } from "./file";
const summarizeDiagnosticsMock = vi.fn(() => "1 LSP issue · 1 error");
const syncFileWithLspMock = vi.fn(async () => [
    {
        filePath: "/tmp/demo.ts",
        serverId: "typescript",
        diagnostics: [
            {
                message: "Type error",
                severity: 1,
                range: {
                    start: { line: 0, character: 0 },
                    end: { line: 0, character: 5 },
                },
            },
        ],
    },
]);
vi.mock("../lsp/runtime", () => ({
    summarizeDiagnostics: (diagnostics) => summarizeDiagnosticsMock(diagnostics),
    syncFileWithLsp: (cwd, filePath, content, save, waitForDiagnostics) => syncFileWithLspMock(cwd, filePath, content, save, waitForDiagnostics),
}));
const tempDirs = [];
afterEach(async () => {
    summarizeDiagnosticsMock.mockClear();
    syncFileWithLspMock.mockClear();
    await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});
describe("file tool LSP integration", () => {
    it("includes diagnostics metadata when writing a file", async () => {
        const cwd = await createTempDir();
        const result = await writeFile("demo.ts", "const answer = 42;\n", cwd);
        expect(result.success).toBe(true);
        expect(result.output).toContain("1 LSP issue");
        expect(result.lspDiagnostics).toHaveLength(1);
        expect(syncFileWithLspMock).toHaveBeenCalledWith(cwd, path.join(cwd, "demo.ts"), "const answer = 42;\n", true, true);
    });
    it("syncs edited file contents through the LSP runtime", async () => {
        const cwd = await createTempDir();
        const filePath = path.join(cwd, "demo.ts");
        await writeFsFile(filePath, "const answer = 41;\n", "utf8");
        const result = await editFile("demo.ts", "41", "42", cwd);
        const content = await readFile(filePath, "utf8");
        expect(result.success).toBe(true);
        expect(content).toContain("42");
        expect(syncFileWithLspMock).toHaveBeenCalledWith(cwd, filePath, "const answer = 42;\n", true, true);
    });
});
async function createTempDir() {
    const dir = await mkdtemp(path.join(os.tmpdir(), "grok-file-tools-"));
    tempDirs.push(dir);
    return dir;
}
//# sourceMappingURL=file.test.js.map