export const palette = {
  white: '#FFFFFF',
  black: '#0B0D0F',
  transparent: 'transparent',

  /* Primary – Coral (CTAs, ações principais) */

  primary: '#7FB3F3',
  primaryLight: '#9BC5F6',
  primaryDark: '#5C9AEF',

  primary50: '#F2F7FF',
  primary100: '#E6F0FF',
  primary200: '#C7DCFF',
  primary300: '#A9C8FF',
  primary400: '#8CB9F7',
  primary500: '#7FB3F3', // MAIN
  primary600: '#5C9AEF',
  primary700: '#4A86D8',
  primary800: '#3A6EB8',
  primary900: '#2C5594',

  /* Neutros – base da UI */
  background: '#F8FAFC',

  background50: '#FFFFFF',
  background100: '#F8FAFD',
  background200: '#F4F6FA',
  background300: '#E9EEF5',
  background400: '#DDE4EE',
  background500: '#C9D3E0',
  background600: '#A8B5C6',
  background700: '#8796AA',
  background800: '#667588',
  background900: '#4A586B',

  // BACKGROUND DARK

  backgroundDark: '#0F172A',

  backgroundDark50: '#334155',
  backgroundDark100: '#1E293B',
  backgroundDark200: '#0F172A',
  backgroundDark300: '#0B1220',
  backgroundDark400: '#090F1A',
  backgroundDark500: '#070D16',
  backgroundDark600: '#050A12',
  backgroundDark700: '#03070D',
  backgroundDark800: '#020509',
  backgroundDark900: '#010306',

  // TEXT COLORS
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textLight: '#CBD5E1',

  // SURFACE (Cards / Inputs)
  surface: '#FFFFFF',

  surface50: '#FFFFFF',
  surface100: '#FAFBFC',
  surface200: '#F2F4F7',
  surface300: '#E6EAF0',
  surface400: '#D9DEE7',
  surface500: '#C2C9D4',
  surface600: '#A3ACBA',
  surface700: '#7E8796',
  surface800: '#5E6675',
  surface900: '#424954',

  /* Accent – Teal (impacto, métricas, cards) */

  secondary: '#2EC4B6',
  secondaryLight: '#6EDDD2',
  secondaryDark: '#1FA89A',

  accent50: '#E6FFFA',
  accent100: '#B2F5EA',
  accent200: '#81E6D9',
  accent300: '#4FD1C5',
  accent400: '#2EC4B6', // MAIN
  accent500: '#26B0A4',
  accent600: '#1FA89A',
  accent700: '#198F85',
  accent800: '#13756E',
  accent900: '#0D5C57',

  /* Purple – ações de destaque */
  purple50: '#F5F3FF',
  purple100: '#EDE9FE',
  purple200: '#DDD6FE',
  purple300: '#C4B5FD',
  purple400: '#A78BFA',
  purple500: '#8B5CF6',
  purple600: '#7C3AED',
  purple700: '#6D28D9',
  purple800: '#5B21B6',
  purple900: '#4C1D95',

  border: '#E5E7EB',

  /* Info – Azul apoio */
  Info: ' #3B82F6',
  info50: '#EFF6FF',
  info100: '#DBEAFE',
  info200: '#BFDBFE',
  info300: '#93C5FD',
  info400: '#60A5FA',
  info500: '#4D96FF',
  info600: '#2563EB',
  info700: '#1D4ED8',
  info800: '#1E40AF',
  info900: '#1E3A8A',

  /* Success */
  success: '#4CD964',
  successLight: '#6FE17F',
  successDark: '#34B74D',

  success50: '#ECFFF1',
  success100: '#D8FFE3',
  success200: '#B4F7C4',
  success300: '#8EEFA4',
  success400: '#6FE17F',
  success500: '#4CD964', // MAIN
  success600: '#34B74D',
  success700: '#28963F',
  success800: '#1E7731',
  success900: '#165A25',

  /* Warning */

  warning: '#F4B740',
  warningLight: '#F7C766',
  warningDark: '#D99A1F',

  warning50: '#FFF8E6',
  warning100: '#FEF1CC',
  warning200: '#FDE4A3',
  warning300: '#FAD679',
  warning400: '#F7C766',
  warning500: '#F4B740', // MAIN
  warning600: '#D99A1F',
  warning700: '#B87E18',
  warning800: '#946313',
  warning900: '#70490E',

  /* Error */
  error: '#EF4444',
  errorLight: '#F87171',
  errorDark: '#DC2626',

  error50: '#FEF2F2',
  error100: '#FEE2E2',
  error200: '#FECACA',
  error300: '#FCA5A5',
  error400: '#F87171',
  error500: '#EF4444', // MAIN
  error600: '#DC2626',
  error700: '#B91C1C',
  error800: '#991B1B',
  error900: '#7F1D1D',
};

export const colors = {
  ...palette,
  accent: palette.accent400,

  text: {
    primary: palette.textPrimary,
    secondary: palette.textSecondary,
    muted: palette.textMuted,
    disabled: palette.textLight,
  },

  background: {
    primary: palette.background,
    secondary: palette.background100,
    muted: palette.background50,
    elevated: palette.white,
    inverse: palette.backgroundDark900,
  },

  status: {
    info: palette.Info,
    success: palette.success600,
    warning: palette.warning600,
    error: palette.error600,
  },
  overlay: 'rgba(15, 23, 42, 0.6)',
};
