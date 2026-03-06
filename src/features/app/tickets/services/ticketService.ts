import type {
  Ticket,
  CreateTicketInput,
  TicketClosureStatus,
  TicketFilters,
  TicketCountsByStatus,
  ITicketRepository,
} from '../models';

function parseBrDateToTimestamp(dateStr: string): number {
  const [day, month, year] = dateStr.split('/');
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function createTicketService(repository: ITicketRepository) {
  return {
    async getTickets(filters?: TicketFilters): Promise<Ticket[]> {
      return repository.getAll(filters);
    },

    async getCountsByStatus(): Promise<TicketCountsByStatus> {
      return repository.getCountsByStatus();
    },

    async getAverageResolutionMinutes(): Promise<number> {
      return repository.getAverageResolutionMinutes();
    },

    async getTop5Fastest(): Promise<Ticket[]> {
      return repository.getTop5Fastest();
    },

    async createTicket(input: CreateTicketInput): Promise<Ticket> {
      const ticket: Ticket = {
        id: generateId(),
        title: input.title,
        description: input.description,
        status: 'open',
        priority: input.priority,
        createdAt: new Date().toISOString(),
        deadline: parseBrDateToTimestamp(input.deadline),
        category: 'Geral',
      };

      await repository.create(ticket);

      return ticket;
    },

    async getTicketById(id: string): Promise<Ticket | null> {
      return repository.getById(id);
    },

    async closeTicket(
      id: string,
      status: TicketClosureStatus,
      closureDescription: string,
    ): Promise<void> {
      return repository.closeTicket(id, status, closureDescription);
    },
  };
}
