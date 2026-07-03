import { stat } from "fs/promises";
import path from "path";
import { ripgrep } from "ripgrep";
const MAX_MATCHES = 100;
const MAX_LINE_LENGTH = 2000;
function buildArgs(params) {
    const args = ["--json", "--hidden", "--glob=!.git/*", "--no-messages"];
    if (params.include) {
        args.push(`--glob=${params.include}`);
    }
    args.push("--", params.pattern, params.path ?? ".");
    return args;
}
function cleanEnv() {
    const env = Object.fromEntries(Object.entries(process.env).filter((entry) => entry[1] !== undefined));
    delete env.RIPGREP_CONFIG_PATH;
    return env;
}
function cleanPath(file) {
    return path.normalize(file.replace(/^\.[\\/]/, ""));
}
function parseMatches(stdout) {
    if (!stdout.trim())
        return [];
    return stdout
        .trim()
        .split(/\r?\n/)
        .filter(Boolean)
        .flatMap((line) => {
        try {
            const parsed = JSON.parse(line);
            if (parsed.type === "match") {
                return [
                    {
                        ...parsed.data,
                        path: { ...parsed.data.path, text: cleanPath(parsed.data.path.text) },
                    },
                ];
            }
        }
        catch {
            // skip malformed lines
        }
        return [];
    });
}
async function getFileMtimes(files, cwd) {
    const times = new Map();
    await Promise.all(files.map(async (file) => {
        const fullPath = path.isAbsolute(file) ? file : path.join(cwd, file);
        try {
            const info = await stat(fullPath);
            times.set(file, info.mtimeMs);
        }
        catch {
            // skip inaccessible files
        }
    }));
    return times;
}
export async function executeGrep(params, cwd) {
    if (!params.pattern) {
        return { success: false, error: "pattern is required" };
    }
    const searchPath = params.path ? (path.isAbsolute(params.path) ? params.path : path.join(cwd, params.path)) : cwd;
    let searchCwd;
    let searchTarget;
    try {
        const info = await stat(searchPath);
        if (info.isDirectory()) {
            searchCwd = searchPath;
        }
        else {
            searchCwd = path.dirname(searchPath);
            searchTarget = path.relative(searchCwd, searchPath);
        }
    }
    catch {
        searchCwd = cwd;
        searchTarget = params.path;
    }
    const args = buildArgs({ ...params, path: searchTarget });
    try {
        const result = await ripgrep(args, {
            buffer: true,
            env: cleanEnv(),
            preopens: { ".": searchCwd },
        });
        const stdout = result.stdout ?? "";
        const code = result.code ?? 1;
        if (code !== 0 && code !== 1 && code !== 2) {
            const stderr = result.stderr ?? "";
            return { success: false, error: stderr.trim() || `ripgrep failed with code ${code}` };
        }
        if (code === 1) {
            return { success: true, output: "No matches found." };
        }
        const matches = parseMatches(stdout);
        if (matches.length === 0) {
            const msg = code === 2 ? "No matches found.\n(Some paths were inaccessible and skipped)" : "No matches found.";
            return { success: true, output: msg };
        }
        const rebase = (file) => path.relative(cwd, path.resolve(searchCwd, file));
        const uniqueFiles = [...new Set(matches.map((m) => rebase(m.path.text)))];
        const mtimes = await getFileMtimes(uniqueFiles, cwd);
        const rows = matches
            .map((m) => ({
            file: rebase(m.path.text),
            line: m.line_number,
            text: m.lines.text.replace(/\n$/, ""),
            mtime: mtimes.get(rebase(m.path.text)) ?? 0,
        }))
            .sort((a, b) => b.mtime - a.mtime);
        const total = rows.length;
        const truncated = total > MAX_MATCHES;
        const display = truncated ? rows.slice(0, MAX_MATCHES) : rows;
        const output = [`Found ${total} matches${truncated ? ` (showing first ${MAX_MATCHES})` : ""}`];
        let currentFile = "";
        for (const row of display) {
            if (currentFile !== row.file) {
                if (currentFile !== "")
                    output.push("");
                currentFile = row.file;
                output.push(`${row.file}:`);
            }
            const text = row.text.length > MAX_LINE_LENGTH ? `${row.text.substring(0, MAX_LINE_LENGTH)}...` : row.text;
            output.push(`  Line ${row.line}: ${text}`);
        }
        if (truncated) {
            output.push("");
            output.push(`(Results truncated: showing ${MAX_MATCHES} of ${total} matches. Consider using a more specific path or pattern.)`);
        }
        if (code === 2) {
            output.push("");
            output.push("(Some paths were inaccessible and skipped)");
        }
        return { success: true, output: output.join("\n") };
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { success: false, error: `Grep failed: ${msg}` };
    }
}
//# sourceMappingURL=grep.js.map