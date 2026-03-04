import { colors, palette } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  typography,
} as const;

export type Theme = typeof theme;

export type IFont = keyof typeof typography.fonts;

export type IColor = keyof typeof palette;

export { colors, spacing, typography };
