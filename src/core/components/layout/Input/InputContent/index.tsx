import * as Native from 'react-native';
import { FieldError } from 'react-hook-form';
import { theme } from '@theme/theme';
import Text from '@core/components/base/Text/view';

interface InputContentProps extends Native.ViewProps {
  children: React.ReactNode;
  errors: FieldError;
}

const InputContent = ({ children, errors, style, ...rest }: InputContentProps) => (
  <Native.View style={styles.container}>
    <Native.View style={[styles.content, errors && styles.contentError, style]} {...rest}>
      {children}
    </Native.View>
    {errors && (
      <Text size={12} color="error" font="medium" style={{ marginVertical: 4 }}>
        {String(errors.message)}
      </Text>
    )}
  </Native.View>
);

const styles = Native.StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.surface100,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
  },
  contentError: {
    borderBottomWidth: 1,
    borderColor: theme.colors.error,
  },
});

export default InputContent;
