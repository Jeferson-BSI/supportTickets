import type { Ticket, TicketStatus, ITicketRepository } from '../../models';
import * as dataSource from '../datasources/TicketSQLiteDataSource';

export class TicketRepository implements ITicketRepository {
  async getAll(): Promise<Ticket[]> {
    return dataSource.getTickets();
  }

  async create(ticket: Ticket): Promise<void> {
    return dataSource.createTicket(ticket);
  }

  async updateStatus(id: string, status: TicketStatus): Promise<void> {
    return dataSource.updateTicketStatus(id, status);
  }
}
