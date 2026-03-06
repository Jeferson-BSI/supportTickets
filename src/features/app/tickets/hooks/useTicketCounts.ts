import { useQuery } from '@tanstack/react-query';
import { ticketService } from '../services';
import type { TicketCountsByStatus } from '../models';
import { TICKETS_QUERY_KEY } from './useTickets';

const TICKET_COUNTS_QUERY_KEY = [...TICKETS_QUERY_KEY, 'counts'];
const FIVE_MINUTES_MS = 1000 * 60 * 5;

const EMPTY_COUNTS: TicketCountsByStatus = {
  all: 0,
  open: 0,
  pending: 0,
  closed: 0,
  canceled: 0,
};

export function useTicketCounts() {
  const { data, isLoading } = useQuery<TicketCountsByStatus>({
    queryKey: TICKET_COUNTS_QUERY_KEY,
    queryFn: () => ticketService.getCountsByStatus(),
    staleTime: FIVE_MINUTES_MS,
  });

  return {
    counts: data ?? EMPTY_COUNTS,
    isLoading,
  };
}
