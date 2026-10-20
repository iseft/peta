import '@/global.css';

const ink = '#16191D';
const paper = '#F6F7F4';
const green = '#2E8B57';

export const Colors = {
  light: {
    text: ink,
    textSecondary: '#5B6168',
    background: paper,
    backgroundElement: '#E8EBE6',
    border: '#C9CEC6',
    accent: green,
    onAccent: '#FFFFFF',
    // 50/30/20 and balance signals.
    good: '#1F7A45',
    bad: '#C0392B',
  },
  dark: {
    text: '#F2F4F1',
    textSecondary: '#A3A9AF',
    background: '#121417',
    backgroundElement: '#22262B',
    border: '#3A4047',
    accent: '#4CC38A',
    onAccent: ink,
    good: '#4CC38A',
    bad: '#FF6B5E',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// Loaded in the root layout with @expo-google-fonts/space-grotesk.
export const Fonts = {
  display: 'SpaceGrotesk_700Bold',
} as const;

export const Spacing = {
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;
