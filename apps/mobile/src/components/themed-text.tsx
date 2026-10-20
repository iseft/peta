import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'small' | 'smallBold' | 'amount';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      // Lets TalkBack users jump between headings.
      accessibilityRole={type === 'title' || type === 'subtitle' ? 'header' : undefined}
      style={[{ color: theme[themeColor ?? 'text'] }, styles[type], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: { fontSize: 17, lineHeight: 24, fontWeight: 500 },
  small: { fontSize: 14, lineHeight: 20, fontWeight: 500 },
  smallBold: { fontSize: 14, lineHeight: 20, fontWeight: 700 },
  title: { fontFamily: Fonts.display, fontSize: 44, lineHeight: 48, letterSpacing: -1 },
  subtitle: { fontFamily: Fonts.display, fontSize: 28, lineHeight: 34, letterSpacing: -0.5 },
  // Money: tabular digits so columns of amounts line up.
  amount: { fontSize: 17, lineHeight: 24, fontWeight: 700, fontVariant: ['tabular-nums'] },
});
