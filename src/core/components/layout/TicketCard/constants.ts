import type { TicketStatus } from '@features/app/tickets/models';

type StatusThemeKey = 'warning' | 'info' | 'success' | 'error';

interface StatusConfig {
  themeKey: StatusThemeKey;
  label: string;
}

export const STATUS_MAP: Record<TicketStatus, StatusConfig> = {
  open: { themeKey: 'info', label: 'Aberto' },
  pending: { themeKey: 'warning', label: 'Pendente' },
  closed: { themeKey: 'success', label: 'Fechado' },
  canceled: { themeKey: 'error', label: 'Cancelado' },
  improcedente: { themeKey: 'warning', label: 'Improcedente' },
};

export const CARD_HEIGHT = 160;

export const PRESS_SCALE = 0.97;

export const ANIMATION_DELAY_FACTOR = 80;
