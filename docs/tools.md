# Tools Reference

`src/tools/` is the retained upstream agent-tool system used by `src/QueryEngine.ts`, `src/Tool.ts`, `src/services/tools/`, and `src/tools.ts`.

The active headless Clawd CLI in `src/cli.ts` does not call this registry directly. It calls mode classes and provider clients instead. Treat this document as the reference for the retained agent/Ink runtime.

## Tool Registry

The source of truth is `src/tools.ts`.

Important exported functions:

| Function | Purpose |
|----------|---------|
| `getAllBaseTools()` | Exhaustive built-in tools available for the current env and feature flags. |
| `getTools(permissionContext)` | Built-in tools visible to the model after simple-mode, deny-rule, REPL-mode, and `isEnabled()` filtering. |
| `assembleToolPool(permissionContext, mcpTools)` | Prompt-cache-stable merge of built-in tools and MCP tools. Built-ins win on name conflicts. |
| `getMergedTools(permissionContext, mcpTools)` | Simple concatenation for contexts that need all built-ins plus MCP tools. |
| `filterToolsByDenyRules()` | Removes built-ins or MCP tools blanket-denied by permission rules. |

`CLAUDE_CODE_SIMPLE=true` reduces tools to Bash, file read, and file edit. If REPL mode is enabled, simple mode returns the REPL tool instead of raw primitives.

## Tool Definition Pattern

Tools use `buildTool()` from `src/Tool.ts`:

```typescript
export const ExampleTool = buildTool({
  name: 'Example',
  inputSchema: z.object({}),
  async description(input) {},
  async prompt(options) {},
  async checkPermissions(input, context) {},
  async call(input, context, canUseTool, parentMessage, onProgress) {},
  isConcurrencySafe(input) {},
  isReadOnly(input) {},
  renderToolUseMessage(input, options) {},
  renderToolResultMessage(content, progressMessages, options) {},
})
```

The tool executor in `src/services/tools/toolExecution.ts` validates input, runs pre-tool hooks, resolves permissions, records telemetry, executes the tool, runs post-tool hooks, and maps results back into user/tool-result messages.

The orchestrator in `src/services/tools/toolOrchestration.ts` partitions tool calls into batches. Consecutive concurrency-safe calls run in parallel, capped by `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY` or `10`; non-safe calls run serially.

## Default Built-In Tools

These are included by `getAllBaseTools()` without requiring feature flags, subject to runtime `isEnabled()` checks and deny rules:

| Tool | Path | Summary |
|------|------|---------|
| `AgentTool` | `src/tools/AgentTool/` | Spawn sub-agents. Alias includes legacy agent tool name. |
| `TaskOutputTool` | `src/tools/TaskOutputTool/` | Read task/sub-agent/shell output. Aliases include `AgentOutputTool` and `BashOutputTool`. |
| `BashTool` | `src/tools/BashTool/` | Run shell commands with parsing, sandboxing, permission checks, and command semantics. |
| `GlobTool` | `src/tools/GlobTool/` | File glob search, omitted when embedded search tools are available. |
| `GrepTool` | `src/tools/GrepTool/` | Ripgrep-backed content search, omitted when embedded search tools are available. |
| `ExitPlanModeV2Tool` | `src/tools/ExitPlanModeTool/` | Exit plan mode and resume execution. |
| `FileReadTool` | `src/tools/FileReadTool/` | Read text, images, PDFs, and notebooks with limits. |
| `FileEditTool` | `src/tools/FileEditTool/` | Edit existing files by replacement. |
| `FileWriteTool` | `src/tools/FileWriteTool/` | Write or overwrite files. |
| `NotebookEditTool` | `src/tools/NotebookEditTool/` | Edit notebook cells. |
| `WebFetchTool` | `src/tools/WebFetchTool/` | Fetch URL content with permission UI and preapproval helpers. |
| `TodoWriteTool` | `src/tools/TodoWriteTool/` | Maintain structured todos. |
| `WebSearchTool` | `src/tools/WebSearchTool/` | Web search wrapper. |
| `TaskStopTool` | `src/tools/TaskStopTool/` | Stop running tasks. Alias: `KillShell`. |
| `AskUserQuestionTool` | `src/tools/AskUserQuestionTool/` | Ask the user structured questions during tool flow. |
| `SkillTool` | `src/tools/SkillTool/` | Execute registered skills. |
| `EnterPlanModeTool` | `src/tools/EnterPlanModeTool/` | Enter plan mode. |
| `SendMessageTool` | `src/tools/SendMessageTool/` | Send messages to teammates/agents. |
| `BriefTool` | `src/tools/BriefTool/` | Send or generate a brief/status update. Alias includes legacy brief name. |
| `ListMcpResourcesTool` | `src/tools/ListMcpResourcesTool/` | List MCP resources. Special tool filtered from normal built-ins in some contexts. |
| `ReadMcpResourceTool` | `src/tools/ReadMcpResourceTool/` | Read an MCP resource. Special tool filtered from normal built-ins in some contexts. |

## Conditional Built-In Tools

These are included only when env, user type, or feature flags allow them:

| Tool | Condition in `src/tools.ts` |
|------|-----------------------------|
| `ConfigTool` | `USER_TYPE === 'ant'` |
| `TungstenTool` | `USER_TYPE === 'ant'` |
| `SuggestBackgroundPRTool` | `USER_TYPE === 'ant'` and module present |
| `REPLTool` | `USER_TYPE === 'ant'` and REPL tool module present |
| `PowerShellTool` | `isPowerShellToolEnabled()` |
| `LSPTool` | `ENABLE_LSP_TOOL` truthy |
| `TaskCreateTool`, `TaskGetTool`, `TaskUpdateTool`, `TaskListTool` | `isTodoV2Enabled()` |
| `EnterWorktreeTool`, `ExitWorktreeTool` | `isWorktreeModeEnabled()` |
| `TeamCreateTool`, `TeamDeleteTool` | `isAgentSwarmsEnabled()` |
| `TestingPermissionTool` | `NODE_ENV === 'test'` |
| `ToolSearchTool` | `isToolSearchEnabledOptimistic()` |
| `SleepTool` | `feature('PROACTIVE')` or `feature('KAIROS')` |
| `CronCreateTool`, `CronDeleteTool`, `CronListTool` | `feature('AGENT_TRIGGERS')` |
| `RemoteTriggerTool` | `feature('AGENT_TRIGGERS_REMOTE')` |
| `MonitorTool` | `feature('MONITOR_TOOL')` |
| `WebBrowserTool` | `feature('WEB_BROWSER_TOOL')` |
| `WorkflowTool` | `feature('WORKFLOW_SCRIPTS')` |
| `VerifyPlanExecutionTool` | `CLAUDE_CODE_VERIFY_PLAN === 'true'` |
| `OverflowTestTool` | `feature('OVERFLOW_TEST_TOOL')` |
| `CtxInspectTool` | `feature('CONTEXT_COLLAPSE')` |
| `TerminalCaptureTool` | `feature('TERMINAL_PANEL')` |
| `SnipTool` | `feature('HISTORY_SNIP')` |
| `ListPeersTool` | `feature('UDS_INBOX')` |
| `SendUserFileTool` | `feature('KAIROS')` |
| `PushNotificationTool` | `feature('KAIROS')` or `feature('KAIROS_PUSH_NOTIFICATION')` |
| `SubscribePRTool` | `feature('KAIROS_GITHUB_WEBHOOKS')` |

Some conditional imports reference tools that are not present in this checkout's `src/tools/` directory. Keep those feature flags off unless the missing tool directories are restored.

Current caveat: `src/tools.ts` also statically imports `src/tools/TungstenTool/TungstenTool.js`, but `src/tools/TungstenTool/` is not present in this checkout. That retained upstream registry needs the directory restored or the import guarded/removed before it can type-check as-is.

## MCP Tools

MCP has two layers:

| Layer | Path | Notes |
|-------|------|-------|
| Built-in MCP helper tools | `ListMcpResourcesTool`, `ReadMcpResourceTool`, `ToolSearchTool` | Included from `src/tools.ts` depending on special filtering and tool-search state. |
| Dynamic server tools | `src/tools/MCPTool/`, `src/tools/McpAuthTool/`, `src/services/mcp/` | Created from connected MCP servers and merged through `assembleToolPool()`. |

`MCPTool` is the execution wrapper for server-provided tools. `McpAuthTool` is generated per server authentication flow through `buildMcpToolName(serverName, 'authenticate')`.

## Permissions

Permission context is defined in `src/Tool.ts` and `src/types/permissions.ts`.

Key fields:

| Field | Purpose |
|-------|---------|
| `mode` | Current permission mode, such as default, plan, bypass, or auto. |
| `additionalWorkingDirectories` | Extra workspace directories allowed by the session. |
| `alwaysAllowRules` | Configured allow rules by source. |
| `alwaysDenyRules` | Configured deny rules by source. |
| `alwaysAskRules` | Configured ask rules by source. |
| `isBypassPermissionsModeAvailable` | Whether bypass mode may be used. |
| `shouldAvoidPermissionPrompts` | Used by background contexts that cannot show UI. |
| `awaitAutomatedChecksBeforeDialog` | Used by coordinator workers before prompting. |

Permission handling lives in:

| Path | Role |
|------|------|
| `src/hooks/toolPermission/PermissionContext.ts` | Permission context and classifier integration. |
| `src/hooks/toolPermission/handlers/interactiveHandler.ts` | Interactive permission prompt path. |
| `src/hooks/toolPermission/handlers/coordinatorHandler.ts` | Coordinator worker permission path. |
| `src/hooks/toolPermission/handlers/swarmWorkerHandler.ts` | Swarm worker permission path. |
| `src/components/permissions/` | Terminal UI for permission requests. |
| `src/services/tools/toolHooks.ts` | Pre/post tool hook integration. |

Permission rules use patterns such as:

```text
Bash(git *)
FileRead(*)
FileEdit(/absolute/path/*)
mcp__server_name
```

## Task Tools

The task system uses both retained task classes and tools:

| Tool | Summary |
|------|---------|
| `TaskCreateTool` | Create a task when todo v2 is enabled. |
| `TaskGetTool` | Retrieve task details. |
| `TaskUpdateTool` | Update a task. |
| `TaskListTool` | List tasks. |
| `TaskOutputTool` | Read output from agent or shell task aliases. |
| `TaskStopTool` | Stop a task. |

Task implementations are in `src/tasks/`: local shell, local agent, remote agent, in-process teammate, dream task, and local main session.

## File And Shell Tools

| Area | Paths |
|------|-------|
| Shell | `src/tools/BashTool/`, `src/utils/bash/`, `src/utils/shell/`, `src/utils/powershell/`, `src/tools/PowerShellTool/` |
| File read/edit/write | `src/tools/FileReadTool/`, `src/tools/FileEditTool/`, `src/tools/FileWriteTool/`, `src/utils/fileRead.ts`, `src/utils/readEditContext.ts` |
| Search | `src/tools/GlobTool/`, `src/tools/GrepTool/`, `src/utils/ripgrep.ts` |
| Notebook | `src/tools/NotebookEditTool/`, `src/utils/notebook.ts` |

## See Also

- [Architecture](architecture.md)
- [Subsystems Guide](subsystems.md)
- [Commands Reference](commands.md)
