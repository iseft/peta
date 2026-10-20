import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { Alert, Platform } from 'react-native';

import { SUPPORT_EMAIL } from '@/config';
import { buildFeedbackMailto } from '@/lib/feedback-mailto';

export async function openFeedbackEmail(): Promise<void> {
  const url = buildFeedbackMailto({
    appVersion: Constants.expoConfig?.version ?? 'unknown',
    platform: `${Platform.OS} ${Platform.Version}`,
  });
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('No email app found', `Write to ${SUPPORT_EMAIL}. Thanks for the feedback.`);
  }
}
