import * as Native from 'react-native';

interface InputIconProps {
  icon: React.ReactElement;
  iconError?: React.ReactElement;
  errors?: boolean;
}

const InputIcon = ({ icon, iconError, errors }: InputIconProps) => (
  <Native.View style={styles.icon}>
    {errors ? iconError : icon}
  </Native.View>
);

const styles = Native.StyleSheet.create({
  icon: {
    paddingLeft: 12,
  },
});

export default InputIcon;
