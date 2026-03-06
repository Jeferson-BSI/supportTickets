import { useCallback, useMemo, useState } from 'react';
import type { Ticket, TicketFilterOption } from '../models';
import { useTickets } from '../hooks/useTickets';

function buildFilterCounts(tickets: Ticket[]): Record<TicketFilterOption, number> {
  const counts: Record<TicketFilterOption, number> = {
    all: tickets.length,
    open: 0,
    pending: 0,
    closed: 0,
    canceled: 0,
  };

  for (const ticket of tickets) {
    counts[ticket.status as TicketFilterOption]++;
  }

  return counts;
}

function filterTickets(tickets: Ticket[], filter: TicketFilterOption): Ticket[] {
  if (filter === 'all') return tickets;
  return tickets.filter((ticket) => ticket.status === filter);
}

const useTicketsViewModel = () => {
  const { tickets: ticketsData, isLoading, isError, refetch } = useTickets();
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<TicketFilterOption>('all');

  const filterCounts = useMemo(() => buildFilterCounts(ticketsData), [ticketsData]);

  const tickets = useMemo(
    () => filterTickets(ticketsData, activeFilter),
    [ticketsData, activeFilter],
  );

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const handleTicketPress = useCallback((ticket: Ticket) => {
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
