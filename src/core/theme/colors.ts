export const palette = {
  white: "#FFFFFF",
  black: "#0B0D0F",
  transparent: "transparent",

  /* Neutros – base da UI */
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2933",
  gray900: "#111827",

  /* Primary – Coral (CTAs, ações principais) */

  primary: "#FF6B6B",
  primaryLight: "#FF8A8A",
  primaryDark: "#E25555",
  primary50: "#FFF1F1",
  primary100: "#FFE4E4",
  primary200: "#FFBDBD",
  primary300: "#FF9B9B",
  primary400: "#FF7A7A",
  primary500: "#FF6B6B", // MAIN
  primary600: "#E25555",
  primary700: "#CC4747",
  primary800: "#B33A3A",
  primary900: "#8F2F2F",

  /* Accent – Teal (impacto, métricas, cards) */

  secondary: "#2EC4B6",
  secondaryLight: "#6EDDD2",
  secondaryDark: "#1FA89A",

  accent50: "#E6FFFA",
  accent100: "#B2F5EA",
  accent200: "#81E6D9",
  accent300: "#4FD1C5",
  accent400: "#2EC4B6", // MAIN
  accent500: "#26B0A4",
  accent600: "#1FA89A",
  accent700: "#198F85",
  accent800: "#13756E",
  accent900: "#0D5C57",

  /* Purple – ações de destaque */
  purple50: "#F5F3FF",
  purple100: "#EDE9FE",
  purple200: "#DDD6FE",
  purple300: "#C4B5FD",
  purple400: "#A78BFA",
  purple500: "#8B5CF6",
  purple600: "#7C3AED",
  purple700: "#6D28D9",
  purple800: "#5B21B6",
  purple900: "#4C1D95",

  border: "#E5E7EB",

  textPrimary: "#1F2933",
  textSecondary: "#6B7280",

  Success: "#22C55E",
  Warning: "#F59E0B",
  Error: "#EF4444",
  Info: " #3B82F6",

  /* Info – Azul apoio */
  info50: "#EFF6FF",
  info100: "#DBEAFE",
  info200: "#BFDBFE",
  info300: "#93C5FD",
  info400: "#60A5FA",
  info500: "#4D96FF",
  info600: "#2563EB",
  info700: "#1D4ED8",
  info800: "#1E40AF",
  info900: "#1E3A8A",

  /* Success */
  success50: "#ECFDF3",
  success100: "#D1FAE5",
  success200: "#A7F3D0",
  success300: "#6EE7B7",
  success400: "#34D399",
  success500: "#22C55E",
  success600: "#16A34A",
  success700: "#15803D",
  success800: "#166534",
  success900: "#14532D",

  /* Warning */
  warning50: "#FFFBEB",
  warning100: "#FEF3C7",
  warning200: "#FDE68A",
  warning300: "#FCD34D",
  warning400: "#FBBF24",
  warning500: "#F59E0B",
  warning600: "#D97706",
  warning700: "#B45309",
  warning800: "#92400E",
  warning900: "#78350F",

  /* Error */
  error50: "#FEF2F2",
  error100: "#FEE2E2",
  error200: "#FECACA",
  error300: "#FCA5A5",
  error400: "#F87171",
  error500: "#EF4444",
  error600: "#DC2626",
  error700: "#B91C1C",
  error800: "#991B1B",
  error900: "#7F1D1D"
} as const;

export const colors = {
  ...palette,
  accent: palette.accent400,

  text: {
    primary: palette.textPrimary,
    secondary: palette.gray600,
    muted: palette.gray500,
    inverse: palette.white,
    disabled: palette.gray400
  },

  background: {
    primary: palette.white,
    secondary: palette.gray50,
    muted: palette.gray100,
    elevated: palette.white,
    inverse: palette.gray900
  },

  borders: {
    default: palette.border,
    subtle: palette.gray100,
    strong: palette.gray300,
    focus: palette.primary
  },
  
  status: {
    info: palette.Info,
    success: palette.success600,
    warning: palette.warning600,
    error: palette.error600
  },
  overlay: "rgba(15, 23, 42, 0.6)"
} as const;
