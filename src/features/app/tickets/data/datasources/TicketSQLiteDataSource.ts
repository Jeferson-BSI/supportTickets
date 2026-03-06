import { db } from '@core/database/client/db';
import type { Ticket, TicketStatus } from '../../models';

interface TicketRow {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: string;
  created_at: number;
  deadline: number;
  closed_at: number | null;
}

function mapRowToTicket(row: TicketRow): Ticket {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority as Ticket['priority'],
    createdAt: new Date(row.created_at).toISOString(),
    deadline: row.deadline,
    closedAt: row.closed_at ? new Date(row.closed_at).toISOString() : undefined,
    category: 'Geral',
  };
}

export async function getTickets(): Promise<Ticket[]> {
  const rows = await db.getAllAsync<TicketRow>(
    'SELECT * FROM tickets ORDER BY created_at DESC',
  );

  return rows.map(mapRowToTicket);
}

export async function createTicket(ticket: Ticket): Promise<void> {
  await db.runAsync(
    `INSERT INTO tickets (id, title, description, status, priority, created_at, deadline, closed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      ticket.id,
      ticket.title,
      ticket.description,
      ticket.status,
      ticket.priority,
      new Date(ticket.createdAt).getTime(),
      ticket.deadline,
      ticket.closedAt ? new Date(ticket.closedAt).getTime() : null,
    ],
  );
}

export async function updateTicketStatus(
  id: string,
  status: TicketStatus,
): Promise<void> {
  const closedAt =
    status === 'closed' || status === 'canceled' ? Date.now() : null;

  await db.runAsync(
    'UPDATE tickets SET status = ?, closed_at = ? WHERE id = ?',
    [status, closedAt, id],
  );
}
