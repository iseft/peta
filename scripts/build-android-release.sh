#!/usr/bin/env bash
# Builds the Google Play upload bundle (.aab), signed with the upload key from
# 1Password, and uploads its source map to Better Stack:
#   pnpm run build:android:release        (`eval $(op signin)` first if needed)
# Bump expo.version / expo.android.versionCode in apps/mobile/app.json before
# every upload: Google Play rejects a versionCode it has seen.
set -euo pipefail

VAULT="PETA"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MOBILE="$ROOT/apps/mobile"
export JAVA_HOME="${JAVA_HOME:-/Applications/Android Studio.app/Contents/jbr/Contents/Home}"
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"

KEY_DIR="$(mktemp -d)"
trap 'rm -rf "$KEY_DIR"' EXIT

op read "op://$VAULT/Android upload key/keystore" --out-file "$KEY_DIR/upload.keystore" >/dev/null
export ANDROID_UPLOAD_KEYSTORE="$KEY_DIR/upload.keystore"
export ANDROID_UPLOAD_KEY_ALIAS="$(op read "op://$VAULT/Android upload key/key_alias")"
export ANDROID_UPLOAD_KEY_PASSWORD="$(op read "op://$VAULT/Android upload key/password")"
EXPECTED_SHA256="$(op read "op://$VAULT/Android upload key/sha256_fingerprint")"
# Optional until the Better Stack applications exist: without it the source
# map upload below is skipped.
export SENTRY_AUTH_TOKEN="$(op read "op://$VAULT/Better Stack/api_token" 2>/dev/null || true)"

# Expo inlines EXPO_PUBLIC_ values into the bundle, and values already in the
# environment win over apps/mobile/.env (which points at development Clerk and
# the emulator), so a release always carries production values. They come from
# 1Password (scripts/setup-wizard.sh saves them) and are checked here because
# a wrong one blocks every user of that build.
export EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="$(op read "op://$VAULT/Clerk/CLERK_PUBLISHABLE_KEY_PROD")"
export EXPO_PUBLIC_API_URL="$(op read "op://$VAULT/Railway/api_url_prod")"
export EXPO_PUBLIC_WEB_URL="$(op read "op://$VAULT/Railway/web_url_prod")"
[[ "$EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY" == pk_live_* ]] || { echo "Clerk key in 1Password is not a production key (pk_live_…)." >&2; exit 1; }
[[ "$EXPO_PUBLIC_API_URL" =~ ^https://[^/]+/api$ ]] || { echo "api_url_prod must be https://<host>/api, got $EXPO_PUBLIC_API_URL" >&2; exit 1; }
[[ "$EXPO_PUBLIC_WEB_URL" =~ ^https://[^/]+$ ]] || { echo "web_url_prod must be https://<host>, got $EXPO_PUBLIC_WEB_URL" >&2; exit 1; }
curl -fsS "$EXPO_PUBLIC_API_URL/health" >/dev/null || { echo "The production API does not answer at $EXPO_PUBLIC_API_URL/health." >&2; exit 1; }

VERSION="$(node -p "require('$MOBILE/app.json').expo.version")"
VERSION_CODE="$(node -p "require('$MOBILE/app.json').expo.android.versionCode")"
echo "Building $VERSION ($VERSION_CODE)…"

cd "$MOBILE"
CI=1 npx expo prebuild --platform android --clean
# @sentry/react-native's own upload ties maps to a release, which Better
# Stack rejects ("organization not found"); it matches them by debug id
# instead, so the map is uploaded below, like the API's. Better Stack does not
# always accept a Hermes map, so a failed upload only warns.
(cd android && SENTRY_DISABLE_AUTO_UPLOAD=true ./gradlew bundleRelease)

AAB="$MOBILE/android/app/build/outputs/bundle/release/app-release.aab"
SIGNER="$("$JAVA_HOME/bin/keytool" -printcert -jarfile "$AAB" | grep 'SHA256:' | head -1 | sed 's/.*SHA256: //')"
if [ "$SIGNER" != "$EXPECTED_SHA256" ]; then
  echo "The bundle is not signed with the upload key (signer $SIGNER)." >&2
  exit 1
fi

# Better Stack application "Peta Mobile".
if [[ -z "$SENTRY_AUTH_TOKEN" ]]; then
  echo "No Better Stack token in 1Password: skipping the source map upload." >&2
else
SENTRY_URL="$(node -p "require('$MOBILE/app.json').expo.plugins.find((p) => p[0] === '@sentry/react-native')[1].url")" \
SENTRY_ORG="$(node -p "require('$MOBILE/app.json').expo.plugins.find((p) => p[0] === '@sentry/react-native')[1].organization")" \
SENTRY_PROJECT="$(node -p "require('$MOBILE/app.json').expo.plugins.find((p) => p[0] === '@sentry/react-native')[1].project")" \
  "$ROOT/apps/api/node_modules/.bin/sentry-cli" sourcemaps upload \
  "$MOBILE/android/app/build/generated/sourcemaps/react/release/index.android.bundle.map" ||
  echo "Warning: the source map upload failed; crash reports will show minified stack traces." >&2
fi

OUT="$MOBILE/build/peta-$VERSION-$VERSION_CODE.aab"
mkdir -p "$MOBILE/build"
cp "$AAB" "$OUT"
echo "Signed with the upload key: $OUT"
