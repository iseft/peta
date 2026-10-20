#!/usr/bin/env bash
# Writes apps/api/.env, apps/web/.env and apps/mobile/.env from their committed .env.example
# templates, resolving op:// references through the 1Password CLI. Add
# variables to the templates, never to the generated files.

set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v op >/dev/null 2>&1; then
  echo "1Password CLI not found. Install it: brew install 1password-cli" >&2
  exit 1
fi

if ! op account list >/dev/null 2>&1; then
  echo "Not signed in to 1Password. Run: eval \$(op signin)" >&2
  exit 1
fi

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

for app in api web mobile; do
  template="apps/$app/.env.example"
  out="apps/$app/.env"

  # Write through a temp file so a failed resolve cannot leave a half-written
  # file behind.
  if ! op inject --in-file "$template" --out-file "$tmp_dir/$app.env" --force >/dev/null; then
    echo "Failed to resolve secrets for $template" >&2
    exit 1
  fi

  # A documented-but-unset variable stays in the template as a reminder, but
  # writing KEY= would hand the app an empty string where it expects absence.
  sed -i '' '/^[A-Z_][A-Z0-9_]*=$/d' "$tmp_dir/$app.env"

  chmod 600 "$tmp_dir/$app.env"
  mv "$tmp_dir/$app.env" "$out"
  echo "wrote $out"
done
