import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';

import { useProfile } from '@/api/queries';
import { QueryState } from '@/components/query-state';
import { Screen } from '@/components/screen';

// Sign-in is required (ADR 0001), then onboarding sets the Default Currency
// everything else is shown in.
export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const profile = useProfile(!!isSignedIn);

  if (!isLoaded) return <Screen><QueryState error={null} onRetry={() => {}} /></Screen>;
  if (!isSignedIn) return <Redirect href="/sign-in" />;
  if (!profile.data) {
    return (
      <Screen>
        <QueryState error={profile.error} onRetry={() => void profile.refetch()} />
      </Screen>
    );
  }
  if (!profile.data.onboarded) return <Redirect href="/onboarding" />;
  return <Redirect href="/monthly" />;
}
