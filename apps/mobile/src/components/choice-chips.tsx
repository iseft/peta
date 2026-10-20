import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type Choice<T extends string> = { value: T; label: string };

type ChoiceChipsProps<T extends string> = {
  label?: string;
  choices: readonly Choice<T>[];
  value: T | null;
  onChange: (value: T) => void;
  // Long lists (currencies) scroll sideways instead of wrapping.
  scroll?: boolean;
};

export function ChoiceChips<T extends string>({
  label,
  choices,
  value,
  onChange,
  scroll = false,
}: ChoiceChipsProps<T>) {
  const theme = useTheme();
  const chips = choices.map((choice) => {
    const selected = choice.value === value;
    return (
      <Pressable
        key={choice.value}
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        onPress={() => onChange(choice.value)}
        style={[
          styles.chip,
          {
            borderColor: selected ? theme.accent : theme.border,
            backgroundColor: selected ? theme.accent : 'transparent',
          },
        ]}>
        <ThemedText type="smallBold" style={selected && { color: theme.onAccent }}>
          {choice.label}
        </ThemedText>
      </Pressable>
    );
  });

  return (
    <View style={styles.field} accessibilityRole="radiogroup" accessibilityLabel={label}>
      {label && <ThemedText type="smallBold">{label}</ThemedText>}
      {scroll ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
          {chips}
        </ScrollView>
      ) : (
        <View style={[styles.row, styles.wrap]}>{chips}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 6 },
  row: { flexDirection: 'row', gap: 8 },
  wrap: { flexWrap: 'wrap' },
  chip: {
    borderWidth: 2,
    borderRadius: 999,
    paddingHorizontal: 14,
    minHeight: 40,
    justifyContent: 'center',
  },
});
