// Sentry's wrapper around Expo's default config adds debug ids to the bundle,
// so Better Stack can match stack traces to the uploaded source maps.
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

module.exports = getSentryExpoConfig(__dirname);
