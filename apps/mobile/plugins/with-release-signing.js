// Signs release builds with the Google Play upload key when
// scripts/build-android-release.sh provides it through the environment
// (keystore from 1Password item "Android upload key"). Without it, release
// builds stay signed with the debug key, as before, for local testing.
const { withAppBuildGradle } = require('expo/config-plugins');

const RELEASE_SIGNING = `
        release {
            if (System.getenv('ANDROID_UPLOAD_KEYSTORE')) {
                storeFile file(System.getenv('ANDROID_UPLOAD_KEYSTORE'))
                storePassword System.getenv('ANDROID_UPLOAD_KEY_PASSWORD')
                keyAlias System.getenv('ANDROID_UPLOAD_KEY_ALIAS') ?: 'upload'
                keyPassword System.getenv('ANDROID_UPLOAD_KEY_PASSWORD')
            }
        }`;

module.exports = function withReleaseSigning(config) {
  return withAppBuildGradle(config, (config) => {
    let gradle = config.modResults.contents;
    if (gradle.includes("System.getenv('ANDROID_UPLOAD_KEYSTORE')")) return config;

    const debugConfig = /(signingConfigs \{\s*debug \{[^}]*\})/;
    const releaseUsesDebug = /(release \{[^}]*?)signingConfig signingConfigs\.debug/;
    if (!debugConfig.test(gradle) || !releaseUsesDebug.test(gradle)) {
      throw new Error('with-release-signing: app/build.gradle no longer has the expected signing blocks');
    }
    gradle = gradle.replace(debugConfig, `$1${RELEASE_SIGNING}`);
    gradle = gradle.replace(
      releaseUsesDebug,
      "$1signingConfig System.getenv('ANDROID_UPLOAD_KEYSTORE') ? signingConfigs.release : signingConfigs.debug",
    );
    config.modResults.contents = gradle;
    return config;
  });
};
