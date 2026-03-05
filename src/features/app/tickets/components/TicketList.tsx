import React, { useCallback } from 'react';
import * as Native from 'react-native';
import Text from '@core/components/base/Text/view';
import { theme } from '@theme/theme';
import TicketCard from '@core/components/layout/TicketCard';
import type { Ticket, TicketCardProps } from '../models';
import TicketEmptyState from './TicketEmptyState';
import TicketListSkeleton from './TicketListSkeleton';

interface TicketListProps {
  tickets: Ticket[];
  loading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onTicketPress?: (ticket: Ticket) => void;
}

const TicketItem = React.memo(({ ticket, index, onPress }: TicketCardProps) => {
  const handlePress = useCallback(() => {
    onPress?.(ticket);
  }, [onPress, ticket]);

  return (
    <TicketCard.Root index={index} onPress={handlePress}>
      <TicketCard.Header title={ticket.title} status={ticket.status} />
      <TicketCard.Body description={ticket.description} />
      <TicketCard.Footer category={ticket.category} createdAt={ticket.createdAt} />
    </TicketCard.Root>
  );
});

TicketItem.displayName = 'TicketItem';

const keyExtractor = (item: Ticket) => item.id;

const ListHeader = React.memo(() => (
  <Native.View style={styles.listHeader}>
    <Text font="bold" size={22} color="textPrimary" style={styles.listTitle}>
      Meus Tickets
    </Text>
    <Text font="regular" size={14} color="textMuted">
      Acompanhe o status dos seus chamados
    </Text>
  </Native.View>
));

ListHeader.displayName = 'ListHeader';

const TicketList = ({ tickets, loading, refreshing = false, onRefresh, onTicketPress }: TicketListProps) => {
  const renderItem = useCallback(
    ({ item, index }: { item: Ticket; index: number }) => (
      <TicketItem ticket={item} index={index} onPress={onTicketPress} />
    ),
    [onTicketPress],
  );

  if (loading && tickets.length === 0) {
    return (
      <>
        <ListHeader />
        <TicketListSkeleton />
      </>
    );
  }

  return (
    <Native.FlatList<Ticket>
      data={tickets}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={TicketEmptyState}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = Native.StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: theme.spacing['5xl'],
  },
  listHeader: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  listTitle: {
    marginBottom: theme.spacing.xs,
  },
});

export default TicketList;
