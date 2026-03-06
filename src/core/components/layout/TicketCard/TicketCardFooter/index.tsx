import React from 'react';
import * as Native from 'react-native';
import { Tag, Clock } from 'lucide-react-native';
import Text from '@core/components/base/Text/view';
import { theme } from '@theme/theme';
import { formatRelativeDate } from '@core/utils/formatRelativeDate';

interface TicketCardFooterProps {
  category: string;
  createdAt: string;
}

const ICON_SIZE = 14;

const TicketCardFooter = React.memo(({ category, createdAt }: TicketCardFooterProps) => (
  <Native.View style={styles.container}>
    <Native.View style={styles.item}>
      <Tag size={ICON_SIZE} color={theme.colors.text.muted} />
      <Text font="regular" size={12} color="textMuted">{category}</Text>
    </Native.View>
    <Native.View style={styles.item}>
      <Clock size={ICON_SIZE} color={theme.colors.text.muted} />
      <Text font="regular" size={12} color="textMuted">{formatRelativeDate(createdAt)}</Text>
    </Native.View>
  </Native.View>
));

TicketCardFooter.displayName = 'TicketCardFooter';

const styles = Native.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
});

export default TicketCardFooter;
