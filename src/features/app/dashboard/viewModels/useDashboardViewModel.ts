import { useTop5FastestTickets } from '@features/app/tickets/hooks/useTop5FastestTickets';
import { useTicketCounts } from '@features/app/tickets/hooks/useTicketCounts';
import { useAverageResolutionTime } from '@features/app/tickets/hooks/useAverageResolutionTime';
import type { Ticket, TicketCountsByStatus } from '@features/app/tickets/models';

interface DashboardViewModel {
  counts: TicketCountsByStatus;
  averageMinutes: number;
  fastestTickets: Ticket[];
  isLoading: boolean;
}

export function useDashboardViewModel(): DashboardViewModel {
  const { counts, isLoading: countsLoading } = useTicketCounts();
  const { averageMinutes, isLoading: avgLoading } = useAverageResolutionTime();
  const { fastestTickets, isLoading: fastestLoading } = useTop5FastestTickets();

  return {
    counts,
    averageMinutes,
    fastestTickets,
    isLoading: countsLoading || avgLoading || fastestLoading,
  };
}
