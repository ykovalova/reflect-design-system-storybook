#!/bin/zsh

SCRIPT_DIR=${0:A:h}
PROJECT_ROOT=${SCRIPT_DIR:h}
NODE_BIN="/Users/yuliia.kovalova/.local/nodejs/node-v22.22.1-darwin-arm64/bin"

if [[ ! -x "${NODE_BIN}/node" ]]; then
  echo "Local Node.js was not found at ${NODE_BIN}."
  return 1 2>/dev/null || exit 1
fi

export PATH="${NODE_BIN}:${PATH}"
export NODE_OPTIONS="--use-system-ca ${NODE_OPTIONS}"
export HOME="${PROJECT_ROOT}/.codex-home"
export XDG_CONFIG_HOME="${PROJECT_ROOT}/.codex-config"

mkdir -p "${HOME}" "${XDG_CONFIG_HOME}"

echo "Local Node.js activated for ${PROJECT_ROOT}"
echo "node: $(node -v)"
echo "npm: $(npm -v)"
