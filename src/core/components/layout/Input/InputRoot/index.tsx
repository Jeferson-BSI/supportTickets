import * as Native from 'react-native';

interface InputRootProps extends Native.ViewProps {
  children: React.ReactNode;
  width?: Native.DimensionValue;
  flex?: Native.ViewStyle['flex'];
}

const InputRoot = ({ children, width = '100%', flex, style, ...rest }: InputRootProps) => (
  <Native.View style={[{ width }, flex !== undefined && { flex }, style]} {...rest}>
    {children}
  </Native.View>
);

export default InputRoot;
