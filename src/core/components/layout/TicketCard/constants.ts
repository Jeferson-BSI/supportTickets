import type { TicketStatus } from '@features/app/tickets/models';

type StatusThemeKey = 'warning' | 'info' | 'success' | 'error';

interface StatusConfig {
  themeKey: StatusThemeKey;
  label: string;
}

export const STATUS_MAP: Record<TicketStatus, StatusConfig> = {
  open: { themeKey: 'warning', label: 'Aberto' },
  pending: { themeKey: 'info', label: 'Pendente' },
  closed: { themeKey: 'success', label: 'Fechado' },
  canceled: { themeKey: 'error', label: 'Cancelado' },
};

export const CARD_HEIGHT = 160;

export const PRESS_SCALE = 0.97;

export const ANIMATION_DELAY_FACTOR = 80;
