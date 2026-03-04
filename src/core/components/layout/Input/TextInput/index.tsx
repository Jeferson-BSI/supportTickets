import * as Native from 'react-native';
import { Control, FieldError, useController } from 'react-hook-form';
import { theme } from '@theme/theme';

interface TextInputFieldProps extends Native.TextInputProps {
  control?: Control<any>;
  name: string;
  errors?: FieldError;
  isActivePassword?: boolean;
}

const TextInputField = ({
  control,
  name,
  errors,
  isActivePassword,
  style,
  ...rest
}: TextInputFieldProps) => {
  const { field } = useController({ control, name });

  return (
    <Native.TextInput
      placeholderTextColor={theme.colors.textMuted}
      onChangeText={field.onChange}
      value={field.value}
      secureTextEntry={isActivePassword}
      style={[styles.input, style]}
      {...rest}
    />
  );
};

const styles = Native.StyleSheet.create({
  input: {
    height: 48,
    flex: 1,
    fontSize: 16,
    fontFamily: theme.typography.fonts.semibold,
    paddingHorizontal: 12,
    paddingVertical: 0,
  },
});

export default TextInputField;
