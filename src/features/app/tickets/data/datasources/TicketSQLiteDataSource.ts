import { db } from '@core/database/client/db';
import type {
  Ticket,
  TicketStatus,
  TicketFilters,
  TicketCountsByStatus,
} from '../../models';

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

interface CountRow {
  status: TicketStatus;
  count: number;
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

export async function getTickets(filters?: TicketFilters): Promise<Ticket[]> {
  const params: string[] = [];
  let query = 'SELECT * FROM tickets';

  if (filters?.status) {
    query += ' WHERE status = ?';
    params.push(filters.status);
  }

  query += ' ORDER BY created_at DESC';

  const rows = await db.getAllAsync<TicketRow>(query, params);

  return rows.map(mapRowToTicket);
}

export async function getCountsByStatus(): Promise<TicketCountsByStatus> {
  const rows = await db.getAllAsync<CountRow>(
    'SELECT status, COUNT(*) as count FROM tickets GROUP BY status',
  );

  const counts: TicketCountsByStatus = {
    all: 0,
    open: 0,
    pending: 0,
    closed: 0,
    canceled: 0,
  };

  for (const row of rows) {
    counts[row.status] = row.count;
    counts.all += row.count;
  }

  return counts;
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
