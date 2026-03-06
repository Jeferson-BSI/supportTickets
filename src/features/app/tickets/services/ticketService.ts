import type { Ticket, CreateTicketInput } from '../models';

const SIMULATED_DELAY_MS = 500;

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function daysFromNow(days: number): number {
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Erro no login com SSO',
    description:
      'Ao tentar fazer login com SSO corporativo, o sistema retorna erro 403 e não permite acesso à plataforma.',
    status: 'open',
    priority: 'high',
    createdAt: new Date().toISOString(),
    deadline: daysFromNow(3),
    category: 'Autenticação',
  },
  {
    id: '2',
    title: 'Lentidão no dashboard',
    description:
      'O dashboard principal está demorando mais de 10 segundos para carregar os gráficos e métricas.',
    status: 'pending',
    priority: 'medium',
    createdAt: hoursAgo(2),
    deadline: daysFromNow(5),
    category: 'Performance',
  },
  {
    id: '3',
    title: 'Exportação de relatórios PDF',
    description:
      'A exportação de relatórios em PDF foi corrigida e está funcionando normalmente.',
    status: 'closed',
    priority: 'low',
    createdAt: daysAgo(1),
    deadline: daysFromNow(0),
    closedAt: hoursAgo(4),
    category: 'Relatórios',
  },
  {
    id: '4',
    title: 'Migração de plano cancelada',
    description:
      'Solicitação de migração do plano Basic para Enterprise foi cancelada pelo cliente.',
    status: 'canceled',
    priority: 'low',
    createdAt: daysAgo(5),
    deadline: daysFromNow(0),
    closedAt: daysAgo(3),
    category: 'Billing',
  },
  {
    id: '5',
    title: 'Notificações não chegam',
    description:
      'Notificações push e por e-mail não estão sendo entregues para usuários do plano Pro.',
    status: 'open',
    priority: 'high',
    createdAt: hoursAgo(6),
    deadline: daysFromNow(2),
    category: 'Notificações',
  },
  {
    id: '6',
    title: 'Integração com Slack falhando',
    description:
      'O webhook de integração com Slack retorna timeout após 30 segundos em todas as tentativas.',
    status: 'pending',
    priority: 'medium',
    createdAt: daysAgo(10),
    deadline: daysFromNow(0),
    category: 'Integrações',
  },
];

function sortByCreatedAtDesc(tickets: Ticket[]): Ticket[] {
  return [...tickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseBrDateToTimestamp(dateStr: string): number {
  const [day, month, year] = dateStr.split('/');
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function getTickets(): Promise<Ticket[]> {
  await delay(SIMULATED_DELAY_MS);
  return sortByCreatedAtDesc(mockTickets);
}

export async function createTicket(input: CreateTicketInput): Promise<Ticket> {
  await delay(SIMULATED_DELAY_MS);

  const ticket: Ticket = {
    id: generateId(),
    title: input.title,
    description: input.description,
    status: 'open',
    priority: input.priority,
    createdAt: new Date().toISOString(),
    deadline: parseBrDateToTimestamp(input.deadline),
    category: 'Geral',
  };

  mockTickets.unshift(ticket);

  return ticket;
}
