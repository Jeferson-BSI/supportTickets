import * as Native from 'react-native';
import { theme } from '@theme/theme';

interface HeaderLeftProps extends Native.ViewProps {
  children: React.ReactNode;
}

const HeaderLeft = ({ children, style, ...rest }: HeaderLeftProps) => (
  <Native.View style={[styles.container, style]} {...rest}>
    {children}
  </Native.View>
);

const styles = Native.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default HeaderLeft;
