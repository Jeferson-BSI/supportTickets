import React from 'react';
import * as Native from 'react-native';
import { Timer } from 'lucide-react-native';
import Text from '@core/components/base/Text/view';
import { theme } from '@theme/theme';
import type { TicketPerformanceCardProps } from '../types';
import { computeResolutionMinutes } from '../utils/computeResolutionTime';
import { cardStyles } from './TicketPerformanceCard.styles';

const ICON_SIZE = 24;

const TicketPerformanceCard = React.memo(({ ticket }: TicketPerformanceCardProps) => {
  const minutes = computeResolutionMinutes(ticket);
  const timeLabel = minutes === 1 ? 'minuto' : 'minutos';

  return (
    <Native.View style={cardStyles.shadowWrapper}>
      <Native.View style={cardStyles.card}>
        <Native.View style={cardStyles.iconWrapper}>
          <Timer size={ICON_SIZE} color={theme.colors.success700} />
        </Native.View>
        <Text size={16} font="bold" color="textPrimary" numberOfLines={2} style={cardStyles.title}>
          {ticket.title}
        </Text>
        <Text size={14} font="medium" color="textSecondary">
          Resolvido em {minutes} {timeLabel}
        </Text>
      </Native.View>
    </Native.View>
  );
});

TicketPerformanceCard.displayName = 'TicketPerformanceCard';

export default TicketPerformanceCard;
