import { useCallback, useState } from 'react';
import type { Ticket, TicketFilterOption, TicketStatus } from '../models';
import { useTickets } from '../hooks/useTickets';
import { useTicketCounts } from '../hooks/useTicketCounts';

function toStatusFilter(filter: TicketFilterOption): TicketStatus | undefined {
  return filter === 'all' ? undefined : filter;
}

const useTicketsViewModel = () => {
  const [activeFilter, setActiveFilter] = useState<TicketFilterOption>('all');
  const [refreshing, setRefreshing] = useState(false);

  const { tickets, isLoading, isError, refetch } = useTickets(
    toStatusFilter(activeFilter),
  );
  const { counts: filterCounts } = useTicketCounts();

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const handleTicketPress = useCallback((_ticket: Ticket) => {
    // TODO: navegar para detalhes do ticket
  }, []);

  const handleFilterChange = useCallback((filter: TicketFilterOption) => {
    setActiveFilter(filter);
  }, []);

  return {
    tickets,
    loading: isLoading,
    isError,
    refreshing,
    activeFilter,
    filterCounts,
    handleRefresh,
    handleTicketPress,
    handleFilterChange,
  };
};

export default useTicketsViewModel;
