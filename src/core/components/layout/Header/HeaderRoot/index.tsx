import * as Native from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@theme/theme';

interface HeaderRootProps extends Native.ViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
  borderBottom?: boolean;
}

const HeaderRoot = ({
  children,
  backgroundColor,
  borderBottom = true,
  style,
  ...rest
}: HeaderRootProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Native.View
      style={[
        styles.container,
        {
          paddingTop: insets.top + theme.spacing.lg,
          backgroundColor: backgroundColor ?? theme.colors.surface,
        },
        borderBottom && styles.borderBottom,
        style,
      ]}
      {...rest}
    >
      <Native.View style={styles.content}>{children}</Native.View>
    </Native.View>
  );
};

const styles = Native.StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 4,
    paddingHorizontal: theme.spacing.lg,
  },
  content: {
    minHeight: 30,
    justifyContent: 'center',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
});

export default HeaderRoot;
