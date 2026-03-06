import { useQuery } from '@tanstack/react-query';
import { ticketService } from '../services';
import type { Ticket, TicketStatus } from '../models';

export const TICKETS_QUERY_KEY = ['tickets'];
const FIVE_MINUTES_MS = 1000 * 60 * 5;

function buildQueryKey(status?: TicketStatus): readonly unknown[] {
  if (status) return [...TICKETS_QUERY_KEY, status];
  return TICKETS_QUERY_KEY;
}

export function useTickets(status?: TicketStatus) {
  const filters = status ? { status } : undefined;

  const { data, isLoading, isError, error, refetch } = useQuery<Ticket[]>({
    queryKey: buildQueryKey(status),
    queryFn: () => ticketService.getTickets(filters),
    staleTime: FIVE_MINUTES_MS,
  });

  return {
    tickets: data ?? [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
