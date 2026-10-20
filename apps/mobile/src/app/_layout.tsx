import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { SpaceGrotesk_700Bold, useFonts } from '@expo-google-fonts/space-grotesk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Sentry from '@sentry/react-native';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemedText } from '@/components/themed-text';
import { BETTERSTACK_DSN, CLERK_PUBLISHABLE_KEY } from '@/config';
import { Colors } from '@/constants/theme';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

// The Sentry SDK, reporting crashes and errors to Better Stack through its
// Sentry-compatible DSN. Release builds only, so development noise stays out.
Sentry.init({ dsn: BETTERSTACK_DSN, enabled: !__DEV__ && !!BETTERSTACK_DSN });

function RootLayout() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[scheme];
  // The display font is optional: if it fails to load, headings fall back to the system font.
  const [fontsLoaded, fontError] = useFonts({ SpaceGrotesk_700Bold });
  const navigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  if (!CLERK_PUBLISHABLE_KEY) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ThemedText>
          EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not set. Run `pnpm run env:pull`, then restart Metro.
        </ThemedText>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.fill}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            value={{
              ...navigationTheme,
              colors: {
                ...navigationTheme.colors,
                background: colors.background,
                card: colors.background,
                text: colors.text,
                primary: colors.accent,
              },
            }}>
            <StatusBar style="auto" />
            {!fontsLoaded && !fontError ? (
              <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator color={colors.text} />
              </View>
            ) : (
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="budget-item" options={{ presentation: 'modal' }} />
                <Stack.Screen name="payment-detail" options={{ presentation: 'modal' }} />
              </Stack>
            )}
          </ThemeProvider>
        </QueryClientProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
});

export default Sentry.wrap(RootLayout);
