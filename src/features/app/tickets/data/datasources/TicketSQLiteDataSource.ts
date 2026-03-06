import { db } from '@core/database/client/db';
import type {
  Ticket,
  TicketStatus,
  TicketPriority,
  TicketFilters,
  TicketCountsByStatus,
  TicketFilterOption,
} from '../../models';

interface TicketRow {
  id: string;
  title: string;
  description: string;
  status: string;
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
    status: row.status as TicketStatus,
    priority: row.priority as TicketPriority,
    createdAt: new Date(row.created_at).toISOString(),
    deadline: row.deadline,
    closedAt: row.closed_at ? new Date(row.closed_at).toISOString() : undefined,
    category: 'Geral',
  };
}

export async function getTickets(filters?: TicketFilters): Promise<Ticket[]> {
  const hasStatusFilter = filters?.status !== undefined;

  const query = hasStatusFilter
    ? 'SELECT * FROM tickets WHERE status = ? ORDER BY created_at DESC'
    : 'SELECT * FROM tickets ORDER BY created_at DESC';

  const rows = hasStatusFilter
    ? await db.getAllAsync<TicketRow>(query, [filters.status])
    : await db.getAllAsync<TicketRow>(query);

  return rows.map(mapRowToTicket);
}

export async function getCountsByStatus(): Promise<TicketCountsByStatus> {
  const rows = await db.getAllAsync<{ status: string; count: number }>(
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
    const key = row.status as TicketFilterOption;
    if (key in counts) {
      counts[key] = row.count;
      counts.all += row.count;
    }
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

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<void> {
  const closedAt = status === 'closed' ? Date.now() : null;

  await db.runAsync('UPDATE tickets SET status = ?, closed_at = ? WHERE id = ?', [
    status,
    closedAt,
    id,
  ]);
}

export async function getAverageResolutionMinutes(): Promise<number> {
  const row = await db.getFirstAsync<{ avg_minutes: number }>(
    `SELECT COALESCE(AVG((closed_at - created_at) / 60000.0), 0) AS avg_minutes
     FROM tickets
     WHERE status = 'closed'
       AND closed_at IS NOT NULL`,
  );

  return Math.round(row?.avg_minutes ?? 0);
}

export async function getTop5FastestTickets(): Promise<Ticket[]> {
  const rows = await db.getAllAsync<TicketRow>(
    `SELECT *
     FROM tickets
     WHERE status = 'closed'
       AND closed_at IS NOT NULL
     ORDER BY (closed_at - created_at) ASC
     LIMIT 5`,
  );

  return rows.map(mapRowToTicket);
}
