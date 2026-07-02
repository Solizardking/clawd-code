# Install and Smoke Test

This checkout is the Clawd Code package root. The installer supports three
paths:

1. Local/source install from a package directory.
2. Published npm package install.
3. Git clone fallback for the upstream repository.

## Local Smoke Test

Run the installer against this checkout without linking a global binary:

```bash
CLAWD_CODE_SOURCE_DIR=/Users/8bit/clawd-code \
CLAWD_CODE_CONFIG_DIR=/tmp/clawd-code-smoke-home/.clawd-code \
CLAWD_CODE_SMOKE_TEST=true \
sh /Users/8bit/clawd-code/install.sh
```

Smoke mode still runs `npm install`, `npm run build`, and writes a fresh
`.env` into the configured test config directory. It skips `npm link` so it
does not mutate the global npm environment.

## One-Shot Local Install

Run from the package root:

```bash
./install.sh
```

When `install.sh` is executed from this checkout, it detects the local package
root and installs from source in one shot.

## Layout Notes

- `src/` contains the CLI and provider adapters.
- `clawd-plugin/` contains the plugin manifest, MCP config, skills, and
  reference docs.
- `web/` contains the web client package.
- Clawd Code is always NemoClaw-enabled: OpenRouter Nemo/Fable routing is built
  into `src/openrouter.ts`.
- If an optional `NemoClaw/` sidecar package is present, keep `NemoClaw/src/`
  aligned with `src/openrouter.ts`.
- Root `.github/`, `docker/`, `scripts/`, `prompts/`, and `outputs/`
  directories are optional workspace folders and are not required by the
  installer.
