import React from 'react';
import * as Native from 'react-native';
import { Lock } from 'lucide-react-native';
import { theme } from '@core/theme/theme';
import Text from '@core/components/base/Text/view';

const TicketClosedBanner = () => (
  <Native.View style={styles.banner}>
    <Lock size={18} color={theme.colors.textMuted} />
    <Text size={14} font="medium" color="textMuted">
      Este ticket já foi encerrado.
    </Text>
  </Native.View>
);

const styles = Native.StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: theme.colors.surface200,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});

export default TicketClosedBanner;
