import type { Ticket } from '@features/app/tickets/models';

export interface CarouselRootProps {
  tickets: Ticket[];
  title?: string;
}

export interface TicketPerformanceCardProps {
  ticket: Ticket;
}
