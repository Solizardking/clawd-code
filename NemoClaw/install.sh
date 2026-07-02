#!/usr/bin/env bash
set -euo pipefail

NEMOCLAWD_HOME="${NEMOCLAWD_HOME:-$HOME/.nemoclawd}"
AGENT_NAME="nvidia-glm-5-2"
AGENT_DIR="$NEMOCLAWD_HOME/agents/$AGENT_NAME"
WALLET_DIR="$NEMOCLAWD_HOME/openshell-wallets/$AGENT_NAME"

mkdir -p "$AGENT_DIR" "$WALLET_DIR"

cat > "$NEMOCLAWD_HOME/inference.env.example" <<'ENV'
NEMOCLAWD_PROVIDER=zai
NEMOCLAWD_MODEL=glm-5.2
ZAI_API_KEY=
ZAI_BASE_URL=https://api.z.ai/api/paas/v4
OPENROUTER_API_KEY=
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
ENV

cp "$(dirname "$0")/agents/nvidia-glm-5-2/manifest.json" "$AGENT_DIR/manifest.json"

if [[ "${NEMOCLAWD_CREATE_AGENT_WALLET:-0}" == "1" ]]; then
  if command -v openshell >/dev/null 2>&1; then
    openshell wallet create --name "$AGENT_NAME" --scope agent --private
  else
    echo "openshell not found; prepared wallet directory at $WALLET_DIR"
  fi
fi

echo "Nemo Clawd installed at $NEMOCLAWD_HOME"
echo "Default inference: Z.AI glm-5.2 via ZAI_API_KEY"
echo "Agent manifest: $AGENT_DIR/manifest.json"
echo "Private wallet scope: openshell/$AGENT_NAME"
