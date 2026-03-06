import React from 'react';
import * as Native from 'react-native';
import { Lock } from 'lucide-react-native';
import { theme } from '@core/theme/theme';
import Text from '@core/components/base/Text/view';
import Spacer from '@core/components/base/Spacer/view';

interface TicketClosedBannerProps {
  closureDescription?: string;
}

const TicketClosedBanner = ({ closureDescription }: TicketClosedBannerProps) => (
  <Native.View style={styles.card}>
    <Native.View style={styles.banner}>
      <Lock size={18} color={theme.colors.textMuted} />
      <Text size={14} font="medium" color="textMuted">
        Este ticket já foi encerrado.
      </Text>
    </Native.View>

    {closureDescription ? (
      <>
        <Spacer height={16} />
        <Native.View style={styles.divider} />
        <Spacer height={16} />
        <Text size={11} font="medium" color="textMuted" style={styles.label}>
          DESCRIÇÃO DO ENCERRAMENTO
        </Text>
        <Spacer height={6} />
        <Text size={14} font="regular" color="textPrimary" style={styles.description}>
          {closureDescription}
        </Text>
      </>
    ) : null}
  </Native.View>
);

const styles = Native.StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  label: {
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  description: {
    lineHeight: 22,
  },
});

export default TicketClosedBanner;
