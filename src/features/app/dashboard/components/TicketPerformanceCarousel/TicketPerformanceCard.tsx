import { StyleSheet } from 'react-native';
import { Timer } from 'lucide-react-native';
import Container from '@core/components/base/Container/view';
import Text from '@core/components/base/Text/view';
import { theme } from '@core/theme/theme';
import type { Ticket } from '@features/app/tickets/models';

type Props = {
  ticket: Ticket;
};

function computeResolutionMinutes(ticket: Ticket): number {
  if (!ticket.closedAt) return 0;
  return Math.round(
    (new Date(ticket.closedAt).getTime() - new Date(ticket.createdAt).getTime()) / 60_000,
  );
}

export default function TicketPerformanceCard({ ticket }: Props) {
  const minutes = computeResolutionMinutes(ticket);

  return (
    <Container
      bg="white"
      borderRadius={20}
      elevation={4}
      style={styles.card}
    >
      <Container
        width={40}
        height={40}
        borderRadius={12}
        center
        style={styles.iconWrapper}
      >
        <Timer size={20} color={theme.colors.success700} />
      </Container>

      <Text size={15} font="bold" color="textPrimary" numberOfLines={2} style={styles.title}>
        {ticket.title}
      </Text>

      <Text size={13} font="medium" color="textSecondary">
        Resolvido em {minutes} {minutes === 1 ? 'minuto' : 'minutos'}
      </Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 8,
  },
  iconWrapper: {
    backgroundColor: theme.colors.success100,
    marginBottom: 4,
  },
  title: {
    lineHeight: 20,
  },
});
