import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type TextFieldProps = TextInputProps & {
  label: string;
  hint?: string;
  error?: string | null;
};

export function TextField({ label, hint, error, style, ...rest }: TextFieldProps) {
  const theme = useTheme();
  return (
    <View style={styles.field}>
      <ThemedText type="smallBold">{label}</ThemedText>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={theme.textSecondary}
        style={[
          styles.input,
          { borderColor: error ? theme.bad : theme.border, color: theme.text },
          style,
        ]}
        {...rest}
      />
      {(error || hint) && (
        <ThemedText type="small" style={{ color: error ? theme.bad : theme.textSecondary }}>
          {error ?? hint}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 6 },
  input: { borderWidth: 2, borderRadius: 12, paddingHorizontal: 14, minHeight: 50, fontSize: 17 },
});
