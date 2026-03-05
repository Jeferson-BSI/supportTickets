import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatRelativeDate } from '@core/utils/formatRelativeDate';
import type { Ticket, TicketFilterOption } from '../models';

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Erro no login com SSO',
    description:
      'Ao tentar fazer login com SSO corporativo, o sistema retorna erro 403 e não permite acesso à plataforma.',
    status: 'open',
    createdAt: new Date().toISOString(),
    category: 'Autenticação',
  },
  {
    id: '2',
    title: 'Lentidão no dashboard',
    description:
      'O dashboard principal está demorando mais de 10 segundos para carregar os gráficos e métricas.',
    status: 'pending',
    createdAt: hoursAgo(2),
    category: 'Performance',
  },
  {
    id: '3',
    title: 'Exportação de relatórios PDF',
    description:
      'A exportação de relatórios em PDF foi corrigida e está funcionando normalmente.',
    status: 'closed',
    createdAt: daysAgo(1),
    category: 'Relatórios',
  },
  {
    id: '4',
    title: 'Migração de plano cancelada',
    description:
      'Solicitação de migração do plano Basic para Enterprise foi cancelada pelo cliente.',
    status: 'canceled',
    createdAt: daysAgo(5),
    category: 'Billing',
  },
  {
    id: '5',
    title: 'Notificações não chegam',
    description:
      'Notificações push e por e-mail não estão sendo entregues para usuários do plano Pro.',
    status: 'open',
    createdAt: hoursAgo(6),
    category: 'Notificações',
  },
  {
    id: '6',
    title: 'Integração com Slack falhando',
    description:
      'O webhook de integração com Slack retorna timeout após 30 segundos em todas as tentativas.',
    status: 'pending',
    createdAt: '2023-10-24T14:30:00.000Z',
    category: 'Integrações',
  },
];

const LOADING_DELAY = 1500;

function formatTicketDates(tickets: Ticket[]): Ticket[] {
  return tickets.map((ticket) => ({
    ...ticket,
    createdAt: formatRelativeDate(ticket.createdAt),
  }));
}

function buildFilterCounts(tickets: Ticket[]): Record<TicketFilterOption, number> {
  const counts: Record<TicketFilterOption, number> = {
    all: tickets.length,
    open: 0,
    pending: 0,
    closed: 0,
    canceled: 0,
  };

  for (const ticket of tickets) {
    counts[ticket.status]++;
  }

  return counts;
}

const useTicketsViewModel = () => {
  const [rawTickets, setRawTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<TicketFilterOption>('all');

  const formattedTickets = useMemo(() => formatTicketDates(rawTickets), [rawTickets]);

  const filterCounts = useMemo(() => buildFilterCounts(rawTickets), [rawTickets]);

  const tickets = useMemo(() => {
    if (activeFilter === 'all') return formattedTickets;
    return formattedTickets.filter((ticket) => ticket.status === activeFilter);
  }, [formattedTickets, activeFilter]);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, LOADING_DELAY));
    setRawTickets(MOCK_TICKETS);
    setLoading(false);
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, LOADING_DELAY));
    setRawTickets(MOCK_TICKETS);
    setRefreshing(false);
  }, []);

  const handleTicketPress = useCallback((ticket: Ticket) => {
    // TODO: navegar para detalhes do ticket
  }, []);

  const handleFilterChange = useCallback((filter: TicketFilterOption) => {
    setActiveFilter(filter);
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return {
    tickets,
    loading,
    refreshing,
    activeFilter,
    filterCounts,
    handleRefresh,
    handleTicketPress,
    handleFilterChange,
  };
};

export default useTicketsViewModel;
