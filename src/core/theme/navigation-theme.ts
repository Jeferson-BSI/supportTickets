import { DefaultTheme, type Theme } from "@react-navigation/native";
import { theme } from "./theme";

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background.primary,
    card: theme.colors.background.elevated,
    text: theme.colors.text.primary,
    border: theme.colors.borders.default,
    primary: theme.colors.primary,
    notification: theme.colors.status.info
  }
};
