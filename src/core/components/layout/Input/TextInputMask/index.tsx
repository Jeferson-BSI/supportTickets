import * as Native from 'react-native';
import { Control, FieldError, useController, UseFormTrigger } from 'react-hook-form';
import { theme } from '@theme/theme';

interface TextInputMaskFieldProps extends Native.TextInputProps {
  control?: Control<any>;
  trigger?: UseFormTrigger<any>;
  name: string;
  errors?: FieldError;
  isActivePassword?: boolean;
  mask?: (text: string) => string;
}

const TextInputMaskField = ({
  control,
  name,
  errors,
  isActivePassword,
  trigger,
  mask,
  style,
  ...rest
}: TextInputMaskFieldProps) => {
  const { field } = useController({ control, name });

  const handleChangeText = (text: string) => {
    const value = mask ? mask(text) : text;
    field.onChange(value);
    if (trigger) {
      setTimeout(() => trigger(name), 0);
    }
  };

  return (
    <Native.TextInput
      placeholderTextColor={theme.colors.textMuted}
      onChangeText={handleChangeText}
      value={field.value}
      secureTextEntry={isActivePassword}
      style={[styles.input, style]}
      {...rest}
    />
  );
};

const styles = Native.StyleSheet.create({
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: theme.typography.fonts.semibold,
    paddingHorizontal: 12,
    paddingVertical: 0,
  },
});

export default TextInputMaskField;
