import type {
  Ticket,
  TicketStatus,
  TicketFilters,
  TicketCountsByStatus,
  ITicketRepository,
} from '../../models';
import * as dataSource from '../datasources/TicketSQLiteDataSource';

export class TicketRepository implements ITicketRepository {
  async getAll(filters?: TicketFilters): Promise<Ticket[]> {
    return dataSource.getTickets(filters);
  }

  async getCountsByStatus(): Promise<TicketCountsByStatus> {
    return dataSource.getCountsByStatus();
  }

  async getAverageResolutionMinutes(): Promise<number> {
    return dataSource.getAverageResolutionMinutes();
  }

  async getTop5Fastest(): Promise<Ticket[]> {
    return dataSource.getTop5FastestTickets();
  }

  async create(ticket: Ticket): Promise<void> {
    return dataSource.createTicket(ticket);
  }

  async updateStatus(id: string, status: TicketStatus): Promise<void> {
    return dataSource.updateTicketStatus(id, status);
  }
}
