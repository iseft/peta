import { Pressable, type PressableProps, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: 'primary' | 'secondary';
};

export function Button({ label, variant = 'primary', disabled, style, ...rest }: ButtonProps) {
  const theme = useTheme();
  const primary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={(state) => [
        styles.button,
        {
          backgroundColor: primary ? theme.accent : 'transparent',
          borderColor: theme.border,
          opacity: disabled ? 0.4 : 1,
          transform: [{ scale: state.pressed ? 0.97 : 1 }],
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}>
      <ThemedText type="smallBold" style={[styles.label, primary && { color: theme.onAccent }]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 17, textAlign: 'center' },
});
