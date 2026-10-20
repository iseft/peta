import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type RowProps = {
  title: string;
  detail?: string;
  trailing?: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
};

// One line of a list: title and detail on the left, an amount or action on
// the right. Pressable only when it does something.
export function Row({ title, detail, trailing, onPress, onLongPress }: RowProps) {
  const theme = useTheme();
  const content = (
    <>
      <View style={styles.text}>
        <ThemedText>{title}</ThemedText>
        {detail && (
          <ThemedText type="small" themeColor="textSecondary">
            {detail}
          </ThemedText>
        )}
      </View>
      {trailing}
    </>
  );
  if (!onPress && !onLongPress) return <View style={styles.row}>{content}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: theme.backgroundElement }]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 52,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  text: { flex: 1 },
});
