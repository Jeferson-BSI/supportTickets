import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTicket } from '@features/app/tickets/services/ticketService';
import { TICKETS_QUERY_KEY } from '@features/app/tickets/hooks/useTickets';
import type { CreateTicketInput, Ticket } from '@features/app/tickets/models';

export function useCreateTicket() {
  const queryClient = useQueryClient();

  const mutation = useMutation<Ticket, Error, CreateTicketInput>({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TICKETS_QUERY_KEY });
    },
  });

  return {
    createTicket: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
