import * as Native from 'react-native';
import { IColor, theme } from '@theme/theme';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends Native.PressableProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  bg?: IColor;
  borderColor?: IColor;
  borderWidth?: number;
  width?: Native.DimensionValue;
  height?: Native.DimensionValue;
  loading?: boolean;
  loadingColor?: IColor;
  spinnerSize?: Native.ActivityIndicatorProps['size'];
}

const Button = ({
  children,
  variant = 'primary',
  bg = 'primary',
  borderColor,
  borderWidth,
  width,
  height,
  loading = false,
  loadingColor,
  spinnerSize = 'small',
  style,
  ...rest
}: ButtonProps) => {
  const resolvedLoadingColor = loadingColor ?? (variant === 'secondary' ? 'primary' : 'white');

  const resolveStyle = (
    state: Native.PressableStateCallbackType,
  ): Native.StyleProp<Native.ViewStyle> => {
    const customStyle = typeof style === 'function' ? style(state) : style;
    return [
      styles.base,
      styles[variant],
      bg ? { backgroundColor: theme.colors[bg] as string } : null,
      borderColor ? { borderColor: theme.colors[borderColor] as string } : null,
      typeof borderWidth === 'number' ? { borderWidth } : null,
      width ? { width } : null,
      height ? { height } : null,
      state.pressed && { opacity: 0.7 },
      customStyle,
    ];
  };

  return (
    <Native.Pressable {...rest} style={resolveStyle} >
      {loading ? (
        <Native.ActivityIndicator
          size={spinnerSize}
          color={theme.colors[resolvedLoadingColor] as string}
        />
      ) : (
        children
      )}
    </Native.Pressable>
  );
};

const styles = Native.StyleSheet.create({
  base: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing['2xl'],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.background.primary,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
});

export default Button;
