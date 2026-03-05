import * as Native from 'react-native';
import { theme } from '@theme/theme';

interface HeaderTitleProps extends Native.ViewProps {
  title: string;
  subtitle?: string;
  titleSize?: number;
  subtitleSize?: number;
  icon?: React.ReactElement;
}

const HeaderTitle = ({
  title,
  subtitle,
  titleSize = 20,
  subtitleSize = 13,
  style,
  icon,
  ...rest
}: HeaderTitleProps) => (
  <Native.View style={[styles.container, style]} pointerEvents="none" {...rest}>
    <Native.View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
      {icon && icon}
      <Native.Text style={[styles.title, { fontSize: titleSize }]} numberOfLines={1}>
        {title}
      </Native.Text>
    </Native.View>
    {subtitle && (
      <Native.Text style={[styles.subtitle, { fontSize: subtitleSize }]} numberOfLines={1}>
        {subtitle}
      </Native.Text>
    )}
  </Native.View>
);

const styles = Native.StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.typography.fonts.bold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xxs,
    textAlign: 'center',
  },
});

export default HeaderTitle;
