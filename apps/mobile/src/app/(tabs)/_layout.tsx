import { useAuth } from '@clerk/expo';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

// One tab per built slice (docs/mvp-spec.md): Annual, Transactions, Savings
// and Analysis join as they are built. Settings sits behind the header button.
export default function TabsLayout() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  if (!isSignedIn) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarIcon: () => null,
        tabBarLabelStyle: styles.tabLabel,
        headerTitleStyle: { color: theme.text },
        headerRight: () => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Settings"
            onPress={() => router.push('/settings')}
            style={styles.settings}>
            <ThemedText type="smallBold">Settings</ThemedText>
          </Pressable>
        ),
      }}>
      <Tabs.Screen name="monthly" options={{ title: 'Monthly' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabLabel: { fontSize: 14, fontWeight: 700 },
  settings: { paddingHorizontal: 16, minHeight: 48, justifyContent: 'center' },
});
