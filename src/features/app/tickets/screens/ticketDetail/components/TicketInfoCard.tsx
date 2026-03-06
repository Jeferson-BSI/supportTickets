import React from 'react';
import * as Native from 'react-native';
import { Calendar, AlertTriangle, Hash } from 'lucide-react-native';
import { theme } from '@core/theme/theme';
import Text from '@core/components/base/Text/view';
import Spacer from '@core/components/base/Spacer/view';
import StatusBadge from '@core/components/layout/TicketCard/StatusBadge';
import { formatFullDateTime } from '@core/utils/formatDate';
import type { Ticket, TicketPriority } from '@features/app/tickets/models';

const PRIORITY_CONFIG: Record<TicketPriority, { label: string; color: string }> = {
  low: { label: 'Baixa', color: theme.colors.success },
  medium: { label: 'Média', color: theme.colors.warning },
  high: { label: 'Alta', color: theme.colors.error },
};

interface TicketInfoCardProps {
  ticket: Ticket;
}

const TicketInfoCard = ({ ticket }: TicketInfoCardProps) => {
  const priorityConfig = PRIORITY_CONFIG[ticket.priority];

  return (
    <Native.View style={styles.card}>
      <Native.View style={styles.cardHeader}>
        <Native.View style={styles.idRow}>
          <Hash size={14} color={theme.colors.textMuted} />
          <Text size={13} font="medium" color="textMuted">
            {ticket.id}
          </Text>
        </Native.View>
        <StatusBadge status={ticket.status} />
      </Native.View>

      <Spacer height={16} />

      <Text size={20} font="bold" color="textPrimary">
        {ticket.title}
      </Text>

      <Spacer height={12} />

      <Text size={14} font="regular" color="textSecondary" style={styles.description}>
        {ticket.description}
      </Text>

      <Spacer height={20} />

      <Native.View style={styles.divider} />

      <Spacer height={16} />

      <Native.View style={styles.metaGrid}>
        <Native.View style={styles.metaItem}>
          <Native.View style={styles.metaIconRow}>
            <Calendar size={14} color={theme.colors.textMuted} />
            <Text size={11} font="medium" color="textMuted" style={styles.metaLabel}>
              CRIADO EM
            </Text>
          </Native.View>
          <Text size={13} font="regular" color="textPrimary">
            {formatFullDateTime(new Date(ticket.createdAt))}
          </Text>
        </Native.View>

        <Native.View style={styles.metaItem}>
          <Native.View style={styles.metaIconRow}>
            <AlertTriangle size={14} color={priorityConfig.color} />
            <Text size={11} font="medium" color="textMuted" style={styles.metaLabel}>
              PRIORIDADE
            </Text>
          </Native.View>
          <Native.View
            style={[styles.priorityBadge, { backgroundColor: `${priorityConfig.color}15` }]}
          >
            <Native.View
              style={[styles.priorityDot, { backgroundColor: priorityConfig.color }]}
            />
            <Text size={13} font="semibold" style={{ color: priorityConfig.color }}>
              {priorityConfig.label}
            </Text>
          </Native.View>
        </Native.View>
      </Native.View>
    </Native.View>
  );
};

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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  description: {
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  metaGrid: {
    gap: theme.spacing.lg,
  },
  metaItem: {
    gap: 4,
  },
  metaIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
    gap: 6,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default TicketInfoCard;
