import * as Native from 'react-native';
import { theme } from '@theme/theme';

interface InputLabelProps {
  label?: string;
  fieldRequired?: boolean;
  errors?: boolean;
}

const InputLabel = ({ label, fieldRequired, errors = false }: InputLabelProps) => {
  if (!label) return null;

  return (
    <Native.View style={styles.row}>
      {fieldRequired && <Native.Text style={styles.asterisk}>*</Native.Text>}
      <Native.Text style={[styles.title, errors && styles.titleError]}>
        {fieldRequired ? `${label}:` : label}
      </Native.Text>
    </Native.View>
  );
};

const styles = Native.StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  asterisk: {
    fontSize: 16,
    fontFamily: theme.typography.fonts.bold,
    color: theme.colors.error,
    marginRight: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: theme.typography.fonts.medium,
    marginBottom: 4,
    color: theme.colors.textPrimary,
  },
  titleError: {
    color: theme.colors.error,
  },
});

export default InputLabel;
