import * as Native from 'react-native';
import { theme } from '@theme/theme';

interface HeaderActionProps {
  icon: React.ReactElement;
  onPress: () => void;
  size?: number;
  disabled?: boolean;
  hitSlop?: number;
}

const HeaderAction = ({
  icon,
  onPress,
  size = 40,
  disabled = false,
  hitSlop = 8,
}: HeaderActionProps) => (
  <Native.TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
    activeOpacity={0.7}
    style={[
      styles.button,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        opacity: disabled ? 0.4 : 1,
      },
    ]}
  >
    {icon}
  </Native.TouchableOpacity>
);

const styles = Native.StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface100,
  },
});

export default HeaderAction;
