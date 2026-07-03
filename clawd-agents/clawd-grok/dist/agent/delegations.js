import { spawn } from "child_process";
import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getHomeDir } from "../utils/settings";
const ID_ADJECTIVES = ["brisk", "calm", "clever", "eager", "gentle", "keen", "lively", "nimble", "quiet", "steady"];
const ID_COLORS = ["amber", "blue", "copper", "emerald", "indigo", "ivory", "silver", "teal", "violet", "white"];
const ID_ANIMALS = ["badger", "falcon", "fox", "heron", "lynx", "otter", "owl", "panda", "sparrow", "wolf"];
export class DelegationManager {
    getCwd;
    constructor(getCwd) {
        this.getCwd = getCwd;
    }
    async start(request, options) {
        if (process.env.CLAWD_BACKGROUND_CHILD === "1") {
            return {
                success: false,
                output: "Nested background delegations are disabled.",
            };
        }
        if (request.agent !== "explore") {
            return {
                success: false,
                output: "Background delegations are read-only. Use `delegate` with the `explore` agent, or use `task` for foreground work that may edit files.",
            };
        }
        const cwd = this.getCwd();
        const dir = await ensureDelegationsDir(cwd);
        const id = await generateUniqueId(dir);
        const outputPath = path.join(dir, `${id}.md`);
        const jobPath = path.join(dir, `${id}.json`);
        const record = {
            id,
            agent: "explore",
            description: request.description,
            prompt: request.prompt,
            cwd,
            model: options.model,
            sandboxMode: options.sandboxMode,
            sandboxSettings: options.sandboxSettings,
            maxToolRounds: options.maxToolRounds,
            maxTokens: options.maxTokens,
            batchApi: options.batchApi,
            status: "running",
            startedAt: new Date().toISOString(),
            outputPath,
        };
        await writeRecord(jobPath, record);
        const child = spawn(process.execPath, [
            ...resolveCliArgs(),
            "--directory",
            cwd,
            "--background-task-file",
            jobPath,
            ...(options.batchApi ? ["--batch-api"] : []),
        ], {
            cwd,
            detached: true,
            stdio: "ignore",
            env: { ...process.env, CLAWD_BACKGROUND_CHILD: "1" },
        });
        child.unref();
        record.pid = child.pid;
        await writeRecord(jobPath, record);
        const output = [
            `Delegation started: ${id}`,
            "Agent: explore",
            "You will be notified when it completes.",
            `Use \`delegation_read("${id}")\` to retrieve the full result later.`,
        ].join("\n");
        return {
            success: true,
            output,
            delegation: {
                id,
                agent: "explore",
                description: request.description,
                summary: "Running in the background.",
                status: "running",
            },
        };
    }
    async list() {
        const dir = await ensureDelegationsDir(this.getCwd());
        const files = await readDelegationFiles(dir);
        const items = await Promise.all(files.map(async (file) => readRecord(path.join(dir, file))));
        return items
            .filter((item) => item !== null)
            .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
            .map(toDelegationRun);
    }
    async read(id) {
        const record = await this.getById(id);
        if (!record) {
            return `Delegation "${id}" not found. Use \`delegation_list()\` to see available results.`;
        }
        if (record.status === "running") {
            return `Delegation "${id}" is still running. Continue working and wait for the completion notice.`;
        }
        try {
            return await fs.readFile(record.outputPath, "utf8");
        }
        catch {
            if (record.error) {
                return `Delegation "${id}" failed.\n\n${record.error}`;
            }
            return `Delegation "${id}" completed, but its saved output could not be read.`;
        }
    }
    async consumeNotifications() {
        const dir = await ensureDelegationsDir(this.getCwd());
        const files = await readDelegationFiles(dir);
        const notifications = [];
        for (const file of files) {
            const jobPath = path.join(dir, file);
            const record = await readRecord(jobPath);
            if (!record || record.status === "running" || record.notifiedAt)
                continue;
            record.notifiedAt = new Date().toISOString();
            await writeRecord(jobPath, record);
            notifications.push({
                id: record.id,
                message: formatNotification(record),
            });
        }
        return notifications.sort((a, b) => a.id.localeCompare(b.id));
    }
    async getById(id) {
        const dir = await ensureDelegationsDir(this.getCwd());
        return readRecord(path.join(dir, `${id}.json`));
    }
}
export async function loadDelegation(jobPath) {
    const record = await readRecord(jobPath);
    if (!record) {
        throw new Error(`Delegation job not found: ${jobPath}`);
    }
    return record;
}
export async function completeDelegation(jobPath, output, fallbackSummary) {
    const record = await loadDelegation(jobPath);
    record.status = "complete";
    record.completedAt = new Date().toISOString();
    record.title = record.title || createTitle(output, record.description);
    record.summary = createSummary(output || fallbackSummary || record.description);
    await fs.mkdir(path.dirname(record.outputPath), { recursive: true });
    await fs.writeFile(record.outputPath, renderOutput(record, output), "utf8");
    await writeRecord(jobPath, record);
}
export async function failDelegation(jobPath, error, output = "") {
    const record = await loadDelegation(jobPath);
    record.status = "error";
    record.completedAt = new Date().toISOString();
    record.error = error;
    record.title = record.title || createTitle(output || error, record.description);
    record.summary = createSummary(output || error);
    await fs.mkdir(path.dirname(record.outputPath), { recursive: true });
    await fs.writeFile(record.outputPath, renderOutput(record, output || `Error: ${error}`), "utf8");
    await writeRecord(jobPath, record);
}
async function ensureDelegationsDir(cwd) {
    const projectId = getProjectId(cwd);
    const dir = path.join(getHomeDir(), ".grok", "delegations", projectId);
    await fs.mkdir(dir, { recursive: true });
    return dir;
}
async function readDelegationFiles(dir) {
    try {
        const files = await fs.readdir(dir);
        return files.filter((file) => file.endsWith(".json"));
    }
    catch {
        return [];
    }
}
async function readRecord(filePath) {
    try {
        const raw = await fs.readFile(filePath, "utf8");
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
async function writeRecord(filePath, record) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(record, null, 2), "utf8");
}
async function generateUniqueId(dir) {
    for (let attempt = 0; attempt < 20; attempt++) {
        const id = randomId();
        try {
            await fs.access(path.join(dir, `${id}.json`));
        }
        catch {
            return id;
        }
    }
    throw new Error("Failed to allocate a unique delegation ID.");
}
function randomId() {
    return `${pick(ID_ADJECTIVES)}-${pick(ID_COLORS)}-${pick(ID_ANIMALS)}`;
}
function pick(values) {
    return values[Math.floor(Math.random() * values.length)];
}
function resolveCliArgs() {
    const entry = process.argv[1];
    if (!entry) {
        throw new Error("Could not resolve the CLI entrypoint for background delegation.");
    }
    return [entry];
}
function getProjectId(cwd) {
    const base = path
        .basename(cwd)
        .replace(/[^a-zA-Z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "") || "project";
    const hash = createHash("sha1").update(cwd).digest("hex").slice(0, 10);
    return `${base}-${hash}`;
}
function createTitle(text, fallback) {
    const firstLine = text
        .split("\n")
        .map((line) => line.trim())
        .find(Boolean);
    const source = firstLine || fallback.trim() || "Background delegation";
    return source.length <= 48 ? source : `${source.slice(0, 45).trimEnd()}...`;
}
function createSummary(text) {
    const compact = text.replace(/\s+/g, " ").trim();
    if (!compact)
        return "No summary available.";
    return compact.length <= 180 ? compact : `${compact.slice(0, 177).trimEnd()}...`;
}
function renderOutput(record, content) {
    const title = record.title || record.id;
    const summary = record.summary || "No summary available.";
    const completed = record.completedAt || "N/A";
    const error = record.error ? `\n**Error:** ${record.error}\n` : "";
    return [
        `# ${title}`,
        "",
        summary,
        "",
        `**ID:** ${record.id}`,
        `**Agent:** ${record.agent}`,
        `**Status:** ${record.status}`,
        `**Started:** ${record.startedAt}`,
        `**Completed:** ${completed}`,
        "",
        `**Prompt:** ${record.description}`,
        error.trimEnd(),
        "",
        "---",
        "",
        content.trim() || "(No output)",
        "",
    ]
        .filter(Boolean)
        .join("\n");
}
function formatNotification(record) {
    const title = record.title || record.description || record.id;
    const summary = record.summary || (record.error ? createSummary(record.error) : "No summary available.");
    const statusText = record.status === "complete" ? "complete" : "failed";
    const lines = [`Background agent ${statusText}: \`${record.id}\``, `Title: ${title}`, `Summary: ${summary}`];
    if (record.error) {
        lines.push(`Error: ${record.error}`);
    }
    lines.push(`Use \`delegation_read("${record.id}")\` to retrieve the full result.`);
    return lines.join("\n");
}
function toDelegationRun(record) {
    return {
        id: record.id,
        agent: "explore",
        description: record.description,
        summary: record.summary || (record.status === "running" ? "Running in the background." : "No summary available."),
        status: record.status,
    };
}
//# sourceMappingURL=delegations.js.map