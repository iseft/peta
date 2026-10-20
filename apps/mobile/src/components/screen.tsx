import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';

type ScreenProps = {
  children: ReactNode;
  // Pinned below the content, e.g. the screen's main action.
  footer?: ReactNode;
  scroll?: boolean;
};

export function Screen({ children, footer, scroll = false }: ScreenProps) {
  const theme = useTheme();
  const content = scroll ? (
    <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
  ) : (
    <View style={[styles.content, styles.fill]}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: theme.background }]}>
      {content}
      {footer && <View style={styles.footer}>{footer}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { padding: 24, gap: 16 },
  footer: { paddingHorizontal: 24, paddingBottom: 16, gap: 12 },
});
