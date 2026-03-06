import { TicketRepository } from '../data/repositories/TicketRepository';
import { createTicketService } from './ticketService';

const ticketRepository = new TicketRepository();

export const ticketService = createTicketService(ticketRepository);
