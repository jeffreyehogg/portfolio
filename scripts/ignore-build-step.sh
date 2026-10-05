#!/bin/bash

# Target app directory (e.g. "apps/algoquest", "apps/portfolio")
TARGET_APP="$1"

# Find git repository root
GIT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo ".")

if [ -z "$TARGET_APP" ]; then
  TARGET_APP=$(git rev-parse --show-prefix 2>/dev/null | sed 's/\/$//')
fi

echo "[ignore-build-step] Evaluating target: $TARGET_APP"

if [ -z "$TARGET_APP" ]; then
  echo "[ignore-build-step] Unknown target app, proceeding with build."
  exit 1
fi

# Determine commit range
FROM_SHA="${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}"
TO_SHA="${VERCEL_GIT_COMMIT_SHA:-HEAD}"

# Validate commit exists in git tree
if ! git rev-parse --verify "$FROM_SHA" >/dev/null 2>&1; then
  echo "[ignore-build-step] Previous commit $FROM_SHA not found. Proceeding with build."
  exit 1
fi

# Check if target app or shared packages have changed
if git diff --quiet "$FROM_SHA" "$TO_SHA" -- "$GIT_ROOT/$TARGET_APP" "$GIT_ROOT/packages"; then
  echo "✓ [ignore-build-step] No changes in $TARGET_APP or packages/. Skipping build."
  exit 0
else
  echo "⚡ [ignore-build-step] Changes detected in $TARGET_APP or packages/. Proceeding with build."
  exit 1
fi
