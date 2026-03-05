import React from 'react';
import * as Native from 'react-native';
import Text from '@core/components/base/Text/view';
import { theme } from '@theme/theme';
import type { TicketStatus } from '@features/app/tickets/models';
import StatusBadge from '../StatusBadge';

interface TicketCardHeaderProps {
  title: string;
  status: TicketStatus;
}

const TicketCardHeader = React.memo(({ title, status }: TicketCardHeaderProps) => (
  <Native.View style={styles.container}>
    <Text font="semibold" size={16} color="textPrimary" numberOfLines={1} style={styles.title}>
      {title}
    </Text>
    <StatusBadge status={status} />
  </Native.View>
));

TicketCardHeader.displayName = 'TicketCardHeader';

const styles = Native.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  title: {
    flex: 1,
  },
});

export default TicketCardHeader;
