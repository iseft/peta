import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type QueryStateProps = {
  error: Error | null;
  onRetry: () => void;
};

// What a screen shows while its data loads or after loading failed.
export function QueryState({ error, onRetry }: QueryStateProps) {
  const theme = useTheme();
  return (
    <View style={styles.center}>
      {error ? (
        <>
          <ThemedText>Couldn&apos;t load this: {error.message}</ThemedText>
          <Button label="Try again" variant="secondary" onPress={onRetry} />
        </>
      ) : (
        <ActivityIndicator color={theme.text} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
});
