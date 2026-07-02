# Nemo Clawd

Nemo Clawd defaults to Z.AI GLM-5.2 for inference:

```bash
export ZAI_API_KEY=...
export NEMOCLAWD_PROVIDER=zai
export NEMOCLAWD_MODEL=glm-5.2
```

The Magic Router keeps OpenRouter available as an assist route for fallback
model selection and NVIDIA Nemotron comparison, but the primary provider stays
`zai` unless a route explicitly requires OpenRouter.

The NVIDIA GLM 5.2 OpenShell agent manifest is in
`agents/nvidia-glm-5-2/manifest.json`. It uses an agent-private OpenShell wallet
scope and never stores private key material in the repo.
