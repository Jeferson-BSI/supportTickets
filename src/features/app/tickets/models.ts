export type TicketStatus = 'open' | 'pending' | 'closed' | 'canceled';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  category: string;
}

export interface TicketCardProps {
  ticket: Ticket;
  index: number;
  onPress?: (ticket: Ticket) => void;
}
