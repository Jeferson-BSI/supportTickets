export type TicketStatus = 'open' | 'pending' | 'closed' | 'canceled';

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
