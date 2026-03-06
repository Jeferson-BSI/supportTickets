export type TicketStatus = 'open' | 'pending' | 'closed' | 'canceled' | 'improcedente';

export type TicketClosureStatus = 'closed' | 'improcedente' | 'canceled';

export type TicketPriority = 'low' | 'medium' | 'high';

export type TicketFilterOption = TicketStatus | 'all';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  deadline: number;
  closedAt?: string;
  closureDescription?: string;
  category: string;
}

export interface CreateTicketInput {
  title: string;
  description: string;
  deadline: string;
  priority: TicketPriority;
}

export interface TicketCardProps {
  ticket: Ticket;
  index: number;
  onPress?: (ticket: Ticket) => void;
}

export interface TicketFilters {
  status?: TicketStatus;
}

export type TicketCountsByStatus = Record<TicketFilterOption, number>;

export interface ITicketRepository {
  getAll(filters?: TicketFilters): Promise<Ticket[]>;
  getById(id: string): Promise<Ticket | null>;
  getCountsByStatus(): Promise<TicketCountsByStatus>;
  getAverageResolutionMinutes(): Promise<number>;
  getTop5Fastest(): Promise<Ticket[]>;
  create(ticket: Ticket): Promise<void>;
  updateStatus(id: string, status: TicketStatus): Promise<void>;
  closeTicket(id: string, status: TicketClosureStatus, closureDescription: string): Promise<void>;
}
