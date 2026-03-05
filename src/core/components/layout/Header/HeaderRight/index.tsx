import * as Native from 'react-native';
import { theme } from '@theme/theme';

interface HeaderRightProps extends Native.ViewProps {
  children: React.ReactNode;
}

const HeaderRight = ({ children, style, ...rest }: HeaderRightProps) => (
  <Native.View style={[styles.container, style]} {...rest}>
    {children}
  </Native.View>
);

const styles = Native.StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    zIndex: 1,
  },
});

export default HeaderRight;
