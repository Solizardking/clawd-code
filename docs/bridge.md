# Bridge Layer

`src/bridge/` is the retained upstream bridge that connects an upstream Claude Code REPL session to IDE extensions, claude.ai remote-control sessions, and session-ingress style workers.

In the active Clawd package, `package.json` runs `src/cli.ts`, which does not enter bridge mode. Bridge code is still present, but it belongs to the retained upstream runtime around `src/main.tsx`, `src/replLauncher.tsx`, `src/screens/REPL.tsx`, and `src/commands copy.ts`.

## Current Status

| Item | Current state |
|------|---------------|
| Active headless Clawd CLI | No bridge dispatch in `src/cli.ts`. |
| Retained upstream entry | `src/main.tsx` contains `feature('BRIDGE_MODE')` and remote-control paths. |
| Bridge command module | `src/commands/bridge/index.ts` defines command name `remote-control`. |
| Old command registry | `src/commands copy.ts` conditionally loads `commands/bridge`. |
| Active top-level `src/commands.ts` | Solana command router; does not export upstream `getCommands()`. |
| Stub | `src/bridge/stub.ts` provides no-op bridge fallbacks. |

Do not assume `src/main.tsx` remote-control mode is currently wired to the active top-level `src/commands.ts`. It was written for the upstream command registry shape.

## Files

| File | Purpose |
|------|---------|
| `bridgeMain.ts` | Main bridge loop, polling, session spawn, heartbeat, backoff, capacity wake, timeout, and teardown. |
| `bridgeApi.ts` | Environment/session-ingress API client and bridge API errors. |
| `bridgeConfig.ts` | Bridge configuration resolution. |
| `bridgeEnabled.ts` | `BRIDGE_MODE`, CCR, and auto-connect feature checks. |
| `bridgeMessaging.ts` | Message conversion and outbound message handling. |
| `bridgePermissionCallbacks.ts` | Permission request/response callbacks for bridge sessions. |
| `bridgePointer.ts` | Bridge pointer state. |
| `bridgeStatusUtil.ts` | Status formatting utilities. |
| `bridgeUI.ts` | Terminal bridge logger/status UI. |
| `capacityWake.ts` | Wake mechanism when active session capacity frees up. |
| `codeSessionApi.ts` | Code-session API helpers. |
| `createSession.ts` | Bridge session creation. |
| `debugUtils.ts`, `bridgeDebug.ts` | Bridge debug helpers. |
| `envLessBridgeConfig.ts` | Env-less bridge configuration path. |
| `flushGate.ts` | Flush coordination. |
| `inboundAttachments.ts` | Attachment handling from inbound bridge messages. |
| `inboundMessages.ts` | Inbound user/control message handling. |
| `initReplBridge.ts` | Initializes bridge from the REPL side. |
| `jwtUtils.ts` | JWT decoding and proactive refresh scheduling. |
| `pollConfig.ts`, `pollConfigDefaults.ts` | Bridge polling/backoff configuration. |
| `remoteBridgeCore.ts` | Remote bridge core and outbound-only mirror support. |
| `replBridge.ts` | REPL bridge state and message API. |
| `replBridgeHandle.ts` | Global handle access. |
| `replBridgeTransport.ts` | Bridge transport abstraction. |
| `sessionIdCompat.ts` | Compatibility conversion between session ID formats. |
| `sessionRunner.ts` | Child session spawn/management. |
| `trustedDevice.ts` | Trusted-device token support. |
| `types.ts` | Shared bridge protocol/config/session types. |
| `workSecret.ts` | Work-secret decoding, SDK URL construction, and worker registration. |

## Transport Model

The bridge supports two transport generations:

| Generation | Read path | Write path | Setup |
|------------|-----------|------------|-------|
| v1 env-based | WebSocket/HybridTransport to session ingress | HTTP POST to session ingress | Register environment, poll work, acknowledge, spawn session. |
| v2 env-less | SSE through `SSETransport` | `CCRClient` worker endpoints | Create code session, bridge for worker JWT, connect directly. |

Both paths are hidden behind the `ReplBridgeTransport` interface.

## Authentication

Authentication inputs used by the retained bridge:

| Mechanism | Files | Notes |
|-----------|-------|-------|
| OAuth/subscription | `bridgeEnabled.ts`, auth utilities | Bridge checks GrowthBook gates and Claude AI subscriber state. |
| Session-ingress JWT | `jwtUtils.ts`, `workSecret.ts` | Decoded for expiration and refreshed proactively. |
| Trusted device token | `trustedDevice.ts` | Sent as elevated security tier header where needed. |
| Work secret | `workSecret.ts` | Base64url-encoded payload with tokens, API URL, git sources, and MCP config. |
| Dev overrides | bridge config paths | `CLAUDE_BRIDGE_OAUTH_TOKEN` and `CLAUDE_BRIDGE_BASE_URL` are ant-only override paths. |

## Message Flow

```text
IDE or claude.ai
  -> session ingress or worker transport
  -> bridge transport
  -> repl bridge
  -> REPL / QueryEngine / tools
  -> outbound assistant, tool, result, and status messages
```

Inbound messages include:

| Message | Behavior |
|---------|----------|
| User prompts | Enqueued into the REPL session. |
| Control requests | Initialize, set model, interrupt, set permission mode, set thinking tokens, or ask for permission. |
| Control responses | Permission decisions and other host responses. |
| Attachments | Routed through inbound attachment helpers. |

Outbound messages include assistant messages, echoed user messages, result messages, tool/activity events, and status updates.

Deduplication uses bounded recent UUID tracking so bridge echoes and redeliveries do not duplicate messages.

## Bridge Loop Lifecycle

`runBridgeLoop()` in `bridgeMain.ts` does the heavy lifting:

1. Validate bridge/environment IDs and decode work secrets.
2. Poll for work with backoff and sleep detection.
3. Spawn child sessions through `sessionRunner.ts`.
4. Track active sessions, work IDs, compat IDs, ingress JWTs, timers, and worktrees.
5. Heartbeat active work and requeue sessions when auth expires.
6. Enforce capacity and session timeout behavior.
7. Refresh tokens before expiry.
8. Tear down sessions, worktrees, transports, and telemetry on abort.

Spawn modes include single-session, worktree, and same-directory modes. Multi-session spawn requires the `tengu_ccr_bridge_multi_session` GrowthBook gate in the retained upstream path.

## Direct Connect And Remote Sessions

Bridge is not the only retained remote system:

| Area | Path | Purpose |
|------|------|---------|
| Direct connect client | `src/server/createDirectConnectSession.ts` | POSTs to `${serverUrl}/sessions`, validates response, and returns a direct-connect config. |
| Direct connect manager | `src/server/directConnectManager.ts` | WebSocket manager for SDK messages, permission requests, user messages, and interrupts. |
| Remote session manager | `src/remote/RemoteSessionManager.ts` | CCR WebSocket plus HTTP POST flow for remote sessions and permission decisions. |
| Remote WebSocket | `src/remote/SessionsWebSocket.ts` | WebSocket subscription and reconnect behavior. |
| Remote permission bridge | `src/remote/remotePermissionBridge.ts` | Routes permission requests between remote host and local UI. |

## Feature Gates

Relevant gates seen in current source:

| Gate | Area |
|------|------|
| `BRIDGE_MODE` | Main bridge availability and remote-control paths. |
| `CCR_AUTO_CONNECT` | Auto-connect bridge behavior. |
| `CCR_MIRROR` | Outbound-only mirror behavior. |
| `DIRECT_CONNECT` | Direct-connect paths in `src/main.tsx`. |
| `SSH_REMOTE` | SSH remote path in `src/main.tsx`. |
| `KAIROS` | Assistant/chat-specific bridge resume options and session handling. |
| `DAEMON` plus `BRIDGE_MODE` | Old remote-control server command path in `src/commands copy.ts`. |

## Running Bridge Code

In this checkout, the active `clawd-code` CLI does not expose bridge mode. To revive the retained upstream bridge path, first reconcile these points:

1. Restore or rewire the upstream command registry so `src/main.tsx` imports a module with `getCommands()` and `filterCommandsForRemoteMode()`.
2. Ensure all upstream runtime dependencies are installed and declared.
3. Build/run with the Bun feature flags expected by `src/main.tsx`.
4. Enable `BRIDGE_MODE` and satisfy OAuth/subscriber/GrowthBook requirements.
5. Verify `src/commands/bridge/index.ts` and `runBridgeLoop()` with a real or mocked session-ingress environment.

## See Also

- [Architecture](architecture.md)
- [Subsystems Guide](subsystems.md)
- [Commands Reference](commands.md)
