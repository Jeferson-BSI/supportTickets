import { colors, palette } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const theme = {
  colors,
  spacing,
  typography,
  radius,
};

export type Theme = typeof theme;

export type IFont = keyof typeof typography.fonts;

export type IFontSize = number;

export type IColor = keyof typeof palette;

export function useTheme() {
  return theme;
}

export { colors, spacing, typography };
