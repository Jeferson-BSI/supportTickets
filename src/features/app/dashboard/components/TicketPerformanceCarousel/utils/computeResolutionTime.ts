import type { Ticket } from '@features/app/tickets/models';

const MS_PER_MINUTE = 60_000;

/**
 * Calcula o tempo de resolução em minutos entre criação e fechamento do ticket.
 * @returns Número de minutos arredondado, ou 0 se o ticket não foi fechado.
 */
export function computeResolutionMinutes(ticket: Ticket): number {
  if (!ticket.closedAt) return 0;

  const createdAt = new Date(ticket.createdAt).getTime();
  const closedAt = new Date(ticket.closedAt).getTime();
  const durationMs = closedAt - createdAt;

  return Math.round(durationMs / MS_PER_MINUTE);
}
