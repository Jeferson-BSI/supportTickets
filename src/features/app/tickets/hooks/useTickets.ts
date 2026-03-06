import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../services/ticketService';
import { Ticket } from '../models';

export const TICKETS_QUERY_KEY = ['tickets'];
const FIVE_MINUTES_MS = 1000 * 60 * 5;

export function useTickets() {
  const { data, isLoading, isError, error, refetch } = useQuery<Ticket[]>({
    queryKey: TICKETS_QUERY_KEY,
    queryFn: getTickets,
    staleTime: FIVE_MINUTES_MS,
  });

  return {
    tickets: data ?? [],
    isLoading,
    isError,
    error: error,

    refetch,
  };
}
