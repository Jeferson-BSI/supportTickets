import { useQuery } from '@tanstack/react-query';
import { ticketService } from '../services';
import type { Ticket } from '../models';
import { TICKETS_QUERY_KEY } from './useTickets';

const TOP5_FASTEST_QUERY_KEY = [...TICKETS_QUERY_KEY, 'top5-fastest'] as const;
const FIVE_MINUTES_MS = 1000 * 60 * 5;

export function useTop5FastestTickets() {
  const { data, isLoading } = useQuery<Ticket[]>({
    queryKey: TOP5_FASTEST_QUERY_KEY,
    queryFn: () => ticketService.getTop5Fastest(),
    staleTime: FIVE_MINUTES_MS,
  });

  return {
    fastestTickets: data ?? [],
    isLoading,
  };
}
