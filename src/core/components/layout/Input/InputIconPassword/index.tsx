import { Eye, EyeClosed } from '@core/assets';
import * as Native from 'react-native';

interface InputIconPasswordProps {
  secureTextActive: boolean;
  onPressButton: () => void;
}
const InputIconPassword = ({ secureTextActive, onPressButton }: InputIconPasswordProps) => (
  <Native.TouchableOpacity style={styles.iconButton} onPress={onPressButton}>
    {secureTextActive ? <EyeClosed width={32} /> : <Eye width={32} />}
  </Native.TouchableOpacity>
);

const styles = Native.StyleSheet.create({
  iconButton: {
    marginRight: 12,
  },
});

export default InputIconPassword;
