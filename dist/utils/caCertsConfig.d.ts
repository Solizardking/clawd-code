/**
 * Config/settings-backed NODE_EXTRA_CA_CERTS population for `caCerts.ts`.
 *
 * Split from `caCerts.ts` because `config.ts` → `file.ts` →
 * `permissions/filesystem.ts` → `commands.ts` transitively pulls in ~5300
 * modules (REPL, React, every slash command). `proxy.ts`/`mtls.ts` (and
 * therefore anything using HTTPS through our proxy agent — WebSocketTransport,
 * CCRClient, telemetry) must NOT depend on that graph, or the Agent SDK
 * bundle (`connectRemoteControl` path) bloats from ~0.4 MB to ~10.8 MB.
 *
 * `getCACertificates()` only reads `process.env.NODE_EXTRA_CA_CERTS`. This
 * module is the one place allowed to import `config.ts` to *populate* that
 * env var at CLI startup. Only `init.ts` imports this file.
 */
/**
 * Apply NODE_EXTRA_CA_CERTS from settings.json to process.env early in init,
 * BEFORE any TLS connections are made.
 *
 * Bun caches the TLS certificate store at process boot via BoringSSL.
 * If NODE_EXTRA_CA_CERTS isn't set in the environment at boot, Bun won't
 * include the custom CA cert. By setting it on process.env before any
 * TLS connections, we give Bun a chance to pick it up (if the cert store
 * is lazy-initialized) and ensure Node.js compatibility.
 *
 * This is safe to call before the trust dialog because we only read from
 * user-controlled files (~/.claude/settings.json and ~/.claude.json),
 * not from project-level settings.
 */
export declare function applyExtraCACertsFromConfig(): void;
//# sourceMappingURL=caCertsConfig.d.ts.map