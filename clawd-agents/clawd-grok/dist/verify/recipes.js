import * as fs from "fs";
import * as path from "path";
import { mergeSandboxSettings } from "../utils/settings";
function fileExists(cwd, file) {
    return fs.existsSync(path.join(cwd, file));
}
function readTextFile(cwd, file) {
    try {
        return fs.readFileSync(path.join(cwd, file), "utf8");
    }
    catch {
        return null;
    }
}
function readPackageJson(cwd) {
    const raw = readTextFile(cwd, "package.json");
    if (!raw)
        return null;
    try {
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function detectPackageManager(cwd) {
    const candidates = [
        ["pnpm-lock.yaml", "pnpm"],
        ["bun.lock", "bun"],
        ["bun.lockb", "bun"],
        ["yarn.lock", "yarn"],
        ["package-lock.json", "npm"],
        ["uv.lock", "uv"],
        ["poetry.lock", "poetry"],
        ["Pipfile.lock", "pipenv"],
    ];
    for (const [file, manager] of candidates) {
        if (fileExists(cwd, file))
            return manager;
    }
    return null;
}
function dedupe(values) {
    return [...new Set(values.map((v) => v?.trim()).filter((v) => Boolean(v)))];
}
export function defaultShellInit() {
    return ["export DEBIAN_FRONTEND=noninteractive"];
}
const NODE_WEB_APP_KINDS = new Set(["nextjs", "vite", "astro", "sveltekit", "remix", "cra"]);
export function getNodeWebShellInitCommands(packageManager, appKind) {
    const commands = [...defaultShellInit()];
    if (!NODE_WEB_APP_KINDS.has(appKind)) {
        return commands;
    }
    if (packageManager === "bun") {
        // biome-ignore lint/suspicious/noTemplateCurlyInString: shell variable, not JS template
        commands.push('export BUN_INSTALL="${HOME}/.bun"');
        // biome-ignore lint/suspicious/noTemplateCurlyInString: shell variable, not JS template
        commands.push('export PATH="${BUN_INSTALL}/bin:$PATH"');
    }
    return commands;
}
export function getNodeWebBootstrapCommands(packageManager, appKind) {
    if (!NODE_WEB_APP_KINDS.has(appKind)) {
        return [];
    }
    const commands = [
        "apt-get update && apt-get install -y curl unzip ca-certificates git python3 make g++ pkg-config nodejs npm",
    ];
    if (packageManager === "bun") {
        commands.push("curl -fsSL https://bun.sh/install | bash");
    }
    return commands;
}
function parseHostPort(mapping) {
    const match = mapping.trim().match(/^(\d+):(\d+)$/);
    return match ? match[1] : null;
}
function inferPortFromCommand(command) {
    if (!command)
        return undefined;
    const flagMatch = command.match(/(?:--port|-p)\s+(\d{2,5})/);
    if (flagMatch)
        return flagMatch[1];
    const envMatch = command.match(/\bPORT=(\d{2,5})\b/);
    if (envMatch)
        return envMatch[1];
    return undefined;
}
function parseTargetNames(raw) {
    return raw
        .split(/\r?\n/)
        .map((line) => line.match(/^([A-Za-z0-9_.-]+):(?:\s|$)/)?.[1])
        .filter((target) => Boolean(target));
}
export function normalizeVerifyAppKind(value) {
    return [
        "nextjs",
        "vite",
        "astro",
        "sveltekit",
        "remix",
        "cra",
        "node",
        "django",
        "python",
        "go",
        "rust",
        "maven",
        "gradle",
        "make",
        "unknown",
    ].includes(value)
        ? value
        : "unknown";
}
function pickPackageScript(packageManager, scripts, body) {
    const entry = Object.entries(scripts).find(([, scriptBody]) => scriptBody === body)?.[0];
    if (!entry)
        return body;
    const runner = packageManager === "pnpm"
        ? "pnpm"
        : packageManager === "bun"
            ? "bun"
            : packageManager === "yarn"
                ? "yarn"
                : "npm run";
    return runner === "yarn" ? `yarn ${entry}` : runner === "bun" ? `bun run ${entry}` : `${runner} ${entry}`;
}
function detectMakeRecipe(cwd) {
    const makefile = readTextFile(cwd, "Makefile");
    if (!makefile)
        return null;
    const targets = parseTargetNames(makefile);
    const has = (names) => names.find((name) => targets.includes(name));
    const install = has(["install", "setup", "bootstrap"]);
    const build = has(["build", "compile"]);
    const test = has(["test", "check"]);
    const run = has(["run", "start", "serve", "dev"]);
    return {
        ecosystem: "make",
        appKind: "make",
        appLabel: "Makefile-driven project",
        shellInitCommands: defaultShellInit(),
        bootstrapCommands: [],
        installCommands: install ? [`make ${install}`] : [],
        buildCommands: build ? [`make ${build}`] : [],
        testCommands: test ? [`make ${test}`] : [],
        startCommand: run ? `make ${run}` : undefined,
        smokeKind: "none",
        evidence: ["Detected Makefile", `Targets: ${targets.join(", ") || "(none)"}`],
        notes: [],
    };
}
function detectNodeRecipe(_cwd, pkg, packageManager) {
    const scripts = pkg.scripts ?? {};
    const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
    let appKind = "node";
    let appLabel = "Node.js app";
    let defaultPort;
    if (deps.next) {
        appKind = "nextjs";
        appLabel = "Next.js";
        defaultPort = "3000";
    }
    else if (deps["@sveltejs/kit"]) {
        appKind = "sveltekit";
        appLabel = "SvelteKit";
        defaultPort = "5173";
    }
    else if (deps.astro) {
        appKind = "astro";
        appLabel = "Astro";
        defaultPort = "4321";
    }
    else if (deps["@remix-run/dev"] || deps["@remix-run/react"]) {
        appKind = "remix";
        appLabel = "Remix";
        defaultPort = "3000";
    }
    else if (deps["react-scripts"]) {
        appKind = "cra";
        appLabel = "Create React App";
        defaultPort = "3000";
    }
    else if (deps.vite) {
        appKind = "vite";
        appLabel = "Vite";
        defaultPort = "5173";
    }
    const install = packageManager
        ? packageManager === "pnpm"
            ? "pnpm install"
            : packageManager === "bun"
                ? "bun install"
                : packageManager === "yarn"
                    ? "yarn install"
                    : "npm install"
        : undefined;
    const startCommand = scripts.dev ?? scripts.start;
    const startPort = inferPortFromCommand(startCommand) ?? defaultPort;
    const smokeKind = startCommand && startPort ? "http" : "none";
    return {
        ecosystem: "node",
        appKind,
        appLabel,
        shellInitCommands: getNodeWebShellInitCommands(packageManager, appKind),
        bootstrapCommands: getNodeWebBootstrapCommands(packageManager, appKind),
        installCommands: dedupe([install]),
        buildCommands: dedupe([scripts.build, scripts.typecheck].map((script) => script && pickPackageScript(packageManager, scripts, script))),
        testCommands: dedupe(["test", "check", "lint"]
            .filter((name) => scripts[name])
            .map((name) => pickPackageScript(packageManager, scripts, scripts[name]))),
        startCommand: startCommand ? pickPackageScript(packageManager, scripts, startCommand) : undefined,
        startPort,
        smokeKind,
        evidence: ["Detected package.json", `Scripts: ${Object.keys(scripts).join(", ") || "(none)"}`],
        notes: [],
    };
}
function detectPythonRecipe(cwd) {
    const pyproject = readTextFile(cwd, "pyproject.toml");
    const requirements = readTextFile(cwd, "requirements.txt");
    const managePy = fileExists(cwd, "manage.py");
    if (!pyproject && !requirements && !managePy && !fileExists(cwd, "setup.py")) {
        return null;
    }
    const lower = `${pyproject ?? ""}\n${requirements ?? ""}`.toLowerCase();
    const packageManager = detectPackageManager(cwd);
    const isDjango = managePy || lower.includes("django");
    const isFastApi = lower.includes("fastapi") || lower.includes("uvicorn");
    let install = "pip install -r requirements.txt";
    if (packageManager === "uv")
        install = "uv sync";
    else if (packageManager === "poetry")
        install = "poetry install";
    else if (packageManager === "pipenv")
        install = "pipenv install";
    else if (pyproject && !requirements)
        install = "pip install -e .";
    if (isDjango) {
        return {
            ecosystem: "python",
            appKind: "django",
            appLabel: "Django app",
            shellInitCommands: defaultShellInit(),
            bootstrapCommands: [],
            installCommands: [install],
            buildCommands: [],
            testCommands: ["python manage.py test"],
            startCommand: "python manage.py runserver 0.0.0.0:8000",
            startPort: "8000",
            smokeKind: "http",
            evidence: ["Detected manage.py", pyproject ? "Detected pyproject.toml" : undefined].filter(Boolean),
            notes: [],
        };
    }
    if (isFastApi) {
        const appModule = fileExists(cwd, "main.py") ? "main:app" : fileExists(cwd, "app.py") ? "app:app" : "main:app";
        return {
            ecosystem: "python",
            appKind: "python",
            appLabel: "Python web app",
            shellInitCommands: defaultShellInit(),
            bootstrapCommands: [],
            installCommands: [install],
            buildCommands: [],
            testCommands: fileExists(cwd, "tests") ? ["pytest"] : [],
            startCommand: `uvicorn ${appModule} --host 0.0.0.0 --port 8000`,
            startPort: "8000",
            smokeKind: "http",
            evidence: ["Detected Python project", "Detected FastAPI/Uvicorn dependency"],
            notes: [],
        };
    }
    return {
        ecosystem: "python",
        appKind: "python",
        appLabel: "Python project",
        shellInitCommands: defaultShellInit(),
        bootstrapCommands: [],
        installCommands: [install],
        buildCommands: [],
        testCommands: fileExists(cwd, "tests") ? ["pytest"] : ["python -m unittest discover"],
        smokeKind: "none",
        evidence: ["Detected Python project"],
        notes: [],
    };
}
function detectGoRecipe(cwd) {
    if (!fileExists(cwd, "go.mod"))
        return null;
    return {
        ecosystem: "go",
        appKind: "go",
        appLabel: "Go project",
        shellInitCommands: defaultShellInit(),
        bootstrapCommands: [],
        installCommands: [],
        buildCommands: ["go build ./..."],
        testCommands: ["go test ./..."],
        startCommand: fileExists(cwd, "main.go") ? "go run ." : undefined,
        smokeKind: "none",
        evidence: ["Detected go.mod"],
        notes: [],
    };
}
function detectRustRecipe(cwd) {
    if (!fileExists(cwd, "Cargo.toml"))
        return null;
    return {
        ecosystem: "rust",
        appKind: "rust",
        appLabel: "Rust project",
        shellInitCommands: defaultShellInit(),
        bootstrapCommands: [],
        installCommands: [],
        buildCommands: ["cargo build"],
        testCommands: ["cargo test"],
        startCommand: fileExists(cwd, path.join("src", "main.rs")) ? "cargo run" : undefined,
        smokeKind: "none",
        evidence: ["Detected Cargo.toml"],
        notes: [],
    };
}
function detectJavaRecipe(cwd) {
    if (fileExists(cwd, "pom.xml")) {
        return {
            ecosystem: "java",
            appKind: "maven",
            appLabel: "Maven project",
            shellInitCommands: defaultShellInit(),
            bootstrapCommands: [],
            installCommands: [],
            buildCommands: ["mvn package"],
            testCommands: ["mvn test"],
            smokeKind: "none",
            evidence: ["Detected pom.xml"],
            notes: [],
        };
    }
    if (fileExists(cwd, "build.gradle") || fileExists(cwd, "build.gradle.kts")) {
        const gradle = fileExists(cwd, "gradlew") ? "./gradlew" : "gradle";
        return {
            ecosystem: "java",
            appKind: "gradle",
            appLabel: "Gradle project",
            shellInitCommands: defaultShellInit(),
            bootstrapCommands: [],
            installCommands: [],
            buildCommands: [`${gradle} build`],
            testCommands: [`${gradle} test`],
            smokeKind: "none",
            evidence: ["Detected Gradle build file"],
            notes: [],
        };
    }
    return null;
}
function detectFallbackRecipe(cwd) {
    const makeRecipe = detectMakeRecipe(cwd);
    if (makeRecipe)
        return makeRecipe;
    return {
        ecosystem: "unknown",
        appKind: "unknown",
        appLabel: "Unknown project type",
        shellInitCommands: defaultShellInit(),
        bootstrapCommands: [],
        installCommands: [],
        buildCommands: [],
        testCommands: [],
        smokeKind: "none",
        evidence: ["No known app metadata detected"],
        notes: ["The verify sub-agent should inspect the repo directly and derive commands from the codebase."],
    };
}
function inferFallbackRecipe(cwd, pkg, packageManager) {
    if (pkg)
        return detectNodeRecipe(cwd, pkg, packageManager);
    return (detectPythonRecipe(cwd) ??
        detectGoRecipe(cwd) ??
        detectRustRecipe(cwd) ??
        detectJavaRecipe(cwd) ??
        detectFallbackRecipe(cwd));
}
export function normalizeVerifyRecipe(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        return null;
    const raw = value;
    const asStrings = (input) => Array.isArray(input)
        ? input.filter((v) => typeof v === "string" && v.trim() !== "").map((v) => v.trim())
        : [];
    const ecosystem = typeof raw.ecosystem === "string" ? raw.ecosystem.trim() : "";
    const appKind = typeof raw.appKind === "string" ? raw.appKind.trim() : "";
    const appLabel = typeof raw.appLabel === "string" ? raw.appLabel.trim() : "";
    const smokeKind = raw.smokeKind === "http" || raw.smokeKind === "cli" || raw.smokeKind === "none" ? raw.smokeKind : "none";
    if (!ecosystem || !appKind || !appLabel)
        return null;
    return {
        ecosystem,
        appKind,
        appLabel,
        shellInitCommands: asStrings(raw.shellInitCommands),
        bootstrapCommands: asStrings(raw.bootstrapCommands),
        installCommands: asStrings(raw.installCommands),
        buildCommands: asStrings(raw.buildCommands),
        testCommands: asStrings(raw.testCommands),
        startCommand: typeof raw.startCommand === "string" && raw.startCommand.trim() ? raw.startCommand.trim() : undefined,
        startPort: typeof raw.startPort === "string" && raw.startPort.trim() ? raw.startPort.trim() : undefined,
        smokeKind,
        smokeTarget: typeof raw.smokeTarget === "string" && raw.smokeTarget.trim() ? raw.smokeTarget.trim() : undefined,
        evidence: asStrings(raw.evidence),
        notes: asStrings(raw.notes),
    };
}
export function inferVerifySmokeUrl(settings) {
    const ports = settings?.ports ?? [];
    if (ports.length !== 1)
        return null;
    const hostPort = parseHostPort(ports[0]);
    return hostPort ? `http://127.0.0.1:${hostPort}` : null;
}
export function inferVerifyProjectProfile(cwd, baseSettings = {}, recipeOverride) {
    const pkg = readPackageJson(cwd);
    const packageManager = detectPackageManager(cwd);
    const recipe = recipeOverride ?? inferFallbackRecipe(cwd, pkg, packageManager);
    const inferredDefaults = recipe.smokeKind === "http" && recipe.startPort ? { ports: [`${recipe.startPort}:${recipe.startPort}`] } : {};
    const sandboxSettings = mergeSandboxSettings(inferredDefaults, baseSettings);
    const smokeUrl = inferVerifySmokeUrl(sandboxSettings);
    const recipeWithRuntime = {
        ...recipe,
        smokeTarget: recipe.smokeKind === "http" ? (smokeUrl ?? recipe.smokeTarget) : undefined,
    };
    if (!fs.existsSync(path.join(cwd, "node_modules")) && recipeWithRuntime.ecosystem === "node") {
        recipeWithRuntime.notes = dedupe([
            ...recipeWithRuntime.notes,
            "Host dependencies are not installed in node_modules. Verification may be limited unless a Shuru checkpoint already contains the needed runtime dependencies.",
        ]);
    }
    return {
        appKind: normalizeVerifyAppKind(recipeWithRuntime.appKind),
        appLabel: recipeWithRuntime.appLabel,
        packageManager,
        availableScripts: Object.keys(pkg?.scripts ?? {}),
        hasNodeModules: fs.existsSync(path.join(cwd, "node_modules")),
        sandboxSettings,
        recipe: recipeWithRuntime,
    };
}
//# sourceMappingURL=recipes.js.map