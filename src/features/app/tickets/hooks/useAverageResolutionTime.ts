import { useQuery } from '@tanstack/react-query';
import { ticketService } from '../services';
import { TICKETS_QUERY_KEY } from './useTickets';

const AVG_RESOLUTION_QUERY_KEY = [...TICKETS_QUERY_KEY, 'avg-resolution'] as const;
const FIVE_MINUTES_MS = 1000 * 60 * 5;

export function useAverageResolutionTime() {
  const { data, isLoading } = useQuery<number>({
    queryKey: AVG_RESOLUTION_QUERY_KEY,
    queryFn: () => ticketService.getAverageResolutionMinutes(),
    staleTime: FIVE_MINUTES_MS,
  });

  return {
    averageMinutes: data ?? 0,
    isLoading,
  };
}
